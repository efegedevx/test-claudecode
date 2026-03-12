# React + .NET Core + SQL Server

Full-stack application with a React (TypeScript) frontend, .NET Core 8 Web API backend, and SQL Server database.

## Project Structure

```
├── backend/           # .NET Core 8 Web API
│   ├── Controllers/   # API controllers
│   ├── Data/          # EF Core DbContext
│   ├── Models/        # Entity models
│   └── Program.cs     # Application entry point
├── frontend/          # React + TypeScript (Vite)
│   └── src/
└── docker-compose.yml # SQL Server container
```

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [Docker](https://www.docker.com/) (for SQL Server)

## Getting Started

### 1. Start SQL Server

```bash
docker compose up -d
```

### 2. Run database migrations

```bash
cd backend
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 3. Start the backend

```bash
cd backend
dotnet run
```

The API will be available at `http://localhost:5001` with Swagger UI at `http://localhost:5001/swagger`.

### 4. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint                      | Description          |
|--------|-------------------------------|----------------------|
| GET    | /api/weatherforecast          | Get all forecasts    |
| GET    | /api/weatherforecast/{id}     | Get forecast by ID   |
| POST   | /api/weatherforecast          | Create new forecast  |
| PUT    | /api/weatherforecast/{id}     | Update forecast      |
| DELETE | /api/weatherforecast/{id}     | Delete forecast      |

## Configuration

The database connection string is configured in `backend/appsettings.json`. The default connects to the Docker SQL Server instance:

```
Server=localhost,1433;Database=AppDb;User Id=sa;Password=YourStrong!Passw0rd;TrustServerCertificate=true
```

The frontend API URL can be configured via the `VITE_API_URL` environment variable (defaults to `http://localhost:5001`).
