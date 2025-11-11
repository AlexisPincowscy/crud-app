import { TestBed } from '@angular/core/testing';
import { UserService, LOCAL_STORAGE } from './user.service';
import { UserPayload } from '../models/user.model';

class StorageMock implements Storage {
  #data = new Map<string, string>();

  get length(): number {
    return this.#data.size;
  }

  clear(): void {
    this.#data.clear();
  }

  getItem(key: string): string | null {
    return this.#data.has(key) ? this.#data.get(key)! : null;
  }

  key(index: number): string | null {
    return Array.from(this.#data.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.#data.delete(key);
  }

  setItem(key: string, value: string): void {
    this.#data.set(key, value);
  }
}

describe('UserService', () => {
  let service: UserService;
  let storage: StorageMock;

  const payload: UserPayload = {
    fullName: 'João da Silva',
    birthDate: '1990-01-01',
    email: 'joao@example.com',
    password: '123456',
    address: {
      state: 'SP',
      street: 'Rua A',
      number: '123'
    }
  };

  beforeEach(() => {
    storage = new StorageMock();
    TestBed.configureTestingModule({
      providers: [{ provide: LOCAL_STORAGE, useValue: storage }]
    });
    service = TestBed.inject(UserService);
  });

  it('should create and persist a user', () => {
    const created = service.create(payload);
    expect(created.id).toBeTruthy();
    expect(service.getAll().length).toBe(1);

    const stored = storage.getItem('crud-app-users');
    expect(stored).not.toBeNull();
    expect(stored as string).withContext('Dados devem ser persistidos').toContain('João da Silva');
  });

  it('should update an existing user', () => {
    const created = service.create(payload);
    const updated = service.update(created.id, {
      ...payload,
      fullName: 'João Atualizado'
    });

    expect(updated.fullName).toBe('João Atualizado');
    expect(service.getById(created.id)?.fullName).toBe('João Atualizado');
  });

  it('should delete a user', () => {
    const created = service.create(payload);
    service.delete(created.id);
    expect(service.getAll().length).toBe(0);
  });
});
