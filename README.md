## CRUD App

Mini aplicativo Angular 20 standalone para gestao de usuarios com CRUD completo, formulários reativos e persistencia em `localStorage`. Layout mobile-first, responsivo com SCSS + Bootstrap.

### Demo (GitHub Pages)
- https://alexispincowscy.github.io/crud-app/users

## Como rodar localmente
1. Instale dependencias
   ```bash
   npm install
   ```
2. Suba o servidor de desenvolvimento
   ```bash
   npm start
   ```
   Abra `http://localhost:4200/`. Use `ng serve -o` se quiser abrir automaticamente.

### Scripts uteis
- `npm start` – `ng serve` em modo dev
- `npm run build` – build de producao em `dist/crud-app`
- `npm test` – testes unitarios (Karma/Jasmine)

## Funcionalidades
- CRUD completo de usuarios (`/users`, `/users/new`, `/users/:id/edit`)
- Formulario reativo com validacoes para nome, data, e-mail, senha e endereco completo (UF, logradouro, numero). O campo **Numero** aceita apenas digitos (`inputmode="numeric"` + `pattern="\d*"`).
- Listagem com busca por nome (filtro instantaneo em memoria)
- Persistencia local via `UserService` + `localStorage` utilizando Signals
- Componentes standalone organizados por feature (`users/pages`, `users/services`, `users/models`)
- Estilos globais em `src/styles.scss` + utilitarios Bootstrap

## Estrutura principal
```
src/
 ├─ app/
 │   ├─ app.config.ts
 │   ├─ app.routes.ts
 │   ├─ users/
 │   │   ├─ pages/
 │   │   │   ├─ users-list/
 │   │   │   └─ user-form/
 │   │   ├─ services/user.service.ts
 │   │   ├─ models/user.model.ts
 │   │   └─ constants/states.ts
 ├─ styles.scss
 └─ main.ts
```

## Testes
- `UserService` testado com mock de `localStorage`
- `UsersListComponent` validado com `RouterTestingModule` (renderizacao + delete)
- `App` checa bootstrap do shell

## Deploy
- Workflow GitHub Actions (`.github/workflows/static.yml`) roda `npm ci`, `npm run build -- --configuration production --base-href /crud-app/` e publica em GitHub Pages.
