import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; // Asegúrate de que esta ruta sea correcta
import { Router } from '@angular/router'; // Para redireccionar después de login
import Swal from 'sweetalert2'; // Para mostrar alertas visuales

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoginMode = true; // Controla si está en modo login o registro

  // Formularios reactivos
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inyectar AuthService
    private router: Router // Inyectar el Router para redirigir
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Alternar entre login y registro
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      Swal.fire('Error', 'Completa todos los campos correctamente.', 'error');
      return;
    }

    const { username: correo, password } = this.loginForm.value;

    this.authService.login(correo, password).subscribe(
      (response) => {
        // Verificar si se recibe el token
        if (response.token) {
          // Mostrar el token en consola para verificar que es correcto
          console.log('Token recibido:', response.token);

          // Almacenar el token en localStorage (puedes también usar sessionStorage)
          localStorage.setItem('token', response.token);

          Swal.fire('Éxito', 'Sesión iniciada correctamente.', 'success');


          this.authService.getRole().subscribe((role) => {
            if (role === 'USER') {
              this.router.navigate(['dash-admin']);
            } else if (role === 'ADMIN') {

              this.router.navigate(['/admin/dashboard']);
            } else {
              Swal.fire('Error', 'Rol no autorizado.', 'error');
            }
          });
        } else {
          Swal.fire(
            'Error',
            'No se recibió el token de autenticación.',
            'error'
          );
        }
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        Swal.fire(
          'Error',
          'Nombre de usuario o contraseña incorrectos.',
          'error'
        );
      }
    );
  }

  // Método para registrarse
  onRegister() {
    if (this.registerForm.invalid) {
      Swal.fire('Error', 'Completa todos los campos correctamente.', 'error');
      return;
    }

    const userData = this.registerForm.value;

    this.authService.register(userData).subscribe(
      (response) => {
        Swal.fire('Éxito', 'Cuenta creada correctamente.', 'success');
        // Redirigir después del registro, por ejemplo, al login
        this.switchMode(); // Cambia a la vista de login
      },
      (error) => {
        Swal.fire('Error', 'Hubo un problema al crear la cuenta.', 'error');
      }
    );
  }
}
