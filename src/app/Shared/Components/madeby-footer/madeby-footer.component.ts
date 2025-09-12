import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-madeby-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './madeby-footer.component.html',
  styleUrls: ['./madeby-footer.component.css']
})
export class MadebyFooterComponent {
  currentYear = new Date().getFullYear();
  authorName = 'Harold Gaviria'; 
  projectName = 'Angular 19'; 
}
