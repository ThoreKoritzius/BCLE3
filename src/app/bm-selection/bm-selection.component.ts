import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { StateService } from '../state.service';

type NestedObject = {
  [key: string]: string | NestedObject;
};

function getKeyByValue(obj: NestedObject, value: string): string | null {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === value) {
        return key;
      }
      if (typeof obj[key] === 'object') {
        const nestedKey = getKeyByValue(obj[key] as NestedObject, value);
        if (nestedKey) {
          return `${key}.${nestedKey}`;
        }
      }
    }
  }
  return null;
}



@Component({
  selector: 'app-bm-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bm-selection.component.html',
  styleUrls: ['./bm-selection.component.css']
})


export class BmSelectionComponent implements OnInit {
  constructor(private stateService: StateService) { }
  ngOnInit(): void {
  }

  getCategories() {
    return this.stateService.getCategories()
  }
  getQuestions(category: string) {
    return this.stateService.getQuestions(category)
  }
  getOptions(dimension: any) {
    return this.stateService.getOptions(dimension)
  }
  onSelectAnswer(question: string, answer: string): void {
    return this.stateService.onSelectAnswer(question, answer)
  }

  getBMQuestionState(question: string, answer: string) {
    return this.stateService.getBMQuestionState(question, answer);
  }

}
