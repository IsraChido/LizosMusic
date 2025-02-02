import { Component, EventEmitter, Output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'search-bar-component',
  imports: [FaIconComponent],
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  faMagnifyingGlass = faMagnifyingGlass;

  @Output() searchQuery = new EventEmitter<string>();

  onSearch(query: string): void {
    this.searchQuery.emit(query);
  }
}
