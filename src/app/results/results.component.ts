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
  @Input() uvpSuccessful: boolean | undefined;
  @Input() uvp: string | undefined;


  @Input() problemsSuccessful: boolean | undefined;
  @Input() problems: string | undefined;

  @Input() solutionsSuccessful: boolean | undefined;
  @Input() solutions: string | undefined;
  
  @Input() bmExtractionSuccessful: boolean | undefined;
  constructor(private stateService: StateService) { }
  ngOnInit(): void {
    this.stateService.evaluatePattern()
    this.progress = this.stateService.progress;
    this.resultPatterns = this.stateService.resultPatterns;
    this.uvp = this.stateService.uvp;
    this.uvpSuccessful =this.stateService.uvpSuccessful;
    this.solutions = this.stateService.solutions;
    this.solutionsSuccessful =this.stateService.solutionsSuccessful;
    this.problems = this.stateService.problems;
    this.problemsSuccessful =this.stateService.problemsSuccessful;
    this.bmExtractionSuccessful = this.stateService.progress == 100;
    console.log(this.uvpSuccessful)
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
