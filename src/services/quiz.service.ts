import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class QuizService {
  private url = "http://localhost:900";

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  getAll() {
    return [
      { id: 'data/javascript.json', name: 'JavaScript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png'},
      { id: 'data/aspnet.json', name: 'Asp.Net', image: 'https://sawakinome.com/img/images/difference-between-java-and-core-java.png' },
      { id: 'data/csharp.json', name: 'C Sharp', image: 'https://www.tresfacile.net/wp-content/uploads/2018/12/C-Programming-online-training-language.jpg' },
      {id:'data/php.json',name:'php',image:'https://mpng.subpng.com/20180904/xhu/kisspng-logo-image-computer-icons-php-portable-network-gra-william-davies-meng-mongodb-5b8e9698822d99.0636011515360713205332.jpg'},
      {id:'data/html.json',name:'html',image:'https://codefactory.wien/wp-content/themes/hestia/cf-images/big-jpg/4-htmlcss.jpg'},
      { id: 'data/jquery.json', name: 'jquery', image: 'https://banner2.cleanpng.com/20180704/zoa/kisspng-jquery-ui-javascript-web-browser-pasargad-5b3d093837a4d4.5712269815307267122279.jpg' }
      // { id: 'data/designPatterns.json', name: 'Design Patterns', image: '' }
    ];
  }

  getAllFromDataBase() {
    return this.http.get(this.url + '/quiz/all');
  }

}
