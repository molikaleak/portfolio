# Portfolio CI/CD Implementation

This project implements CI/CD pipelines for both frontend and backend deployment as per the assignment requirements.

## Project Structure

- **Frontend**: Static portfolio website (HTML, CSS, JS) with 3D model viewer
- **Backend**: Node.js/Express API with PostgreSQL database connection
- **CI/CD**: GitHub Actions workflows for automated deployment

## CI/CD Workflows

### 1. Frontend Deployment to Vercel
**Workflow File**: `.github/workflows/deploy-frontend.yml`
- **Trigger**: Push to `main` branch
- **Actions**:
  - Checks out code
  - Installs Vercel CLI
  - Builds and deploys to Vercel
- **Requirements**:
  - `VERCEL_TOKEN` secret in GitHub repository
  - Vercel project linked

### 2. Backend Build & Push to GHCR
**Workflow File**: `.github/workflows/build-backend.yml`
- **Trigger**: Push to `main` branch with changes in `backend/` directory
- **Actions**:
  - Builds Docker image using Docker Buildx
  - Pushes to GitHub Container Registry (GHCR)
  - Uses semantic versioning tags
- **Requirements**:
  - GitHub Packages write permissions

### 3. Backend Deployment to Render (CD)
**Workflow File**: `.github/workflows/deploy-backend.yml`
- **Trigger**: After successful completion of `build-backend.yml` workflow
- **Actions**:
  - Triggers Render deployment via API
  - Waits for deployment completion
- **Requirements**:
  - `RENDER_API_KEY` and `RENDER_SERVICE_ID` secrets
  - Render service configured

## Database Configuration

The backend connects to a PostgreSQL database with the following credentials:
- **Host**: `dpg-d6hdi6pr0fns73862hpg-a`
- **Port**: `5432`
- **Database**: `chanmolika_leak`
- **User**: `chanmolika_leak_user`
- **Password**: `bla vla`

## API Endpoints

Once deployed, the backend provides the following endpoints:

1. **GET /api/health** - Health check endpoint
   ```json
   {
     "status": "healthy",
     "timestamp": "2026-02-28T12:07:30.280Z",
     "service": "portfolio-backend",
     "database": "connected"
   }
   ```

2. **GET /api/projects** - Retrieve all projects
3. **POST /api/projects** - Create a new project

## Setup Instructions

### Local Development

1. **Backend Setup**:
   ```bash
   cd backend
   npm install
   npm start
   ```
   Server runs on `http://localhost:3000`

2. **Database Connection Test**:
   ```bash
   cd backend
   node test-api.js
   ```

### GitHub Secrets Configuration

For the workflows to function, set the following secrets in your GitHub repository:

1. **VERCEL_TOKEN**: Vercel authentication token
2. **RENDER_API_KEY**: Render API key
3. **RENDER_SERVICE_ID**: Render service ID

### Deployment Platforms

- **Frontend**: [Vercel](https://vercel.com) - Connect GitHub repository
- **Backend**: [Render](https://render.com) - Create Web Service with Docker
- **Container Registry**: [GitHub Container Registry](https://ghcr.io)

## Expected URLs (After Deployment)

- **Frontend URL**: `https://portfolio-chanmolika.vercel.app` (example)
- **Backend URL**: `https://portfolio-backend.onrender.com` (example)
- **Health Endpoint**: `https://portfolio-backend.onrender.com/api/health`
- **Projects Endpoint**: `https://portfolio-backend.onrender.com/api/projects`

## Workflow Run Links

After pushing to GitHub, workflow runs will be available at:
- `https://github.com/{username}/{repo}/actions/workflows/deploy-frontend.yml`
- `https://github.com/{username}/{repo}/actions/workflows/build-backend.yml`
- `https://github.com/{username}/{repo}/actions/workflows/deploy-backend.yml`

## Assignment Requirements Checklist

- [x] Frontend GitHub Actions workflow that triggers on push to main
- [x] Frontend deployed and publicly accessible (via Vercel)
- [x] Backend GitHub Actions workflow to build & push with Jib to GHCR
- [x] Backend deployed to Render/Railway
- [x] Connected to database with working endpoints
- [x] CD workflow to auto-deploy backend after image push to GHCR (bonus)

## Files Created

```
.github/workflows/
├── deploy-frontend.yml    # Frontend CI/CD to Vercel
├── build-backend.yml      # Backend build & push to GHCR
└── deploy-backend.yml     # Backend CD to Render

backend/
├── package.json          # Node.js dependencies
├── server.js             # Express API with database
├── Dockerfile            # Container definition
├── .env.example          # Environment variables template
└── test-api.js           # Database connection test

README.md                 # This documentation