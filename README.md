## How to Run Locally

Prerequisites

- Node.js >= 18
- PHP >= 8.1
- Composer
- MySQL

Run the following commands:

**Backend:**

```bash
git clone <repo-url>
cd signal-dashboard
composer install
cp .env.example .env
php artisan key:generate
```

**Frontend:**

```bash
cd frontend
cp .env.example .env
npm install
```

## Environment Variables

Update the root `.env` with your database credentials:

```
DB_DATABASE=signal_dashboard
DB_USERNAME=root
DB_PASSWORD=your_password
```

Update `frontend/.env`:

```
VITE_API_URL=http://127.0.0.1:8000
```

Then run migrations and seed the database:

```bash
php artisan migrate
php artisan db:seed
```

### Running the App

You need two terminals:

**Terminal 1 — Laravel API** (from project root):

```bash
php artisan serve
```

**Terminal 2 — Vite dev server** (from `frontend/`):

```bash
cd frontend
npm run dev
```

- API: `http://localhost:8000`
- App: `http://localhost:5173`
