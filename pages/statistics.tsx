import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface Stats {
  totalSubmissions: number;
  problemBreakdown: Record<string, number>;
  countryBreakdown: {
    from: Record<string, number>;
    study: Record<string, number>;
  };
  universityBreakdown: Record<string, number>;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const StatCard = ({ title, value, delay }: { title: string; value: string | number; delay: number }) => (
  <motion.div
    initial="initial"
    animate="animate"
    variants={{
      initial: { opacity: 0, y: 50 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.6,
          delay: delay * 0.2
        }
      }
    }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-3xl font-bold text-indigo-600">{value}</p>
  </motion.div>
);

const generateChartColors = (count: number) => {
  const colors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
  ];
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

const ChartSection = ({ 
  title, 
  data, 
  type,
  delay 
}: { 
  title: string; 
  data: Record<string, number>;
  type: 'pie' | 'bar' | 'doughnut';
  delay: number;
}) => {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const colors = generateChartColors(labels.length);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderColor: colors.map(color => color.replace('0.8', '1')),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const ChartComponent = type === 'pie' ? Pie : type === 'bar' ? Bar : Doughnut;

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={{
        initial: { opacity: 0, y: 50 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            delay: delay * 0.2
          }
        }
      }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <div className="h-[300px] relative">
        <ChartComponent data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

const Statistics: NextPage = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/waitlist');
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError('Failed to load statistics');
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-600"
          >
            {error}
          </motion.div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            Loading...
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-4xl font-bold text-gray-900 mb-8 text-center"
        >
          Waitlist Statistics
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Submissions" value={stats.totalSubmissions} delay={0} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ChartSection 
            title="Problems Breakdown" 
            data={stats.problemBreakdown} 
            type="pie"
            delay={1}
          />
          <ChartSection 
            title="Origin Countries" 
            data={stats.countryBreakdown.from} 
            type="bar"
            delay={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartSection 
            title="Study Destinations" 
            data={stats.countryBreakdown.study} 
            type="doughnut"
            delay={3}
          />
          <ChartSection 
            title="Universities" 
            data={stats.universityBreakdown} 
            type="bar"
            delay={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics; 