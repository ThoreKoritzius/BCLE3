import { Component, Input, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { BusinessPattern } from '../database';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  @Input() progress: number = 0;
  @Input() resultPatterns: BusinessPattern[] | undefined;
  constructor(private stateService: StateService) { }
  ngOnInit(): void {
    this.stateService.evaluatePattern()
    this.progress = this.stateService.progress;
    this.resultPatterns = this.stateService.resultPatterns;
    console.log(this.resultPatterns)
  }
  getCircleColor() {
    return this.stateService.getCircleColor()
  }
  hideReason(pattern: BusinessPattern) {
    return this.stateService.hideReason(pattern)
  }
  showReason(pattern: BusinessPattern) {
    return this.stateService.showReason(pattern)
  }
  getPatternOpacity(pattern: BusinessPattern) {
    return this.stateService.getPatternOpacity(pattern)
  }
}
