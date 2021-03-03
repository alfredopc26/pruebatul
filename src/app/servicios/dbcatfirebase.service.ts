import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { categoria } from '../interfaces/categoria.interface';
import firebase from "firebase/app"


@Injectable({
  providedIn: 'root'
})
export class DbcatfirebaseService {

  constructor( private db: AngularFirestore  ) { }

  private CollectionName = 'categoria';

  get(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<categoria>(this.CollectionName).get();
  }

  save(categoria_: categoria): Promise<DocumentReference> {
    return this.db.collection(this.CollectionName).add(categoria_);
  }
}
