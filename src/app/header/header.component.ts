import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@firebase/auth-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input()
  user: User;

  errorMessage = '';

  constructor( 
    private afAuth: AngularFireAuth ,
    private router: Router ) { }

  ngOnInit(): void {
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    }).catch(response => {
      this.errorMessage = response.message;
    });
  }
  

}
