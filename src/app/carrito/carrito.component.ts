import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../interfaces/item.interface';
import { Observable, Subscription } from 'rxjs';
import { CarritoService } from '../servicios/carrito.service';
import { DbcartfirebaseService } from '../servicios/dbcartfirebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@firebase/auth-types';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.sass']
})
export class CarritoComponent implements OnInit {

  public items: Array<Item>
  public totalPrice:number = 0;
  public totalQuantity:number = 0;
  user: User;
  clientesSubscription: Subscription;
  currendata$: any;

  constructor(
    private afAuth: AngularFireAuth,
    private _cartService:CarritoService, 
    private _cart:DbcartfirebaseService,) { }

  ngOnInit(){

    this.afAuth.user.subscribe(user => {
      if (user){
        this.user = user;
      }
    });


    this.currendata$ = this._cartService.currentDataCart$;    
    this.clientesSubscription = this.currendata$.subscribe(x=>{
                if(x)
                {
                  this.items = x;
                  this.totalQuantity = x.length;
                  this.totalPrice = x.reduce((sum, current) => sum + (current.price * current.quantity), 0);
                }
              })
              
  }

  ngOnDestroy() {
    this.clientesSubscription.unsubscribe();
  }

  public remove(producto:Item)
  {
    this._cartService.removeElementCart(producto);

    this._cart.getByUser(this.user.email).subscribe(response => {
      response.docs.forEach(value => {
        let data = value.data();
        let id = value.id;

        if(data.producto == producto.referencia){
          this._cart.delete(id)
            .then( ) 
            .catch(err => console.error(err));
          }

      });
    });
  }

}
