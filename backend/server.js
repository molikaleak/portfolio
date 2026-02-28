const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const pool = new Pool({
  host: process.env.DB_HOST || 'dpg-d6hdi6pr0fns73862hpg-a',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'chanmolika_leak',
  user: process.env.DB_USER || 'chanmolika_leak_user',
  password: process.env.DB_PASSWORD || 'bla vla',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database');
    release();
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'portfolio-backend',
    database: 'connected'
  });
});

// Get all projects endpoint
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json({
      success: true,
      count: result.rowCount,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects'
    });
  }
});

// Create a project endpoint
app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, technologies, github_url, live_url } = req.body;
    
    const result = await pool.query(
      `INSERT INTO projects (title, description, technologies, github_url, live_url) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, technologies, github_url, live_url]
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create project'
    });
  }
});

// Create projects table if it doesn't exist
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        technologies VARCHAR(255)[],
        github_url VARCHAR(255),
        live_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Insert sample data if table is empty
    const countResult = await pool.query('SELECT COUNT(*) FROM projects');
    if (parseInt(countResult.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO projects (title, description, technologies, github_url, live_url) 
        VALUES 
          ('Portfolio Website', 'Personal portfolio with 3D model viewer', ARRAY['HTML', 'CSS', 'JavaScript', 'Three.js'], 'https://github.com/chanmolika/portfolio', 'https://chanmolika.vercel.app'),
          ('E-commerce API', 'RESTful API for online store', ARRAY['Node.js', 'Express', 'PostgreSQL', 'JWT'], 'https://github.com/chanmolika/ecommerce-api', 'https://api-store.example.com'),
          ('Task Management App', 'Full-stack task management application', ARRAY['React', 'Node.js', 'MongoDB', 'Socket.io'], 'https://github.com/chanmolika/task-manager', 'https://tasks.example.com')
      `);
      console.log('Sample projects inserted');
    }
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  initializeDatabase();
});

module.exports = app;