import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { BmSelectionComponent } from './bm-selection/bm-selection.component';
import { ResultsComponent } from './results/results.component';
import { StateService } from './state.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDivider } from '@angular/material/divider';
import { ImprintComponent } from './imprint/imprint.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BmSelectionComponent,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatStepperModule,
    MatProgressBarModule,
    MatList,
    MatListItem,
    MatIcon,
    ResultsComponent,
    MatSidenavModule,
    MatNavList,
    MatDivider,
    ImprintComponent
  ],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BCLE Dashboard';
  private apiUrl = 'http://localhost:5007/get_config';
  questionsData: Question[] = [];
  quizForm: FormGroup;
  isEvaluating = false;
  currentQuestionIndex = -1;
  loading = true;
  showBMSelection = false;
  progress: number = 0;
  private formChangesSubscription!: Subscription;
  isEvaluationFresh = false;

  @ViewChild('evaluationDiv') evaluationDiv!: ElementRef;


  constructor(private stateService: StateService, private http: HttpClient, private fb: FormBuilder) {
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

  getCircleColor() {
    return this.stateService.getCircleColor()
  }

  getData(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        console.log(data);
        this.questionsData = Object.keys(data)
          .filter(key => key.startsWith('Question_'))
          .map(key => ({
            id: key,
            question: data[key].question,
            topic: data[key].topic,
            yes: data[key].yes,
            no: {
              tutoring: {
                questions: data[key].no.tutoring.questions.map((question: any) => ({
                  question: question.question,
                  evaluationPrompt: question.evaluationPrompt,
                  feedback: '',
                  feedbackHTML: '',
                  successful: false
                }))
              }
            },
            answer: 'yes',
            userInput: '',
            evaluation: '',
            evaluationHTML: '',
            successful: false,
            tutoringAnswers: data[key].no.tutoring.questions.map(() => '')
          } as Question)).sort((a, b) => {
            const numA = parseInt(a.id.replace('Question_', ''), 10);
            const numB = parseInt(b.id.replace('Question_', ''), 10);
            return numA - numB;
          });

        this.initializeForm();

        if (this.formChangesSubscription) {
          this.formChangesSubscription.unsubscribe();
        }
        this.formChangesSubscription = this.quizForm.valueChanges.subscribe(formValue => {
          //this.extractBMPattern();
          this.isEvaluationFresh = false;
        });

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
        userInputControl?.disable(); // Keep userInput value
      } else {
        userInputControl?.enable();
        tutoringAnswers.controls.forEach(control => control.disable()); // No reset
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

  getProgress() {
    // Sum the boolean values (true as 1, false as 0) and divide by the total number of questions
    const successfulCount = this.questionsData.reduce((sum, question) => sum + (question.successful ? 1 : 0), 0);
    this.progress = (successfulCount / this.questionsData.length) * 100;
  }

  extractBMPattern(): void {
    if (this.isEvaluationFresh) {
      return
    }

    console.log(this.questionsData)
    const userInputs = this.questionsData
      //.filter(a => a.userInput!= null && a.userInput?.length > 0)
      .map((a: Question) => ({
        id: a.id,
        question: a.question,
        userInput: a.userInput
      }));
    if (userInputs.length == 0){
      return
    }
    console.log("extractBMPattern")
    console.log(userInputs);
    this.http.post('http://localhost:5007/extract_bm', { "userInputs": userInputs }).subscribe({
      next: (response: any) => {
        console.log(response)
        this.isEvaluating = true;
        //TODO
      },
      error: (error) => {
        console.error('Validation error:', error);
        this.isEvaluating = false;

      }
    });

  }


  private validateQuestion(): void {
    this.isEvaluating = true;
    const currentQuestion = {
      currentQuestionIndex: this.currentQuestionIndex,
      userInput: this.currentQuestion.userInput
    };
    const userInputs = this.questionsData
      .filter((_, index) => index < this.currentQuestionIndex)
      .map((a: Question) => ({
        id: a.id,
        question: a.question,
        userInput: a.userInput
      }));

    const payload = {
      "previousInputs": userInputs,
      "currentQuestionIndex": this.currentQuestionIndex,
      "userInput": this.currentQuestion.userInput
    }
    this.http.post('http://localhost:5007/evaluate_bm', payload).subscribe({
      next: (response: any) => {
        console.log(response)
        this.isEvaluating = false;

        const evaluation = response.response;
        const evaluationHTML = response.html;
        const satisfactoryOutcome = response.satisfactory_outcome;

        this.questionsData[this.currentQuestionIndex].evaluation = evaluation;
        this.questionsData[this.currentQuestionIndex].evaluationHTML = evaluationHTML;
        this.questionsData[this.currentQuestionIndex].successful = satisfactoryOutcome;
        this.currentQuestion.evaluation = evaluation;
        this.currentQuestion.evaluationHTML = evaluationHTML;

        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth' // Smooth scrolling animation
        });

        this.getProgress()
        //TODO
        if (this.evaluationDiv) {
          this.evaluationDiv.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        if (this.currentQuestionIndex === 7){
          this.stateService.uvp = evaluationHTML;
          this.stateService.uvpSuccessful = satisfactoryOutcome;
        }if (this.currentQuestionIndex ===4){
          this.stateService.solutions = evaluationHTML;
          this.stateService.solutionsSuccessful = satisfactoryOutcome;
        }
        //TODO: for others

        //this.moveToNextQuestion();
      },
      error: (error) => {
        console.error('Validation error:', error);
        this.isEvaluating = false;
        alert("Error in Response");
      }
    });
  }

  private submitQuestion(): void {
    this.isEvaluating = true;
    const userInput = this.currentQuestion.no.tutoring.questions.map((tutoringQuestion, index) => ({
      question: this.currentQuestion.question,
      userInput: this.currentQuestion.tutoringAnswers![index]
    }));


    const payload = { "userInput": userInput, "currentQuestionIndex": this.currentQuestionIndex }
    this.http.post('http://localhost:5007/evaluate_answers', payload).subscribe({
      next: (response: any) => {
        this.isEvaluating = false;
        var index = 0;
        for (var item of response.feedback) {
          console.log(item)
          this.currentQuestion.no.tutoring.questions[index].feedback = item.response
          this.currentQuestion.no.tutoring.questions[index].feedbackHTML = item.html
          this.currentQuestion.no.tutoring.questions[index].successful = item.satisfactory_outcome

          this.questionsData[this.currentQuestionIndex].no.tutoring.questions[index].feedback = item.response
          this.questionsData[this.currentQuestionIndex].no.tutoring.questions[index].feedbackHTML = item.html
          this.questionsData[this.currentQuestionIndex].no.tutoring.questions[index].successful = item.satisfactory_outcome
          index += 1;
        }
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

  moveToQuestion(id: number): void {
    this.currentQuestionIndex = id;
  }

  goToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }
  goToQuestionExtract(index: number): void {
    this.currentQuestionIndex = index;
    this.extractBMPattern();

  }
}

interface Question {
  id: string;
  question: string;
  topic: string;
  evaluation: string;
  evaluationHTML: string;
  successful: boolean;
  yes: {
    followupQuestion: string;
    evaluationPrompt: string;
    good: { response: string };
    bad: {
      response: string;
      tutoring: {
        categories: {
          [key: string]: Array<{
            question: string;
            evaluationPrompt: string;
          }>;
        };
        dynamicLoop: string;
        loopEnd: string;
      };
    };
  };
  no: {
    tutoring: {
      questions: Array<{
        question: string;
        evaluationPrompt: string;
        feedback: string;
        feedbackHTML: string;
        successful: boolean;
      }>;
    };
  };
  answer?: 'yes' | 'no';
  userInput?: string;
  tutoringAnswers?: string[];
}