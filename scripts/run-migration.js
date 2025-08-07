const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function runMigration() {
  try {
    const migrationPath = path.join(__dirname, '../lib/db/migrations/0001_metrics_tables.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Running migration: 0001_metrics_tables.sql');
    
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set');
      console.log('Please create a .env.local file with your DATABASE_URL');
      return;
    }
    
    // Connect to database and run migration
    const sql = neon(process.env.DATABASE_URL);
    
    // Split the SQL into individual statements and execute them
    const statements = migrationSQL.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        console.log('Executing:', statement.trim().substring(0, 50) + '...');
        await sql.query(statement);
      }
    }
    
    console.log('✅ Migration completed successfully!');
    console.log('The metrics tables have been created in your database.');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
  }
}

runMigration(); 