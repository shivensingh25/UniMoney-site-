const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://neondb_owner:npg_cJMQRG6Nslr1@ep-rough-wildflower-a4qzvhoq-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Successfully connected to the database!');
    await client.end();
  } catch (error) {
    console.error('Connection error:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
  }
}

testConnection(); 