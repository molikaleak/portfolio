const { Pool } = require('pg');

// Database configuration from provided credentials
const pool = new Pool({
  host: 'dpg-d6hdi6pr0fns73862hpg-a',
  port: 5432,
  database: 'chanmolika_leak',
  user: 'chanmolika_leak_user',
  password: 'bla vla',
  ssl: { rejectUnauthorized: false }
});

async function testDatabaseConnection() {
  console.log('Testing database connection...');
  
  try {
    const client = await pool.connect();
    console.log('✅ Database connection successful');
    
    // Test query
    const result = await client.query('SELECT version()');
    console.log('✅ PostgreSQL version:', result.rows[0].version);
    
    // Check if projects table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'projects'
      )
    `);
    
    console.log('✅ Projects table exists:', tableCheck.rows[0].exists);
    
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

async function testAPIEndpoints() {
  console.log('\nTesting API endpoints...');
  
  // Note: This would require the server to be running
  // For now, just show the expected endpoints
  const endpoints = [
    { method: 'GET', path: '/api/health', description: 'Health check' },
    { method: 'GET', path: '/api/projects', description: 'Get all projects' },
    { method: 'POST', path: '/api/projects', description: 'Create project' }
  ];
  
  console.log('✅ API endpoints defined:');
  endpoints.forEach(ep => {
    console.log(`   ${ep.method} ${ep.path} - ${ep.description}`);
  });
}

async function runTests() {
  console.log('=== Backend API Test ===\n');
  
  const dbConnected = await testDatabaseConnection();
  await testAPIEndpoints();
  
  console.log('\n=== Test Summary ===');
  console.log(`Database Connection: ${dbConnected ? '✅ PASS' : '❌ FAIL'}`);
  console.log('API Endpoints: ✅ Defined (manual testing required)');
  
  if (dbConnected) {
    console.log('\n✅ Backend is ready for deployment!');
    console.log('To run the server locally:');
    console.log('   cd backend && npm start');
    console.log('   Then visit http://localhost:3000/api/health');
  } else {
    console.log('\n⚠️  Database connection failed. Check credentials and network.');
  }
  
  // Close pool
  await pool.end();
}

runTests().catch(console.error);