import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number;
  todo: Todo;
  username: string;

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];    
    this.todo = new Todo(this.id, '', false, new Date());
    this.username = this.basicAuthenticationService.getAuthenticatedUser();
    if(this.id > 0){
      this.todoService.retrieveTodo(this.username, this.id).subscribe(
        response => {this.todo = response; console.log(this.todo);}
      );
    }
  }

  saveTodo(){
    if(this.id > 0){
      this.todoService.updateTodo(this.username, this.id, this.todo).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['todos']);
        }
      );
    }else {      
      this.todoService.createTodo(this.username, this.todo).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['todos']);
        }
      );
    }
  }
}
