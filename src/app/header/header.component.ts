import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@firebase/auth-types';
import { Router } from '@angular/router';
import { CarritoService } from '../servicios/carrito.service';


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
  totalQuantity:number = 0;

  constructor( 
    private afAuth: AngularFireAuth ,
    private router: Router,
    private _cartService:CarritoService
     ) { }

  ngOnInit(){
    this.afAuth.user.subscribe(user => {
      this.user = user;
    });
    
    this._cartService.currentDataCart$.subscribe(x=>{
      if(x)
      {
        this.totalQuantity = x.length;
      }
    })
  }

  cart(){ 
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
