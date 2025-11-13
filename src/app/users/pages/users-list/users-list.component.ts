import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
  private readonly userService = inject(UserService);
  private readonly users = this.userService.users;
  protected readonly searchTerm = signal('');
  protected readonly filteredUsers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.users();
    }
    return this.users().filter((user) => user.fullName.toLowerCase().includes(term));
  });

  protected trackById(_: number, user: User): string {
    return user.id;
  }

  protected handleSearch(value: string): void {
    this.searchTerm.set(value);
  }

  protected handleDelete(user: User): void {
    const shouldDelete = confirm(`Deseja remover ${user.fullName}?`);
    if (shouldDelete) {
      this.userService.delete(user.id);
    }
  }
}
