import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatStepperModule,
    MatProgressBarModule
  ],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BCLE Dashboard';
  private apiUrl = 'http://localhost:5000/get_config';
  questionsData: Question[] = [];
  quizForm: FormGroup;
  isEvaluating = false;
  currentQuestionIndex = 0;
  loading = true;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  get questionsFormArray() {
    return this.quizForm.get('questions') as FormArray;
  }

  getCurrentQuestionFormGroup(): FormGroup {
    return this.questionsFormArray.at(this.currentQuestionIndex) as FormGroup;
  }

  get currentQuestion(): Question {
    return this.questionsData[this.currentQuestionIndex];
  }

  get isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questionsData.length - 1;
  }

  get isCurrentFormValid(): boolean {
    return this.getCurrentQuestionFormGroup().valid;
  }

  getData(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.questionsData = Object.keys(data)
          .filter(key => key.startsWith('Question_'))
          .map(key => ({
            ...data[key],
            id: key,
            answer: 'yes',
            userInput: '',
            tutoringAnswers: data[key].tutoring.tutoringQuestions.map(() => '')
          } as Question));

        this.initializeForm();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error during API call:', error);
        this.loading = false;
      }
    });
  }

  private initializeForm(): void {
    this.questionsData.forEach((question, index) => {
      const questionGroup = this.fb.group({
        answer: [question.answer, Validators.required],
        userInput: [question.userInput, Validators.required],
        tutoringAnswers: this.fb.array(
          question.tutoringAnswers!.map(answer => 
            this.fb.control({ value: answer, disabled: question.answer === 'yes' }, Validators.required)
          )
        )
      });

      this.setupAnswerChanges(questionGroup, index);
      this.questionsFormArray.push(questionGroup);
    });
  }

  private setupAnswerChanges(questionGroup: FormGroup, index: number): void {
    const answerControl = questionGroup.get('answer');
    const userInputControl = questionGroup.get('userInput');
    const tutoringAnswers = questionGroup.get('tutoringAnswers') as FormArray;

    answerControl?.valueChanges.subscribe((answer: 'yes' | 'no') => {
      this.questionsData[index].answer = answer;
      
      if (answer === 'no') {
        tutoringAnswers.controls.forEach(control => control.enable());
        userInputControl?.disable();
      } else {
        userInputControl?.enable();
        tutoringAnswers.controls.forEach(control => {
          control.disable();
          control.reset();
        });
        this.questionsData[index].tutoringAnswers = tutoringAnswers.controls.map(() => '');
      }
    });
  }

  getTutoringControls(index: number): FormControl[] {
    const tutoringAnswers = this.questionsFormArray.at(index).get('tutoringAnswers') as FormArray;
    return tutoringAnswers.controls as FormControl[];
  }

  handleButtonClick(): void {
    const currentFormGroup = this.questionsFormArray.at(this.currentQuestionIndex);
    this.syncFormToData(currentFormGroup);

    if (this.currentQuestion.answer === 'yes') {
      this.validateQuestion();
    } else {
      this.submitQuestion();
    }
  }

  private syncFormToData(formGroup: AbstractControl): void {
    const { answer, userInput, tutoringAnswers } = formGroup.value;
    const questionData = this.questionsData[this.currentQuestionIndex];
    
    questionData.answer = answer;
    questionData.userInput = userInput;
    questionData.tutoringAnswers = tutoringAnswers;
  }

 // Update the validateQuestion method
private validateQuestion(): void {
  this.isEvaluating = true;
  const payload = {
    question: this.currentQuestion.question,
    instruction: this.currentQuestion.evaluationPrompt,
    userInput: this.currentQuestion.userInput
  };

  this.http.post('http://localhost:5000/evaluate_bm', payload).subscribe({
    next: () => {
      this.isEvaluating = false;
      this.moveToNextQuestion();
    },
    error: (error) => {
      console.error('Validation error:', error);
      this.isEvaluating = false;
    }
  });
}

// Update the submitQuestion method
private submitQuestion(): void {
  this.isEvaluating = true;
  const payload = this.currentQuestion.tutoring.tutoringQuestions.map((tutoringQuestion, index) => ({
    question: this.currentQuestion.question,
    prompt: tutoringQuestion.question,
    userInput: this.currentQuestion.tutoringAnswers![index]
  }));

  this.http.post('http://localhost:5000/evaluate_answers', payload).subscribe({
    next: () => {
      this.isEvaluating = false;
      this.moveToNextQuestion();
    },
    error: (error) => {
      console.error('Submission error:', error);
      this.isEvaluating = false;
    }
  });
}

  moveToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questionsData.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  goToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  goToQuestion(index: number): void {
    if (index >= 0 && index < this.questionsData.length) {
      this.currentQuestionIndex = index;
    }
  }
}

interface Question {
  id: string;
  question: string;
  yes: string;
  no: string;
  tutoring: {
    tutoringQuestions: Array<{ question: string }>;
  };
  evaluationPrompt: string;
  answer?: 'yes' | 'no';
  userInput?: string;
  tutoringAnswers?: string[];
}