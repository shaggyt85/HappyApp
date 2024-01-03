import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PeopleTableComponent } from '../people-table/people-table.component';
import { DataSharingState } from '../app.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  $subscription: Subscription;
  constructor(public dialog: MatDialog) {
    this.$subscription = DataSharingState.getAsyncData().subscribe((prop) => {
      console.log(prop);
    })
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PeopleTableComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  ngOnDestroy(): void{
    this.$subscription.unsubscribe();
  }
}
