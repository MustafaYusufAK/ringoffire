import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'; // Richtiges Modul importieren
import { Firestore, collection, collectionData, addDoc, doc, getDoc } from '@angular/fire/firestore';
import { Game } from '../../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  game = new Game();

  constructor(private router: Router, private firestore: Firestore = inject(Firestore),) {

  }

  async newGame() {
    //Start Game
    const docRef = await addDoc(collection(this.firestore, "games"), this.game.toJson());
    console.log("Document written with ID: ", docRef.id);

    this.router.navigateByUrl('/game/' + docRef.id);
  }

}
