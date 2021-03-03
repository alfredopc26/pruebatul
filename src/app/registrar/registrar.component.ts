import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.sass']
})
export class RegistrarComponent implements OnInit {

  errorMessage = '';

  constructor( 
    private reg: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth,
  ) { }

  registerForm = this.reg.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirm_pass: ['', Validators.required]
  })

  ngOnInit(): void {
  }


  createUser() { 

    if(this.registerForm.value.password == this.registerForm.value.confirm_pass){
      this.afAuth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password).then(() => {
        this.router.navigate(['/productos']);
      }).catch(response => {
        this.errorMessage = response.message;
      });
    }else{
      this.errorMessage = "Las contrase;as no coinciden";
    }

    }

  back() {
      this.router.navigate(['/login']);
  }
}
