import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { GameComponent } from './main-content/game/game.component';


export const routes: Routes = [
    { path: '', component: MainContentComponent },
    { path: 'game/:id', component: GameComponent },
];
