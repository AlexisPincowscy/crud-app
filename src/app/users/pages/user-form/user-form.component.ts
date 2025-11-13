import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BRAZILIAN_STATES } from '../../constants/states';
import { UserService } from '../../services/user.service';
import { UserPayload } from '../../models/user.model';

const PASSWORD_POLICY_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  protected readonly states = BRAZILIAN_STATES;
  protected readonly today = new Date().toISOString().split('T')[0];
  protected readonly isEditMode = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    fullName: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    birthDate: this.fb.nonNullable.control('', Validators.required),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(PASSWORD_POLICY_REGEX)
    ]),
    address: this.fb.nonNullable.group({
      state: this.fb.nonNullable.control('', Validators.required),
      street: this.fb.nonNullable.control('', Validators.required),
      number: this.fb.nonNullable.control('', Validators.required)
    })
  });

  protected readonly pageTitle = computed(() =>
    this.isEditMode() ? 'Editar usuario' : 'Novo usuario'
  );

  #currentUserId: string | null = null;

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const user = this.userService.getById(id);
        if (!user) {
          this.router.navigate(['/users']);
          return;
        }

        this.#currentUserId = user.id;
        this.isEditMode.set(true);
        this.form.patchValue({
          fullName: user.fullName,
          birthDate: user.birthDate.slice(0, 10),
          email: user.email,
          password: user.password,
          address: {
            ...user.address
          }
        });
      } else {
        this.isEditMode.set(false);
        this.#currentUserId = null;
        this.form.reset({
          fullName: '',
          birthDate: '',
          email: '',
          password: '',
          address: {
            state: '',
            street: '',
            number: ''
          }
        });
      }
    });
  }

  protected handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue() as UserPayload;
    if (this.isEditMode() && this.#currentUserId) {
      this.userService.update(this.#currentUserId, payload);
    } else {
      this.userService.create(payload);
    }

    this.router.navigate(['/users']);
  }

  protected handleCancel(): void {
    this.router.navigate(['/users']);
  }

  protected hasError(controlPath: string): boolean {
    const control = this.form.get(controlPath);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
