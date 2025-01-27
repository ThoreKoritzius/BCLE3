import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.css'
})
export class ImprintComponent {

}
