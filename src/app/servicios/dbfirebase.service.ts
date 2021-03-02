import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item.interface';
import firebase from "firebase/app"

@Injectable({
  providedIn: 'root'
})
export class DbfirebaseService {

  constructor(private db: AngularFirestore) { }

  private CollectionName = 'productos';
  
  get(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Item>(this.CollectionName).get();
  }

  save(item: Item): Promise<DocumentReference> {
    return this.db.collection(this.CollectionName).add(item);
  }

  edit(id: string, obj: Object): Promise<void>{
  return this.db.collection(this.CollectionName).doc(id).update(obj);
  }

  delete(id: string): Promise<void>{
    return this.db.collection(this.CollectionName).doc(id).delete();
  }

}
