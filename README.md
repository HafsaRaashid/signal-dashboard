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

### Environment Variables

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

### Stack choices and why

**React + Vite** — preferred stack per the assessment. State management with hooks kept things simple without needing any external library.
**Laravel** — preferred stack per the assessment. Eloquent and built-in migrations/seeders kept the backend clean and fast to scaffold.
**MySQL** — Preferred stack, fit for the relational account/signal data model.
**Tailwind CSS** — quick to build with, no switching between CSS files and components.

### Trade offs

- **Input validation:** The POST /api/signals endpoint accepts data without strict validation. With more time I'd add proper validation with meaningful error responses.

- **Tests:** With more time I'd add feature tests for each API endpoint covering happy paths and error cases.

- **Pagination:** Signal lists are returned in full. With more time I'd add pagination.

### What I would add if it was a real product feature

- **Payload input:** In a real product, signals would be ingested automatically not manually. The form exists to satisfy the assessment requirement. Payload fields are structured per signal type rather than accepting raw JSON.
