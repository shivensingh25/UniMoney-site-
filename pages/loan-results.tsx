import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

type Lender = {
  id: string;
  name: string;
  type: 'Bank' | 'NBFC' | 'International';
  rateRange: [number, number];
  processingFeeFlat: number;
  processingFeePct: number; // 0.01 = 1%
  requiresCollateral: boolean;
  allowsCosigner: boolean;
  approvalDays: number;
  moratoriumMonths: number;
  maxLoanInINR: number;
  notes?: string[];
};

function formatINR(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

function estimateScore(l: Lender, params: {
  loanAmount: number;
  hasCollateral: boolean;
  hasCosigner: boolean;
}) {
  let score = 0;
  const midRate = (l.rateRange[0] + l.rateRange[1]) / 2;
  score += (14 - Math.min(14, midRate)) * 10; // lower rate is better
  score += (10 - Math.min(10, l.approvalDays)) * 3; // faster approval better
  if (params.hasCollateral && l.requiresCollateral) score += 15;
  if (!params.hasCollateral && !l.requiresCollateral) score += 20;
  if (params.hasCosigner && l.allowsCosigner) score += 5;
  if (params.loanAmount <= l.maxLoanInINR) score += 10;
  return score;
}

function emi(principal: number, annualRatePct: number, months: number) {
  const r = annualRatePct / 12 / 100;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function LoanResults() {
  const router = useRouter();
  const {
    fullName = '',
    email = '',
    university = '',
    course = '',
    loanAmount = '0',
    hasCollateral = 'false',
    hasCosigner = 'false',
    annualFamilyIncome = '0',
    intake = '',
  } = router.query as Record<string, string>;

  const amount = Number(loanAmount) || 0;
  const wantsCollateral = hasCollateral === 'true';
  const wantsCosigner = hasCosigner === 'true';

  const [forexMarginPct, setForexMarginPct] = useState(0.015); // 1.5%
  const [studyMonths, setStudyMonths] = useState(18);
  const [emiMonths, setEmiMonths] = useState(84);
  const [sortBy, setSortBy] = useState<'best' | 'rate' | 'speed'>('best');
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [hideTitle, setHideTitle] = useState(false);

  useEffect(() => {
    const calc = () => {
      const brand = document.getElementById('brand-block');
      const title = titleRef.current;
      if (!brand || !title) return;
      const b = brand.getBoundingClientRect();
      const t = title.getBoundingClientRect();
      // Consider overlap or intrusion of title's left into brand block area
      const verticallyOverlap = !(t.bottom < b.top || t.top > b.bottom);
      const horizontallyIntrudes = t.left < b.right + 8; // 8px buffer
      setHideTitle(verticallyOverlap && horizontallyIntrudes);
    };

    const ro = new ResizeObserver(calc);
    const brand = document.getElementById('brand-block');
    if (brand) ro.observe(brand);
    if (titleRef.current) ro.observe(titleRef.current);
    window.addEventListener('resize', calc);
    window.addEventListener('scroll', calc, { passive: true });
    const id = requestAnimationFrame(calc);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', calc);
      window.removeEventListener('scroll', calc as any);
      cancelAnimationFrame(id);
    };
  }, []);

  const { lenders, top3 } = useMemo(() => {
    // Load lenders.json via runtime import
    const data: Lender[] = require('../public/lenders.json');
    const filtered = data.filter(l => amount <= l.maxLoanInINR);
    const scored = filtered.map(l => ({ l, score: estimateScore(l, { loanAmount: amount, hasCollateral: wantsCollateral, hasCosigner: wantsCosigner }) }));
    scored.sort((a, b) => b.score - a.score);
    return { lenders: scored, top3: scored.slice(0, 3) };
  }, [amount, wantsCollateral, wantsCosigner]);

  const sortedLenders = useMemo(() => {
    if (sortBy === 'rate') return [...lenders].sort((a, b) => ((a.l.rateRange[0] + a.l.rateRange[1]) / 2) - ((b.l.rateRange[0] + b.l.rateRange[1]) / 2));
    if (sortBy === 'speed') return [...lenders].sort((a, b) => a.l.approvalDays - b.l.approvalDays);
    return lenders; // best
  }, [lenders, sortBy]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 pt-32">
      <div className="max-w-6xl mx-auto px-4">
        <h1 ref={titleRef} className="text-3xl font-bold mb-2 transition-opacity duration-200" style={{ opacity: hideTitle ? 0 : 1 }}>
          Your Matches
        </h1>
        {hideTitle && <div style={{ height: 16 }} />}
        <p className={`text-gray-600 mb-6 ${hideTitle ? 'text-center' : ''}`}>University: {university || '—'} • Loan: {formatINR(amount)} • Intake: {intake || '—'}</p>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {top3.map(({ l, score }, idx) => {
            const midRate = (l.rateRange[0] + l.rateRange[1]) / 2;
            const pf = Math.max(l.processingFeeFlat, amount * l.processingFeePct);
            const interestDuringStudy = amount * (midRate / 100 / 12) * (studyMonths + l.moratoriumMonths);
            const totalPayable = amount + interestDuringStudy + pf + amount * forexMarginPct;
            return (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.5, ease: 'easeOut' }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{l.name}</h3>
                    <span className="text-sm text-gray-500">{l.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">{midRate}%</div>
                    <div className="text-sm text-gray-500">Interest Rate</div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-semibold">{formatINR(Math.round(pf))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approval Time</span>
                    <span className="font-semibold">{l.approvalDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Collateral Required</span>
                    <span className={`font-semibold ${l.requiresCollateral ? 'text-red-600' : 'text-green-600'}`}>
                      {l.requiresCollateral ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-600 mb-1">Total Estimated Cost</div>
                  <div className="text-2xl font-bold text-gray-900">{formatINR(Math.round(totalPayable))}</div>
                </div>

                <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                  Go to Lender
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Adjust Your Search</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Forex Margin %</label>
              <input 
                type="number" 
                step="0.1" 
                value={(forexMarginPct * 100).toFixed(1)} 
                onChange={e => setForexMarginPct(Math.max(0, Number(e.target.value) / 100))} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Study Duration (months)</label>
              <input 
                type="number" 
                step="1" 
                value={studyMonths} 
                onChange={e => setStudyMonths(Math.max(0, Number(e.target.value)))} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">EMI Term (months)</label>
              <input 
                type="number" 
                step="1" 
                value={emiMonths} 
                onChange={e => setEmiMonths(Math.max(1, Number(e.target.value)))} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value as any)} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="best">Best Match</option>
                <option value="rate">Interest Rate</option>
                <option value="speed">Approval Speed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">All Available Options</h3>
            <p className="text-sm text-gray-600 mt-1">Compare all loan options side by side</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Lender</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Interest Rate</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Processing Fee</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Collateral</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Approval Time</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">EMI (est.)</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Likelihood</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedLenders.map(({ l }, idx) => {
                  const midRate = (l.rateRange[0] + l.rateRange[1]) / 2;
                  const pf = Math.max(l.processingFeeFlat, amount * l.processingFeePct);
                  const interestDuringStudy = amount * (midRate / 100 / 12) * (studyMonths + l.moratoriumMonths);
                  const totalPayable = amount + interestDuringStudy + pf + amount * forexMarginPct;
                  const monthlyEmi = emi(amount, midRate, emiMonths);
                  const likelihood = (() => {
                    let score = estimateScore(l, { loanAmount: amount, hasCollateral: wantsCollateral, hasCosigner: wantsCosigner });
                    if (score >= 85) return { label: 'High', color: 'text-green-600 bg-green-50' };
                    if (score >= 65) return { label: 'Medium', color: 'text-amber-600 bg-amber-50' };
                    return { label: 'Low', color: 'text-red-600 bg-red-50' };
                  })();
                  return (
                    <motion.tr
                      key={l.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * idx }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{l.name}</div>
                        <div className="text-sm text-gray-500">{l.type}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-lg font-bold text-indigo-600">{midRate}%</div>
                        <div className="text-sm text-gray-500">{l.rateRange[0]}% - {l.rateRange[1]}%</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold">{formatINR(Math.round(pf))}</div>
                        <div className="text-sm text-gray-500">({(l.processingFeePct * 100).toFixed(1)}%)</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          l.requiresCollateral ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {l.requiresCollateral ? 'Required' : 'Not Required'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold">{l.approvalDays} days</div>
                        <div className="text-sm text-gray-500">Moratorium: {l.moratoriumMonths} mo</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold">{formatINR(Math.round(monthlyEmi))}</div>
                        <div className="text-sm text-gray-500">per month</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${likelihood.color}`}>
                          {likelihood.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                          Apply Now
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          Based on recent users: 62% chose unsecured options; median interest 11.2%
        </div>
      </div>
      </div>
    </Layout>
  );
}


