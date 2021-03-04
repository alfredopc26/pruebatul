import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'pruebatul';
  userLogin = false;

  constructor( 
    private afAuth: AngularFireAuth ) { }

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.userLogin = true;
      }
    });
  }



}
