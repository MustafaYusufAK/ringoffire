import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Firestore, collection, collectionData, addDoc, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    GameInfoComponent,
    MatButtonToggleModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game = new Game();

  constructor(private route: ActivatedRoute, private firestore: Firestore = inject(Firestore), public dialog: MatDialog) {


  }


  // getCollection() {


  //   this.route.params.subscribe((params: any) => {
  //     console.log(params.id);
  //     const aCollection = doc(collection(this.firestore, 'games'), params.id);
  //     console.log(aCollection);


  //     // collectionData(aCollection).subscribe((games: any[]) => {
  //     //   console.log('Game update', games);
  //     //   console.log("Document written with ID: ", aCollection.id);
  //     // });
  //   });

  // }

  getCollection() {
    this.route.params.subscribe((params: any) => {
      console.log(params.id);
      const docRef = doc(collection(this.firestore, 'games'), params.id);

      getDoc(docRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const game: any = docSnapshot.data();
          // Verwende eine Arrow-Funktion hier
          const displayGameData = (gameData: any) => {
            console.log('Game update:', gameData);
            this.game.currentPlayer = gameData.currentPlayer;
            this.game.playedCards = gameData.playedCards;
            this.game.players = gameData.players;
            this.game.stack = gameData.stack;
          };

          // Rufe die Arrow-Funktion auf und übergebe die Daten
          displayGameData(game);
        } else {
          console.log('Document does not exist');
        }
      }).catch((error) => {
        console.error('Error getting document:', error);
      });
    });
  }



  ngOnInit(): void {
    this.newGame();
    this.getCollection();

  }

  async newGame() {
    this.game;
    // const docRef = await addDoc(collection(this.firestore, "games"), this.game.toJson());
    // console.log("Document written with ID: ", docRef.id);
  }

  takeCard() {
    if (!this.pickCardAnimation) {

      const poppedCard: string | undefined = this.game.stack.pop();

      if (poppedCard !== undefined) {
        this.currentCard = poppedCard;

        this.pickCardAnimation = true;
        console.log('New Card:' + this.currentCard);
        console.log('Game is', this.game);
      } else {
        console.log('Keine Karte mehr im Stapel.');
      }

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }

    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string | undefined) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}


