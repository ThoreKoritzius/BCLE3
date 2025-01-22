import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dashboard3';
  private apiUrl = 'http://localhost:5000/get_config';
  responseData: any[] = [];
  quizForm: FormGroup;
  isEvaluating = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

  getTutoringControls(questionGroup: AbstractControl): FormControl[] {
    return (questionGroup.get('tutoringAnswers') as FormArray).controls as FormControl[];
  }

  getData(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        this.responseData = Object.keys(data)
          .filter(key => key.startsWith('Question_'))
          .map(key => ({
            ...data[key],
            id: key,
            showTutoring: false
          }));
        
        this.initializeQuizForm();
      },
      error: (error) => {
        console.error('Error during API call:', error);
      }
    });
  }

  initializeQuizForm(): void {
    const questionsArray = this.responseData.map(question => {
      const group = this.fb.group({
        answer: ['yes', Validators.required],
        userInput: [''], // Add userInput for "yes" response
        tutoringAnswers: this.fb.array(
          question.tutoring.tutoringQuestions.map(() => 
            this.fb.control('', Validators.required)
          )
        )
      });

      const answerControl = group.get('answer');
      const userInputControl = group.get('userInput');
      const tutoringAnswers = group.get('tutoringAnswers') as FormArray;

      answerControl?.valueChanges.subscribe(answer => {
        if (answer === 'no') {
          // Enable tutoring questions and disable userInput
          tutoringAnswers.controls.forEach(control => {
            control.setValidators(Validators.required);
          });
          userInputControl?.clearValidators();
        } else {
          // Enable userInput and disable tutoring questions
          userInputControl?.setValidators(Validators.required);
          tutoringAnswers.controls.forEach(control => {
            control.clearValidators();
          });
          tutoringAnswers.reset();
        }
        tutoringAnswers.controls.forEach(control => control.updateValueAndValidity());
        userInputControl?.updateValueAndValidity();
      });

      return group;
    });

    this.quizForm.setControl('questions', this.fb.array(questionsArray));
  }

  // Check if any question has a "yes" answer
  hasAnyYesAnswer(): boolean {
    return this.questions.controls.some(questionGroup => questionGroup.get('answer')?.value === 'yes');
  }

  // Handle button click
  handleButtonClick(): void {
    if (this.hasAnyYesAnswer()) {
      this.validateQuestions();
    } else {
      this.submitQuiz();
    }
  }

  // Validate questions with "yes" answers
  validateQuestions(): void {
    if (this.quizForm.valid) {
      this.isEvaluating = true;
      const validationData = this.questions.controls
        .filter(questionGroup => questionGroup.get('answer')?.value === 'yes')
        .map(questionGroup => ({
          userInput: questionGroup.get('userInput')?.value,
          questionId: this.responseData[this.questions.controls.indexOf(questionGroup)].id
        }));

      this.http.post('http://localhost:5000/evaluate_bm', validationData).subscribe({
        next: (response) => {
          console.log('Validation response:', response);
          this.isEvaluating = false;
        },
        error: (error) => {
          console.error('Error during validation:', error);
          this.isEvaluating = false;
        }
      });
    }
  }

  // Submit all questions with "no" answers
  submitQuiz(): void {
    if (this.quizForm.valid) {
      this.isEvaluating = true;
      const evaluationData = {"user":  this.quizForm.value.questions, "data": this.responseData};

      this.http.post('http://localhost:5000/evaluate_answers', evaluationData).subscribe({
        next: (response) => {
          console.log('Evaluation response:', response);
          this.isEvaluating = false;
        },
        error: (error) => {
          console.error('Error during evaluation:', error);
          this.isEvaluating = false;
        }
      });
    }
  }
}