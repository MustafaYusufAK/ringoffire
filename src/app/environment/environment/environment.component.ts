import { Component } from '@angular/core';


@Component({
  selector: 'app-environment',
  standalone: true,
  imports: [],
  templateUrl: './environment.component.html',
  styleUrl: './environment.component.scss'
})
export class EnvironmentComponent {

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  static firebaseConfig = {
    apiKey: "AIzaSyC_jO5phCRNWwe5j5mZhZI-Cys222Nv0mo",
    authDomain: "ring-of-fire-a2f52.firebaseapp.com",
    projectId: "ring-of-fire-a2f52",
    storageBucket: "ring-of-fire-a2f52.appspot.com",
    messagingSenderId: "209907576719",
    appId: "1:209907576719:web:3a31d32e3aa0e9b96665fa",
    measurementId: "G-DM140S7CG7"
  };

  constructor() {

  }



}
