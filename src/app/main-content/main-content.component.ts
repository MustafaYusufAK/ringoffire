import { Component } from '@angular/core';
import { StartScreenComponent } from '../main-content/start-screen/start-screen.component';
import { GameComponent } from '../main-content/game/game.component';


@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [StartScreenComponent,
    GameComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
