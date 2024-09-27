import { Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { DiscListComponent } from "../../components/disc-list/disc-list.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SearchInputComponent, DiscListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export default class HomePageComponent {

}
