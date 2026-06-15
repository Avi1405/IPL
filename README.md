# IPL Dashboard

A full-stack dashboard for exploring Indian Premier League results from 2008 through 2020.

The backend imports 816 historical matches from CSV with Spring Batch, derives team-level win statistics, persists the data with JPA and HSQLDB, and exposes REST endpoints. The React frontend lets users browse teams, recent results, win/loss ratios, and season history.

## Highlights

- Spring Batch CSV ingestion pipeline
- Spring Data JPA repositories and derived queries
- REST APIs for team summaries and season results
- React routing for team and season views
- Win/loss visualization with `react-minimal-pie-chart`
- Embedded HSQLDB for a zero-configuration local demo
- Backend and frontend CI checks

## Architecture

```text
match-data.csv -> Spring Batch -> HSQLDB -> Spring REST API -> React dashboard
```

## Run locally

Start the backend:

```bash
./mvnw spring-boot:run
```

In a second terminal, start the frontend:

```bash
cd src/frontend
npm install --no-package-lock
npm start
```

Open `http://localhost:3000`. The frontend uses `http://localhost:8080` by default. Set `REACT_APP_API_URL` to use another backend URL.

## API

- `GET /teams`
- `GET /teams/{teamName}`
- `GET /teams/{teamName}/matches?year=2020`

## Test

```bash
./mvnw test

cd src/frontend
npm install --no-package-lock
CI=true npm test -- --watchAll=false
npm run build
```

## Dataset

The checked-in dataset contains 816 matches covering the 2008-2020 seasons. Historical franchise names are normalized in the source data so team records remain coherent across seasons.
