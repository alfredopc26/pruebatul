import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Carrito } from '../interfaces/carrito.interface';
import firebase from "firebase/app"

@Injectable({
  providedIn: 'root'
})
export class DbcartfirebaseService {

  constructor(  private db: AngularFirestore ) { }

  private CollectionName = 'carrito';


  getByUser( user: string ): Observable<firebase.firestore.QuerySnapshot> {       
    return this.db.collection<Carrito>(this.CollectionName, ref => ref.where('usuario', '==', user)).get();
  }

  save(carrito_: Carrito): Promise<DocumentReference> {
    return this.db.collection(this.CollectionName).add(carrito_);
  }

  delete(id: string): Promise<void>{
    return this.db.collection(this.CollectionName).doc(id).delete();
  }
}
