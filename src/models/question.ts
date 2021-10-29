import { Option } from './option';

export class Question {
    id: number;
    name: string;
    questionTypeId: number;
    options: Option[];
    answered: boolean | undefined;
    type: string;

    constructor(data: any) {
        console.log('daeeeee::::', data);
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.questionTypeId = data.questionTypeId;
        this.options = [];
        data.options.forEach((o: any) => {
            this.options.push(new Option(o));
        });
        this.type = data.type || 'single'
    }
}
