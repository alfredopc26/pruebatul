import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@firebase/auth-types';

import { Item } from '../interfaces/item.interface';
import { categoria } from '../interfaces/categoria.interface';
import { Carrito  } from '../interfaces/carrito.interface';

import { CarritoService } from '../servicios/carrito.service';
import { DbfirebaseService } from '../servicios/dbfirebase.service';
import { DbcatfirebaseService } from '../servicios/dbcatfirebase.service';
import { DbcartfirebaseService } from '../servicios/dbcartfirebase.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import { reflow } from '@ng-bootstrap/ng-bootstrap/util/util';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.sass']
})
export class ProductosComponent implements OnInit {

  closeResult = '';
  prodForm: FormGroup;
  catForm: FormGroup;
  prodEdit: FormGroup;
  user: User;
  listProducts: Array<Item> = [];
  listProduct: any;
  IdProduct: string;
  listCats: Array<categoria> = [];
  listcart: Array<Carrito> = [];
  loader= true;
  productosView = false;

  constructor( 
    private afAuth: AngularFireAuth, 
    private _cartService:CarritoService, 
    private _db:DbfirebaseService,
    private _cat:DbcatfirebaseService,
    private _cart:DbcartfirebaseService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar ) { }

  ngOnInit(){

    this.prodForm = this.formBuilder.group({
      referencia: ['', Validators.required],
      categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      image: [''],
      precio: ['', Validators.required]
    });

    this.catForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });

    this.prodEdit = this.formBuilder.group({
      referencia: [0, Validators.required],
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
        this.loadCat();
        this.loadCart();
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

    let datos: Carrito = {
      usuario: this.user.email,
      producto: product.referencia
    };
    this._cart.save(datos)
    .then( ) 
    .catch(err => console.error(err));

    this.openSnackBar("Se ha agregado el siguiente item al carrito", product.name )
  }

  checkAdded(item){
    this._cartService.currentDataCart$.subscribe(x=>{
      if(x == item)
      {
       return true;
      }else{
        return false;
      }
    })
  }

  remove(producto:Item)
  {
    this._cartService.removeElementCart(producto);
  }

  load() {
    this._db.get().subscribe(response => {
      this.listProducts = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const datos: Item = {
          id: id,
          referencia: data.referencia,
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

  loadCat() {
    this._cat.get().subscribe(response => {
      this.listCats = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const datos: categoria = {
          id: id,
          nombre: data.nombre,
          descripcion: data.descripcion
        };

      this.listCats.push(datos);
      console.log(this.listCats);
      });
    });
  }

  loadCart(){

    this._cart.getByUser(this.user.email).subscribe(response => {
      response.docs.forEach(value => {
        // alert(this.user.email);
        const data = value.data();
        this._db.getByRef(data.producto).subscribe(response => {
          response.docs.forEach(value => { 
              const data = value.data();
              const id = value.id;
              const datos: Item = {
                id: id,
                referencia: data.referencia,
                name: data.nombre,
                img: data.image,
                description: data.descripcion,
                price: data.precio,
                quantity: 1
              };
              this._cartService.changeCart(datos);
          });
        });        
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

  openDelete(content, referencia) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this._db.getByRef(referencia).subscribe(response => {
      response.docs.find(value => { 
          let data = value.data();
          let id = value.id;
          this.listProduct = {
            id: id,
            referencia: data.referencia,
            name: data.nombre
          };

          console.log(this.listProduct);
      });

    }); 
  }

  openDetails(content, referencia) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this._db.getByRef(referencia).subscribe(response => {
      response.docs.find(value => { 
          let data = value.data();
          let id = value.id;
          this.listProduct = {
            id: id,
            referencia: data.referencia,
            name: data.nombre,
            img: data.image,
            description: data.descripcion,
            price: data.precio,
            quantity: 1
          };

          console.log(this.listProduct);
      });

    }); 

  }

  openEdit(content, referencia) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this._db.getByRef(referencia).subscribe(response => {
      response.docs.find(value => { 
          let data = value.data();
          this.IdProduct = value.id;
          this.prodEdit = this.formBuilder.group({
            referencia: [data.referencia, Validators.required],
            categoria: [data.categoria, Validators.required],
            nombre: [data.nombre, Validators.required],
            descripcion: [data.descripcion, Validators.required],
            image: [data.image],
            precio: [data.precio, Validators.required]
          });

          console.log(this.IdProduct);
      });

    }); 

  }

  saveTodo() {
    // Validar el formulario
    if (this.prodForm.invalid) {
      return;
    }
 
    let todo: Item = this.prodForm.value;
    this._db.save(todo)
      .then(response => this.modalService.dismissAll(response.id) ) 
      .catch(err => console.error(err));
     
      this.loader = true;
      this.productosView = false;
      this.load()
  }

  saveCat() {

    if (this.catForm.invalid) {
      return;
    }
 
    let cat: categoria = this.catForm.value;
    this._cat.save(cat)
      .then(response => this.modalService.dismissAll(response.id) ) 
      .catch(err => console.error(err));
     
      this.loadCat();
      this.openSnackBar("Se ha agregado la categoria", this.catForm.value.nombre );
  }

  editProd(id) {

    if (this.prodEdit.invalid) {
      return;
    }
 
    let producto: Item = this.prodEdit.value;
    this._db.edit(id, producto)
      .then(response => this.modalService.dismissAll() ) 
      .catch(err => console.error(err));
     
      this.loader = true;
      this.productosView = false;
      this.load()
      this.openSnackBar("Se ha editado el producto. ", this.prodEdit.value.nombre );
  }

  deleteProd(id) {

    this._db.delete(id)
      .then(response => this.modalService.dismissAll() ) 
      .catch(err => console.error(err));
     
      this.loader = true;
      this.productosView = false;
      this.load()
      this.openSnackBar("Se ha eliminado el producto. ", id );
  }

  loadProductCat(ref){

    if(ref==""){
      this.loader= true;
      this.productosView = false;
      this.load();
    }else{
    this._db.getByCat(ref).subscribe(response => {
      this.listProducts = [];
      response.docs.forEach(value => {
        const data = value.data();
        const id = value.id;
        const datos: Item = {
          id: id,
          referencia: data.referencia,
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

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
