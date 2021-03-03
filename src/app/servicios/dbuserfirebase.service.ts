import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/usuario.model';
import firebase from "firebase/app"

@Injectable({
  providedIn: 'root'
})
export class DbuserfirebaseService {

  constructor( private db: AngularFirestore ) { }

  private CollectionName = 'usuario';

  get(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<User>(this.CollectionName).get();
  }

  save(user_: User): Promise<DocumentReference> {
    return this.db.collection(this.CollectionName).add(user_);
  }

}
