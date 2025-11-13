## CRUD App

Mini aplicativo Angular standalone (v20) para gestão de usuários com CRUD completo, formulários reativos e persistência local via `localStorage`.

### Como rodar
1. Instale dependências  
   ```bash
   npm install
   ```
2. Suba o servidor de desenvolvimento  
   ```bash
   npm start
   ```
   Abra `http://localhost:4200/` (o flag `-o` pode ser usado: `ng serve -o`).

### Scripts úteis
- `npm start` – `ng serve` em modo dev
- `npm run build` – build de produção em `dist/`
- `npm test` – unit tests via Karma/Jasmine

### Funcionalidades
- CRUD de usuários (`/users`, `/users/new`, `/users/:id/edit`)
- Formulário reativo com validações para nome, data de nascimento, e-mail, senha e endereço completo (UF, logradouro, número)
- Persistência no navegador com service dedicado (`UserService`) + `localStorage`
- Componentes standalone organizados por feature (`users/pages`, `users/services`, etc.)
- Estilos globais em `src/styles.scss` + CSS modular por página

### Estrutura principal
```
src/
 ├─ app/
 │   ├─ users/
 │   │   ├─ pages/
 │   │   │   ├─ users-list/
 │   │   │   └─ user-form/
 │   │   ├─ services/user.service.ts
 │   │   ├─ models/user.model.ts
 │   │   └─ users.routes.ts
 │   ├─ app.routes.ts
 │   └─ app.ts
 └─ styles.scss
```

### Testes
- `UserService` possui specs cobrindo criação/atualização/exclusão com storage mockado
- `UsersListComponent` validado com `RouterTestingModule` para garantir renderização e exclusão

### Próximos passos sugeridos
- Adicionar e2e (Cypress/Playwright) se necessário
- Publicar o build (`ng build --configuration production`) em Vercel/GitHub Pages



### Deploy (GitHub Pages)
- Build publicado em https://alexispincowscy.github.io/crud-app/users
