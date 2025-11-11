import { Injectable, InjectionToken, computed, inject, signal } from '@angular/core';
import { User, UserPayload } from '../models/user.model';

export const LOCAL_STORAGE = new InjectionToken<Storage | null>('LOCAL_STORAGE', {
  factory: () => (typeof window !== 'undefined' ? window.localStorage : null)
});

const STORAGE_KEY = 'crud-app-users';

@Injectable({ providedIn: 'root' })
export class UserService {
  #storage = inject(LOCAL_STORAGE);
  #users = signal<User[]>(this.#restoreUsers());

  readonly users = computed(() => this.#users());

  getAll(): User[] {
    return this.#users().map((user) => ({
      ...user,
      address: { ...user.address }
    }));
  }

  getById(id: string): User | undefined {
    return this.#users().find((user) => user.id === id);
  }

  create(payload: UserPayload): User {
    const now = new Date().toISOString();
    const user: User = {
      ...payload,
      id: this.#generateId(),
      birthDate: new Date(payload.birthDate).toISOString(),
      createdAt: now,
      updatedAt: now
    };

    this.#persist([...this.#users(), user]);
    return user;
  }

  update(id: string, payload: UserPayload): User {
    const nextUsers = this.#users().map((user) =>
      user.id === id
        ? {
            ...user,
            ...payload,
            birthDate: new Date(payload.birthDate).toISOString(),
            updatedAt: new Date().toISOString()
          }
        : user
    );

    const updated = nextUsers.find((user) => user.id === id);
    if (!updated) {
      throw new Error('Usuário não encontrado.');
    }

    this.#persist(nextUsers);
    return updated;
  }

  delete(id: string): void {
    this.#persist(this.#users().filter((user) => user.id !== id));
  }

  #persist(users: User[]): void {
    if (this.#storage) {
      this.#storage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
    this.#users.set(users);
  }

  #restoreUsers(): User[] {
    if (!this.#storage) {
      return [];
    }

    const raw = this.#storage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw) as User[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  #generateId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `user_${Math.random().toString(36).slice(2, 10)}`;
  }
}
