const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function testDatabase() {
  console.log('🔍 Testing UniMoney Database Connection');
  console.log('======================================\n');

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.log('❌ DATABASE_URL not found in environment variables');
    console.log('Please create a .env.local file with your DATABASE_URL');
    return;
  }

  console.log('✅ DATABASE_URL found');
  console.log('Connecting to database...\n');

  try {
    // Connect to database
    const sql = neon(process.env.DATABASE_URL);
    
    // Test basic connection
    console.log('1. Testing basic connection...');
    const result = await sql`SELECT 'Hello from UniMoney database!' as message`;
    console.log('✅ Database connection successful!');
    console.log(`   Message: ${result[0].message}\n`);

    // Check if metrics tables exist
    console.log('2. Checking if metrics tables exist...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('page_views', 'button_clicks', 'user_sessions', 'form_submissions')
      ORDER BY table_name
    `;

    const expectedTables = ['page_views', 'button_clicks', 'user_sessions', 'form_submissions'];
    const existingTables = tables.map(t => t.table_name);

    console.log('   Found tables:', existingTables.length > 0 ? existingTables.join(', ') : 'None');

    if (existingTables.length === expectedTables.length) {
      console.log('✅ All metrics tables exist!\n');
    } else {
      console.log('⚠️  Some tables are missing. You need to run the setup SQL.\n');
      console.log('Missing tables:');
      expectedTables.forEach(table => {
        if (!existingTables.includes(table)) {
          console.log(`   - ${table}`);
        }
      });
      console.log('\nPlease run the SQL from setup-metrics-tables.sql in your Neon Console');
      return;
    }

    // Check if there's data in the tables
    console.log('3. Checking for data in tables...');
    
    const pageViewsCount = await sql`SELECT COUNT(*) as count FROM page_views`;
    const buttonClicksCount = await sql`SELECT COUNT(*) as count FROM button_clicks`;
    const formSubmissionsCount = await sql`SELECT COUNT(*) as count FROM form_submissions`;

    console.log(`   page_views: ${pageViewsCount[0].count} records`);
    console.log(`   button_clicks: ${buttonClicksCount[0].count} records`);
    console.log(`   form_submissions: ${formSubmissionsCount[0].count} records`);

    if (pageViewsCount[0].count > 0 || buttonClicksCount[0].count > 0 || formSubmissionsCount[0].count > 0) {
      console.log('✅ Tables have data! Your metrics dashboard should work.\n');
    } else {
      console.log('⚠️  Tables are empty. You may want to add some sample data.\n');
    }

    // Test a simple query that the metrics dashboard uses
    console.log('4. Testing metrics dashboard query...');
    try {
      const testQuery = await sql`
        SELECT 
          COUNT(*) as total_page_views,
          COUNT(DISTINCT page) as unique_pages
        FROM page_views
      `;
      console.log('✅ Metrics dashboard query successful!');
      console.log(`   Total page views: ${testQuery[0].total_page_views}`);
      console.log(`   Unique pages: ${testQuery[0].unique_pages}\n`);
    } catch (error) {
      console.log('❌ Metrics dashboard query failed:', error.message);
    }

    console.log('🎉 Database test completed successfully!');
    console.log('Your metrics dashboard should now work properly.');
    console.log('\nTo access your metrics dashboard:');
    console.log('1. Go to your website');
    console.log('2. Press Ctrl + Shift + M or go to /metrics-dashboard');
    console.log('3. Enter password: unimoney2024');

  } catch (error) {
    console.log('❌ Database test failed:', error.message);
    console.log('\nCommon issues:');
    console.log('1. Check if your DATABASE_URL is correct');
    console.log('2. Make sure your Neon database is running');
    console.log('3. Verify your internet connection');
    console.log('4. Check if the database tables exist (run setup-metrics-tables.sql)');
  }
}

testDatabase(); 