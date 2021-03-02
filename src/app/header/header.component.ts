import { Component, OnInit, Input, NgZone} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@firebase/auth-types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  
  @Input()
  user: User;


  errorMessage = '';
  openCart = false;

  constructor( 
    private afAuth: AngularFireAuth ,
    private router: Router,
    private ngZone: NgZone
     ) { }

  ngOnInit(){
  }

  cart(){ //Se usa para abrir o cerrar el carrito
    this.openCart = !this.openCart;
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch(response => {
      this.errorMessage = response.message;
    });
  }
  

}
