import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PeopleTableComponent } from '../people-table/people-table.component';
import { ShaggyStateManager } from '../app.component';
import { SourceOfTruthKey } from '../state-management/store/store';
import { UserStateProperties } from '../state-management/store/states/user.states';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  constructor(public dialog: MatDialog) {
    ShaggyStateManager.getEntity(SourceOfTruthKey.USER).getObservable().subscribe((user) => {
      console.log(user)
    })
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PeopleTableComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  ngOnDestroy(): void{
    ShaggyStateManager.getEntity(SourceOfTruthKey.USER).unsubscribe
  }
}
