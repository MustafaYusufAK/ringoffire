import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'; // Wichtig: FormsModule importieren
import { MatInputModule } from '@angular/material/input';




@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    CommonModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>,) { }

  name: string = '';

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
