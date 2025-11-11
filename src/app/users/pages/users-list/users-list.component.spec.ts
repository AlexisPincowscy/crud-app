import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { signal } from '@angular/core';
import { UsersListComponent } from './users-list.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

const usersMock: User[] = [
  {
    id: '1',
    fullName: 'Jane Doe',
    birthDate: new Date('1990-05-10').toISOString(),
    email: 'jane@example.com',
    password: 'secret',
    address: { state: 'SP', street: 'Rua A', number: '10' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    fullName: 'John Doe',
    birthDate: new Date('1985-02-20').toISOString(),
    email: 'john@example.com',
    password: 'secret',
    address: { state: 'RJ', street: 'Rua B', number: '20' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

class UserServiceStub {
  users = signal(usersMock);
  delete = jasmine.createSpy('delete');
}

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let service: UserServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListComponent, RouterTestingModule],
      providers: [{ provide: UserService, useClass: UserServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UserService) as unknown as UserServiceStub;
    fixture.detectChanges();
  });

  it('should render all users in the table', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  it('should delete a user when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('tbody tr button');
    deleteButton.click();

    expect(service.delete).toHaveBeenCalledWith(usersMock[0].id);
  });
});
