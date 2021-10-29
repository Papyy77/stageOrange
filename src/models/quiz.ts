import { QuizConfig } from './quiz-config';
import { Question } from './question';

export class Quiz {
    id: number = 0;
    name: string = "";
    description: string = "";
    config: QuizConfig | undefined;
    questions: Question[] = [];
    image?: string;
    duration?: number;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.config = new QuizConfig(data.config);
            this.questions = [];
            data.questions.forEach((q: any) => {
                this.questions.push(new Question(q));
            });
            if(data.image) {
                this.image = data.image;
            }
            if(data.duration) {
                this.duration = data.duration;
            }
        }
    }
}
