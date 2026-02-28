const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  console.log('Setting up database schema...');
  
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
  });

  try {
    const client = await pool.connect();
    console.log('✅ Connected to database');
    
    // Read SQL file
    const sqlPath = path.join(__dirname, 'setup-database.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute SQL
    console.log('Executing SQL script...');
    await client.query(sql);
    
    console.log('✅ Database setup completed successfully!');
    
    // Verify setup
    const result = await client.query('SELECT COUNT(*) as count FROM projects');
    console.log(`📊 Total projects in database: ${result.rows[0].count}`);
    
    const featuredResult = await client.query('SELECT title FROM projects WHERE featured = true');
    console.log('⭐ Featured projects:');
    featuredResult.rows.forEach(row => console.log(`  - ${row.title}`));
    
    client.release();
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();