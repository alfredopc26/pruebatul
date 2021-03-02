import { Component, OnInit } from '@angular/core';
import { IItem } from '../interfaces/item.interface';
import { Observable } from 'rxjs';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.sass']
})
export class CarritoComponent implements OnInit {

  public items: Array<IItem>
  public totalPrice:number = 0;
  public totalQuantity:number = 0;

  constructor(private _cartService:CarritoService) { }

  ngOnInit(){
    this._cartService.currentDataCart$.subscribe(x=>{
      if(x)
      {
        this.items = x;
        this.totalQuantity = x.length;
        this.totalPrice = x.reduce((sum, current) => sum + (current.price * current.quantity), 0);
      }
    })
  }

  public remove(producto:IItem)
  {
    this._cartService.removeElementCart(producto);
  }

}
