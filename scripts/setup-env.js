const fs = require('fs');
const path = require('path');

const envContent = `# Recommended for most uses
DATABASE_URL=postgres://neondb_owner:npg_cJMQRG6Nslr1@ep-rough-wildflower-a4qzvhoq-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require

# For uses requiring a connection without pgbouncer
DATABASE_URL_UNPOOLED=postgresql://neondb_owner:npg_cJMQRG6Nslr1@ep-rough-wildflower-a4qzvhoq.us-east-1.aws.neon.tech/neondb?sslmode=require

# Parameters for constructing your own connection string
PGHOST=ep-rough-wildflower-a4qzvhoq-pooler.us-east-1.aws.neon.tech
PGHOST_UNPOOLED=ep-rough-wildflower-a4qzvhoq.us-east-1.aws.neon.tech
PGUSER=neondb_owner
PGDATABASE=neondb
PGPASSWORD=npg_cJMQRG6Nslr1

# Parameters for Vercel Postgres Templates
POSTGRES_URL=postgres://neondb_owner:npg_cJMQRG6Nslr1@ep-rough-wildflower-a4qzvhoq-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_URL_NON_POOLING=postgres://neondb_owner:npg_cJMQRG6Nslr1@ep-rough-wildflower-a4qzvhoq.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_USER=neondb_owner
POSTGRES_HOST=ep-rough-wildflower-a4qzvhoq-pooler.us-east-1.aws.neon.tech
POSTGRES_PASSWORD=npg_cJMQRG6Nslr1
POSTGRES_DATABASE=neondb`;

const envPath = path.join(process.cwd(), '.env.local');

fs.writeFileSync(envPath, envContent);
console.log('.env.local file created successfully!'); 