import { Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersListComponent,
    title: 'Usuários'
  },
  {
    path: 'new',
    component: UserFormComponent,
    title: 'Novo usuário'
  },
  {
    path: ':id/edit',
    component: UserFormComponent,
    title: 'Editar usuário'
  }
];
