import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'pruebatul';

  openCart = false;

  cart(){ //Se usa para abrir o cerrar el carrito
    this.openCart = !this.openCart;
  }

}
