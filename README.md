# Angular User Management

An Angular 20 demo for creating, viewing, editing, and deleting users. It uses standalone components, reactive forms, Signals, and browser storage. The responsive layout uses SCSS and Bootstrap.

[Open the live demo](https://alexispincowscy.github.io/crud-app/users)

## Run locally

```bash
npm install
npm start
```

Open http://localhost:4200/.

## Features

- Browse and filter users by name at `/users`.
- Create and edit users at `/users/new` and `/users/:id/edit`.
- Validate name, date, email, password, and address with reactive forms. The street number field accepts digits only.
- Keep data in the current browser with `UserService`, Angular Signals, and `localStorage`. Use sample data when trying the demo.

## Project structure

- `src/app/app.routes.ts` defines the routes.
- `src/app/users/pages/` contains the list and form views.
- `src/app/users/services/user.service.ts` manages state and persistence.
- `src/app/users/models/` and `src/app/users/constants/` contain the user model and state options.
- `src/styles.scss` contains the global styles.

## Build, test, and deploy

- `npm run build` builds to `dist/crud-app`.
- `npm test` runs the Karma and Jasmine tests. Coverage includes browser storage, list rendering and deletion, and application startup.
- The [GitHub Actions workflow](.github/workflows/static.yml) builds and deploys the app to GitHub Pages.
