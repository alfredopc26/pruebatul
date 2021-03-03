import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@firebase/auth-types';
import { Item } from '../interfaces/item.interface';
import { form } from '../interfaces/form.interface';
import { CarritoService } from '../servicios/carrito.service';
import { DbfirebaseService } from '../servicios/dbfirebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.sass']
})
export class ProductosComponent implements OnInit {

  closeResult = '';
  prodForm: FormGroup;
  user: User;
  listProducts: Array<Item> = [];
  loader= true;
  productosView = false;

  constructor( 
    private afAuth: AngularFireAuth, 
    private _cartService:CarritoService, 
    private _db:DbfirebaseService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal ) { }

  ngOnInit(){

    this.prodForm = this.formBuilder.group({
      categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      image: [''],
      precio: ['', Validators.required]
    });
    
    this.afAuth.user.subscribe(user => {
      if (user){
        this.user = user;
        this.load();
      }else{
        this.ngZone.run(() => {
          this.router.navigate(['/login']);
        });
      }
    });


  
  }


  addCart(product:Item)
  {
    this._cartService.changeCart(product);
  }

  load() {
    this._db.get().subscribe(response => {
      this.listProducts = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const datos: Item = {
          id: id,
          name: data.nombre,
          img: data.image,
          description: data.descripcion,
          price: data.precio,
          quantity: 1,
        };

      this.listProducts.push(datos);
      this.loader = false;
      this.productosView = true;
      console.log(this.listProducts);
      });
    });
    }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  saveTodo() {
    // Validar el formulario
    if (this.prodForm.invalid) {
      return;
    }
 
    let todo: form = this.prodForm.value;
    this._db.save(todo)
      .then(response => this.modalService.dismissAll(response.id) ) 
      .catch(err => console.error(err));
     
      this.loader = true;
      this.productosView = false;
      this.load()
  }




}
