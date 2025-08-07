const fs = require('fs');
const path = require('path');

console.log('🚀 UniMoney Vercel Deployment Setup');
console.log('=====================================\n');

// Check if required files exist
const requiredFiles = [
  'lib/db/migrations/0001_metrics_tables.sql',
  'pages/api/metrics/track.ts',
  'pages/api/metrics/data.ts',
  'pages/api/metrics/auth.ts',
  'pages/metrics-dashboard.tsx',
  'lib/metrics.ts',
  'setup-metrics-tables.sql'
];

console.log('📋 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

console.log('\n');

if (!allFilesExist) {
  console.log('❌ Some required files are missing. Please ensure all files are present before deploying.');
  process.exit(1);
}

console.log('✅ All required files are present!\n');

// Check for environment variables
console.log('🔧 Environment Variables Setup');
console.log('==============================\n');

console.log('You need to set these environment variables in Vercel:');
console.log('');
console.log('1. DATABASE_URL');
console.log('   - Go to Neon Console: https://console.neon.tech');
console.log('   - Copy your connection string');
console.log('   - Format: postgres://username:password@host/database?sslmode=require');
console.log('');
console.log('2. METRICS_PASSWORD (Optional)');
console.log('   - Default: unimoney2024');
console.log('   - Set a custom password for the metrics dashboard');
console.log('');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('📄 Found .env.local file');
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('DATABASE_URL')) {
    console.log('✅ DATABASE_URL is configured locally');
  } else {
    console.log('⚠️  DATABASE_URL not found in .env.local');
  }
} else {
  console.log('⚠️  No .env.local file found');
}

console.log('\n');

// Database setup instructions
console.log('🗄️  Database Setup Instructions');
console.log('==============================\n');

console.log('After deploying to Vercel, you need to create the metrics tables:');
console.log('');
console.log('1. Go to Neon Console: https://console.neon.tech');
console.log('2. Select your project');
console.log('3. Click "SQL Editor"');
console.log('4. Copy and paste the contents of setup-metrics-tables.sql');
console.log('5. Click "Run"');
console.log('');

// Deployment checklist
console.log('📝 Deployment Checklist');
console.log('=======================\n');

const checklist = [
  'Push code to GitHub',
  'Create Vercel project',
  'Set environment variables in Vercel',
  'Deploy the project',
  'Create database tables using setup-metrics-tables.sql',
  'Test metrics dashboard (Ctrl+Shift+M or /metrics-dashboard)',
  'Verify password protection is working',
  'Check that tracking is working'
];

checklist.forEach((item, index) => {
  console.log(`${index + 1}. ${item}`);
});

console.log('\n');

// Final instructions
console.log('🎯 Next Steps');
console.log('=============\n');

console.log('1. Push your code to GitHub:');
console.log('   git add .');
console.log('   git commit -m "Add metrics dashboard and tracking system"');
console.log('   git push origin main');
console.log('');
console.log('2. Deploy to Vercel:');
console.log('   - Go to https://vercel.com');
console.log('   - Click "New Project"');
console.log('   - Import your GitHub repository');
console.log('   - Set environment variables');
console.log('   - Deploy!');
console.log('');
console.log('3. Set up database tables using the SQL in setup-metrics-tables.sql');
console.log('');
console.log('4. Test your deployment and metrics dashboard');
console.log('');

console.log('🚀 Happy Deploying! 🎉'); 