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
import { Firestore, collection, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { onSnapshot } from "firebase/firestore";
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    GameInfoComponent,
    MatButtonToggleModule,
    MatCardModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {

  game = new Game();
  gameInfo = new GameInfoComponent();
  gameId: string = '';
  private docUnsubscribe: any;


  constructor(private route: ActivatedRoute, private firestore: Firestore = inject(Firestore), public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe(async (params: any) => {
      console.log(params.id);
      this.gameId = params.id;

      // Unsubscribe from previous snapshot listener, if any
      if (this.docUnsubscribe) {
        this.docUnsubscribe();
      }

      // Subscribe to changes in the document
      this.docUnsubscribe = onSnapshot(doc(this.getGamesRef(), this.gameId), (docSnapshot) => {
        if (docSnapshot.exists()) {
          const gameData: any = docSnapshot.data();
          this.displayGameData(gameData);
        } else {
          console.log('Document does not exist');
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.docUnsubscribe) {
      this.docUnsubscribe();
    }
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

  // async getCollection() {
  //   this.route.params.subscribe(async (params: any) => {
  //     console.log(params.id);
  //     this.gameId = params.id;
  //     const docRef = doc(collection(this.firestore, 'games'), this.gameId);

  //     try {
  //       const docSnapshot = await getDoc(docRef);

  //       if (docSnapshot.exists()) {
  //         const gameData: any = docSnapshot.data();
  //         this.displayGameData(gameData);
  //       } else {
  //         console.log('Document does not exist');
  //       }
  //     } catch (error) {
  //       console.error('Error getting document:', error);
  //     }
  //   });
  // }

  displayGameData(gameData: any) {
    console.log('Game update:', gameData);
    this.game.players = gameData.players;
    this.game.stack = gameData.stack;
    this.game.playedCards = gameData.playedCards;
    this.game.currentPlayer = gameData.currentPlayer;
    this.game.pickCardAnimation = gameData.pickCardAnimation;
    this.game.currentCard = gameData.currentCard;
  }


  newGame() {
    this.game;
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {

      const poppedCard: string | undefined = this.game.stack.pop();


      if (poppedCard !== undefined) {
        this.game.currentCard = poppedCard;

        this.game.pickCardAnimation = true;
        console.log('New Card:' + this.game.currentCard);
        console.log('Game is', this.game);
        this.saveGames();
      } else {
        console.log('Keine Karte mehr im Stapel.');
      }

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGames();
      }, 1000);
    }

    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGames();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string | undefined) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGames();

        // Reset the state to show the default message
        this.gameInfo.isCardSelected = false;
      }
    });
  }


  saveGames() {
    this.updateTheDoc()
  }


  async updateTheDoc() {
    const docRef = doc(this.getGamesRef(), this.gameId);

    const updatedData = {
      players: this.game.players || [],
      stack: this.game.stack || [],
      playedCards: this.game.playedCards || [],
      currentPlayer: this.game.currentPlayer || 0,
      currentCard: this.game.currentCard || [],
      pickCardAnimation: this.game.pickCardAnimation
    };

    // Update the document
    await updateDoc(docRef, updatedData);
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

}


