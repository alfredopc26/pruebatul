import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@firebase/auth-types';
import { IItem } from '../interfaces/item.interface';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.sass']
})
export class ProductosComponent implements OnInit {

  public listProducts:Array<IItem> = [{
    id: 0,
    img: "https://i.blogs.es/d5526e/arduino-uno/450_1000.jpg",
    name: "Arduino",
    price: 500,
    description: "Éste nuevo modelo Arduino UNO (rev3) es practicamente igual que su predecesor Duemilanove y 100% compatible pero incorpora ésta vez una autoselección del voltaje de alimentacion (DC/USB) gracias a un chip MOSFET incluido en la placa.",
    quantity : 1
  },
  {
    id: 1,
    img: "https://electronilab.co/wp-content/uploads/2016/02/NodeMCU-%E2%80%93-Board-de-desarrollo-con-m%C3%B3dulo-ESP8266-WiFi-y-Lua-1.jpg",
    name: "ESP8266 NodeMCU",
    price: 350,
    description: "El ESP8266 es un chip Wi-Fi de bajo coste que funciona mediante el protocolo TCP/IP. Incluye un microcontrolador (Tensilica Xtensa LX106) para manejar dicho protocolo y el software necesario para la conexión 802.11. Además la mayoría de modelos dispone de entradas/salidas digitales de propósito general (GPIO), así como una entrada analógica (ADC de 10bit).",
    quantity : 1
  },
  {
    id: 2,
    img: "https://createc3d.com/shop/1244-thickbox_default/comprar-modulo-rele-5v-compatible-con-arduino-1-canal-precio-oferta.jpg",
    name: "Modulo Relay Rele De 1 Canal 5v 10a Arduino Pic Avr Robotica",
    price: 120,
    description: "Módulo de relevadores (reles) para conmutación de cargas de potencia. Los contactos de los relevadores están diseñados para conmutar cargas de hasta 10 A y 250VAC (30VDC), aunque recomendamos dejar un márgen hacia abajo de estos límites. La señal de control puede provenir de cualquier circuito de control TTL o CMOS como un microcontrolador.",
    quantity : 1
  }]

  constructor( private afAuth: AngularFireAuth, private _cartService:CarritoService ) { }

  user: User;

  ngOnInit(){

    this.afAuth.user.subscribe(user => {
      if (user){
        this.user = user;
      }
    });
  }

  public addCart(product:IItem)
  {
    this._cartService.changeCart(product);
  }


}
