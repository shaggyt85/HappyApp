import { Component } from '@angular/core';
import { PeopleTableComponent } from '../people-table/people-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PeopleTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
