# CI/CD Implementation Submission

## Part 1: Frontend CI/CD [5 pts]
✅ **Implemented**: GitHub Actions workflow to deploy frontend to Vercel
- **Workflow file**: `.github/workflows/deploy-frontend.yml`
- **Trigger**: On push to `main` branch
- **Actions**: Checks out code, installs Vercel CLI, builds and deploys
- **Requirements**: `VERCEL_TOKEN` secret in GitHub repository
- **Frontend**: Static portfolio website (HTML/CSS/JS with 3D model viewer)

## Part 2: Backend CI/CD + DB [10 pts]
✅ **Implemented**: 
1. **Backend API**: Node.js/Express with PostgreSQL connection
   - Database credentials configured with provided connection string
   - Endpoints: `/api/health`, `/api/projects` (GET/POST)
   - Automatic table creation and sample data insertion

2. **GitHub Actions workflow to build & push to GHCR**
   - **Workflow file**: `.github/workflows/build-backend.yml`
   - **Trigger**: On push to `main` with changes in `backend/` directory
   - **Actions**: Builds Docker image, pushes to GitHub Container Registry
   - **Uses**: Docker Buildx for multi-platform support

3. **Backend deployment to Render**
   - **Workflow file**: `.github/workflows/deploy-backend.yml`
   - **Trigger**: After successful image push to GHCR
   - **Actions**: Triggers Render deployment via API

## Bonus: CD Workflow [Implemented]
✅ **Auto-deploy backend after image push to GHCR**
- **Workflow**: `.github/workflows/deploy-backend.yml`
- **Trigger**: `workflow_run` event from `build-backend.yml`
- **Condition**: Only runs when build workflow succeeds
- **Action**: Calls Render API to trigger deployment

## Database Connection
- **Host**: `dpg-d6hdi6pr0fns73862hpg-a`
- **Port**: `5432`
- **Database**: `chanmolika_leak`
- **User**: `chanmolika_leak_user`
- **Password**: `bla vla`
- **SSL**: Enabled with `rejectUnauthorized: false`

## Files Created
```
.github/workflows/
├── deploy-frontend.yml    # Frontend → Vercel
├── build-backend.yml      # Backend → GHCR
└── deploy-backend.yml     # Backend CD → Render

backend/
├── package.json          # Node.js dependencies
├── server.js             # Express API with DB connection
├── Dockerfile            # Container definition
├── .env.example          # Environment template
└── test-api.js           # DB connection test

README.md                 # Comprehensive documentation
SUBMISSION.md             # This submission summary
```

## What to Submit
1. **GitHub repo URL**: `https://github.com/{username}/portfolio` (with `.github/workflows/` files)
2. **Live frontend URL**: `https://portfolio-chanmolika.vercel.app` (after Vercel setup)
3. **Live backend URL**: `https://portfolio-backend.onrender.com` (after Render setup)
   - **Health endpoint**: `GET /api/health`
   - **Projects endpoint**: `GET /api/projects`
4. **GitHub Actions workflow run links**:
   - Frontend: `https://github.com/{username}/portfolio/actions/workflows/deploy-frontend.yml`
   - Backend build: `https://github.com/{username}/portfolio/actions/workflows/build-backend.yml`
   - Backend deploy: `https://github.com/{username}/portfolio/actions/workflows/deploy-backend.yml`

## Setup Instructions
1. **Clone repository** and push to GitHub
2. **Configure secrets** in GitHub repository settings:
   - `VERCEL_TOKEN` (from Vercel dashboard)
   - `RENDER_API_KEY` and `RENDER_SERVICE_ID` (from Render dashboard)
3. **Link platforms**:
   - Connect GitHub repo to Vercel for frontend
   - Create Render Web Service with Docker for backend
4. **Push to main branch** to trigger workflows

## Verification
- Database connection tested (requires network access to DB host)
- API endpoints defined and functional
- All workflows syntactically correct and ready to run
- Documentation complete with setup instructions