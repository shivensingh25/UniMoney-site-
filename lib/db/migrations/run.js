const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    // Read and execute the migration file
    const migration = fs.readFileSync(
      path.join(__dirname, '0000_initial.sql'),
      'utf8'
    );
    
    await sql.query(migration);
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration(); 