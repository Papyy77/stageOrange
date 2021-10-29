import { Component, OnInit } from '@angular/core';
import { Option, Question, Quiz, QuizConfig } from 'src/models';
import { QuizService } from 'src/services/quiz.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quizes: any[] | undefined;
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  user: any;
  quizName: string = "";
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date | undefined;
  endTime: Date | undefined;
  ellapsedTime = '00:00';
  duration = '';
  quizSelected = false;
  sum = 0;
  passed = false;

  constructor(private quizService: QuizService, private userService: UserService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
    this.quizSelected = false;
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    // this.loadQuiz(this.quizName);
  }

  loadQuiz(quizName: string) {
    this.quizSelected = true;
    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      console.log('quiz::::::', this.quiz);
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.quiz.duration || this.config.duration);
    });
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime!.getTime()) / 1000;
    if (diff >= (this.quiz.duration || this.config.duration)) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option, event: any) {
    console.log('question:::', question, option, event);
    if (question.questionTypeId === 1) {
      switch(question.type) {
        case 'single':
          question.options.forEach((x) => {
            if (x.id !== option.id) {
              x.selected = false;
            } else {
              x.selected = true;
            }
          });
          break;
        case 'multiple':
          question.options.forEach((x) => {
            if(x.id === option.id) {
              x.selected = !x.selected;
            }
            // if (x.id !== option.id) {
            //   x.selected = false;
            // } else {
            //   x.selected = true;
            // }
          });
          break;
        default:
          question.options.forEach((x) => {
            if (x.id !== option.id) {
              x.selected = false;
            } else {
              x.selected = true;
            }
          });
      }
    }

    console.log('question after:::', question, option);

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Repondue' : 'Non Repondue';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correcte' : 'incorrecte';
  };

  async onSubmit() {
    clearInterval(this.timer);
    let answers: any = [];
    this.sum = 0;
    this.quiz.questions.forEach(elt => {
      if(this.isCorrect(elt) === 'correcte') {
        this.sum += 1;
      }
    });
    
    this.sum = (this.sum / this.quiz.questions.length) * 100;
    // this.sum = 0.76 * 100;
    if(this.sum > 75) {
      this.passed = true;
    }
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions, answers);
    this.mode = 'result';
    try {
      console.log('data:::::', localStorage.getItem('user'), this.user.id, this.quiz.id);
      const res = await this.userService.addNote({qcm: this.quiz.name, email: this.user.email, note: this.sum}).toPromise();
      console.log('res::::::', res);
    } catch(error) {
      console.log('errrr:::::::', error);
    }
  }

  clear() {
    this.quizSelected = false;
    this.passed = false;
  }

  init() {
    this.quiz = new Quiz(null);
    this.quizSelected = false;
    this.passed = false;
    this.pager = {
      index: 0,
      size: 1,
      count: 1
    };
    this.startTime = new Date();
    this.ellapsedTime = '00:00';
    clearInterval(this.timer);
      
  }

  reponse(question: Question) {
    console.log("ccccccc:::::", question.options.filter(elt => elt.isAnswer === true).map(elt => elt.name).join('-'));
    return (question.options.filter(elt => elt.isAnswer === true) || []);
  }

  getEvent(ev: any){
    if(ev && ev === 'init') {
      this.init();
    }
  }
}
