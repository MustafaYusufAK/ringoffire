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
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


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

  constructor(private firestore: Firestore = inject(Firestore), public dialog: MatDialog) {


  }


  getCollection() {
    const aCollection = collection(this.firestore, 'games');

    collectionData(aCollection).subscribe((games: any[]) => {
      console.log('Game update', games);
    });
  }



  ngOnInit(): void {
    this.newGame();
    this.getCollection();
  }

  newGame() {
    this.game;
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


