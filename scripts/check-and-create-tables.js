const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function checkAndCreateTables() {
  console.log('🔍 Checking and creating UniMoney metrics tables...');
  console.log('================================================\n');

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.log('❌ DATABASE_URL not found in environment variables');
    console.log('Please create a .env.local file with your DATABASE_URL');
    return;
  }

  try {
    // Connect to database
    const sql = neon(process.env.DATABASE_URL);
    
    // Check if tables exist
    console.log('1. Checking if metrics tables exist...');
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
      console.log('⚠️  Some tables are missing. Creating them now...\n');
      
      // Create missing tables
      const createTablesSQL = `
        -- Create page_views table
        CREATE TABLE IF NOT EXISTS page_views (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          page TEXT NOT NULL,
          user_agent TEXT,
          ip_address TEXT,
          referrer TEXT,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL
        );

        -- Create button_clicks table
        CREATE TABLE IF NOT EXISTS button_clicks (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          button_id TEXT NOT NULL,
          button_text TEXT,
          page TEXT NOT NULL,
          user_agent TEXT,
          ip_address TEXT,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL
        );

        -- Create user_sessions table
        CREATE TABLE IF NOT EXISTS user_sessions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          session_id TEXT NOT NULL,
          start_time TIMESTAMP DEFAULT NOW() NOT NULL,
          end_time TIMESTAMP,
          pages_visited TEXT[],
          total_time INTEGER,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL
        );

        -- Create form_submissions table
        CREATE TABLE IF NOT EXISTS form_submissions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          form_type TEXT NOT NULL,
          success BOOLEAN NOT NULL,
          error_message TEXT,
          user_agent TEXT,
          ip_address TEXT,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL
        );

        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_page_views_page ON page_views(page);
        CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
        CREATE INDEX IF NOT EXISTS idx_button_clicks_button_id ON button_clicks(button_id);
        CREATE INDEX IF NOT EXISTS idx_button_clicks_page ON button_clicks(page);
        CREATE INDEX IF NOT EXISTS idx_button_clicks_created_at ON button_clicks(created_at);
        CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON user_sessions(session_id);
        CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON form_submissions(form_type);
        CREATE INDEX IF NOT EXISTS idx_form_submissions_success ON form_submissions(success);
      `;

      // Split and execute SQL statements
      const statements = createTablesSQL.split(';').filter(stmt => stmt.trim());
      
      for (const statement of statements) {
        if (statement.trim()) {
          console.log('Creating:', statement.trim().substring(0, 50) + '...');
          await sql.query(statement);
        }
      }

      console.log('✅ Tables created successfully!\n');
    }

    // Check if there's data in the tables
    console.log('2. Checking for data in tables...');
    
    const pageViewsCount = await sql`SELECT COUNT(*) as count FROM page_views`;
    const buttonClicksCount = await sql`SELECT COUNT(*) as count FROM button_clicks`;
    const formSubmissionsCount = await sql`SELECT COUNT(*) as count FROM form_submissions`;

    console.log(`   page_views: ${pageViewsCount[0].count} records`);
    console.log(`   button_clicks: ${buttonClicksCount[0].count} records`);
    console.log(`   form_submissions: ${formSubmissionsCount[0].count} records`);

    if (pageViewsCount[0].count === 0 && buttonClicksCount[0].count === 0 && formSubmissionsCount[0].count === 0) {
      console.log('⚠️  Tables are empty. Adding sample data...\n');
      
      // Add sample data
      await sql`
        INSERT INTO page_views (page, user_agent, ip_address, referrer) VALUES 
        ('/','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','127.0.0.1',NULL),
        ('/loan-dashboard','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','127.0.0.1','/'),
        ('/metrics-dashboard','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','127.0.0.1',NULL)
      `;

      await sql`
        INSERT INTO button_clicks (button_id, button_text, page, user_agent, ip_address) VALUES 
        ('cta-button','Call to Action','/','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','127.0.0.1'),
        ('cta-button','Call to Action','/','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','127.0.0.1')
      `;

      await sql`
        INSERT INTO form_submissions (form_type, success, error_message, user_agent, ip_address) VALUES 
        ('waitlist',true,NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','127.0.0.1'),
        ('data_acquisition',true,NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36','127.0.0.1')
      `;

      console.log('✅ Sample data added successfully!\n');
    } else {
      console.log('✅ Tables have data!\n');
    }

    console.log('🎉 Database setup completed successfully!');
    console.log('Your metrics dashboard should now work properly.');
    console.log('\nTo access your metrics dashboard:');
    console.log('1. Go to your website');
    console.log('2. Press Ctrl + Shift + M or go to /metrics-dashboard');
    console.log('3. Enter password: unimoney2024');

  } catch (error) {
    console.log('❌ Database setup failed:', error.message);
    console.log('\nCommon issues:');
    console.log('1. Check if your DATABASE_URL is correct');
    console.log('2. Make sure your Neon database is running');
    console.log('3. Verify your internet connection');
  }
}

checkAndCreateTables(); 