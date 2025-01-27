import { getHigherLevelKey, evalQuestions, BusinessModelDimensions, DefinedBusinessPatterns, BusinessPattern, database } from './database';

import { Injectable } from '@angular/core';

type QuestionsType = {
  [key: string]: Array<{
    question: string;
    dimension: any;
  }>;
};

@Injectable({
  providedIn: 'root'
})
export class StateService {
  evalQuestions: QuestionsType = evalQuestions;
  BusinessModelDimensions = BusinessModelDimensions;
  userAnswers: { [key: string]: string } = {};
  resultPatterns = DefinedBusinessPatterns;
  progress: number = 0;

  constructor() { }


  showReason(pattern: BusinessPattern) {
    pattern.showReason = true;
  }

  // Hide reason when not hovering
  hideReason(pattern: BusinessPattern) {
    pattern.showReason = false;
  }

  getCircleColor(): string {
    if (this.progress < 33) {
      return 'darkred';
    } else if (this.progress >= 33 && this.progress < 90) {
      return '#CCCC00';
    } else {
      return 'green';
    }
  }

  updateProgress() {
    const totalCategories = Object.keys(BusinessModelDimensions).length;
    const answeredCategories = Object.values(this.userAnswers).length;
    this.progress = Math.round((100 / totalCategories) * answeredCategories);
  }
  sortByScore(patterns: any[], order: 'asc' | 'desc' = 'desc'): any[] {
    if (!patterns || patterns.length <= 1) {
      return patterns;
    }
    return patterns.sort((a, b) => {
      if (order === 'asc') {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    });
  }


  evaluatePattern() {
    this.resultPatterns = DefinedBusinessPatterns;
    for (var pattern of database) {
      var score = 0;
      let reasons: string[] = [];
      for (var userAnswer of Object.values(this.userAnswers)) {
        if (pattern.dimensions.some(dimension => dimension === userAnswer || dimension.toString() === userAnswer.toString())) {
          score += 1;
          reasons.push(getHigherLevelKey(BusinessModelDimensions, userAnswer) + "\n" + userAnswer);
        }

      }
      //if(score > 0){
      try {
        const currPattern = this.resultPatterns.find(item => item.title === pattern.pattern)!
        currPattern.score = score
        currPattern.reason = reasons;
      } catch {

      }
      //}
    }

    this.resultPatterns = this.sortByScore(this.resultPatterns, 'desc');

  }

  getPatternOpacity(pattern: BusinessPattern) {
    return pattern.score > 0 ? 'block' : 'none';
  }

  switchView(view: 'evalQuestions' | 'results'): void {
    this.evaluatePattern();
    window.scrollTo(0, 0);
  }

  getCategories(): string[] {
    return Object.keys(this.evalQuestions);
  }

  // Get evalQuestions for a specific category
  getQuestions(category: string): Array<{ question: string; dimension: any }> {
    return this.evalQuestions[category];
  }

  // Get options for a dimension
  getOptions(dimension: any): string[] {
    if (dimension && typeof dimension === 'object') {
      return Object.values(dimension);
    }
    return [];
  }

  // Handle user selection
  onSelectAnswer(question: string, answer: string): void {
    this.userAnswers[question] = answer;
    this.updateProgress();
  }

  getBMQuestionState(question: string, answer: string): boolean {
    return this.userAnswers[question] == answer;
  }
}
