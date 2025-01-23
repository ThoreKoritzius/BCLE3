import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
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
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule, // Add HttpClientModule here
    MatProgressSpinnerModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatStepperModule,
    MatProgressBarModule,
    MatIcon
  ],
  providers: [HttpClient], // Provide HttpClient here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BCLE Dashboard';
  private apiUrl = 'http://localhost:5000/get_config';
  responseData: any[] = [];
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
        this.loading = false;
      },
      error: (error) => {
        console.error('Error during API call:', error);
        this.loading = false;
      }
    });
  }

  initializeQuizForm(): void {
    console.log('Initializing quiz form...');
    const questionsArray = this.responseData.map(question => {
      console.log('Creating form group for question:', question.id);
  
      const group = this.fb.group({
        id: question.id,
        answer: ['yes', Validators.required],
        userInput: ['', Validators.required],
        tutoringAnswers: this.fb.array(
          question.tutoring.tutoringQuestions.map(() =>
            this.fb.control({ value: '', disabled: true }, Validators.required)
          )
        )
      });
  
      console.log('Form group created:', group);
  
      const answerControl = group.get('answer');
      const userInputControl = group.get('userInput');
      const tutoringAnswers = group.get('tutoringAnswers') as FormArray;
  
      answerControl?.valueChanges.subscribe(answer => {
        console.log('Answer changed:', answer);
        if (answer === 'no') {
          tutoringAnswers.controls.forEach(control => control.enable());
          userInputControl?.disable();
        } else {
          userInputControl?.enable();
          tutoringAnswers.controls.forEach(control => control.disable());
          tutoringAnswers.reset();
        }
      });
  
      return group;
    });
  
    console.log('Questions array:', questionsArray);
    this.quizForm.setControl('questions', this.fb.array(questionsArray));
    console.log('Quiz form initialized:', this.quizForm);
  }

  hasAnyYesAnswer(): boolean {
    return this.questions.controls.some(questionGroup => questionGroup.get('answer')?.value === 'yes');
  }

  handleButtonClick(): void {
    const currQuestion = this.responseData[this.currentQuestionIndex]
    const filteredQuestionGroup = this.questions.controls
    .find(questionGroup => questionGroup.get('id')?.value === currQuestion.id);

    console.log(filteredQuestionGroup!)
    if (filteredQuestionGroup!.get('answer')?.value === 'yes') {
      this.validateQuestions();
    } else {
      this.submitQuiz();
    }
  }

  validateQuestions(): void {
    //if (this.quizForm.valid) {
      this.isEvaluating = true;
      const currQuestion = this.responseData[this.currentQuestionIndex]
      const filteredQuestionGroup = this.questions.controls
        .find(questionGroup => questionGroup.get('id')?.value === currQuestion.id);

      const inputData = {
        userInput: filteredQuestionGroup!.get('userInput')?.value,
        questionId: this.responseData[this.questions.controls.indexOf(filteredQuestionGroup!)].id,
        question: currQuestion.yes,
        evaluationPrompt: currQuestion.evaluationPrompt	
      };

      const validationData = {"data": currQuestion, "input": inputData}

      this.http.post('http://localhost:5000/evaluate_bm', validationData).subscribe({
        next: (response) => {
          console.log('Validation response:', response);
          this.isEvaluating = false;
          this.moveToNextQuestion();
        },
        error: (error) => {
          console.error('Error during validation:', error);
          this.isEvaluating = false;
        }
      });
    //}
  }

  submitQuiz(): void {
    //if (this.quizForm.valid) {
      this.isEvaluating = true;
      const evaluationData = { user: this.quizForm.value.questions, data: this.responseData };

      const currQuestion = this.responseData[this.currentQuestionIndex]
      const filteredQuestionGroup = this.questions.controls
        .find(questionGroup => questionGroup.get('id')?.value === currQuestion.id);

      const inputData = {
        userInput: filteredQuestionGroup!.get('userInput')?.value,
        questionId: this.responseData[this.questions.controls.indexOf(filteredQuestionGroup!)].id,
        question: currQuestion.question,
        evaluationPrompt: currQuestion.evaluationPrompt	
      };

      const validationData = {"data": currQuestion, "input": inputData}

      
      this.http.post('http://localhost:5000/evaluate_answers', evaluationData).subscribe({
        next: (response) => {
          console.log('Evaluation response:', response);
          this.isEvaluating = false;
          this.moveToNextQuestion();
        },
        error: (error) => {
          console.error('Error during evaluation:', error);
          this.isEvaluating = false;
        }
      });
    //}
  }

  moveToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  moveToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  goToPreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }
  
  goToNextQuestion() {
    if (this.currentQuestionIndex < this.responseData.length - 1) {
      this.currentQuestionIndex++;
    }
  }
}