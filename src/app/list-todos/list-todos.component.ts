import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  // todos = [
  //   new Todo(1, 'Learn to Dance', false, new Date()),
  //   new Todo(2, 'Become at expert in Angular', false, new Date()),
  //   new Todo(3, 'Visit Europe', false, new Date())
  // ]

  todos = []
  message = "";

  // todo= {
  //   id: 1,
  //   description: 'Learn to Dance'
  // }

  constructor(
    private service: TodoDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos(){
    this.service.retrieveAllTodos('in28minutes').subscribe(
      response => {
        console.log(response);
        this.todos = response
      }
    );
  }

  addTodo(){
    this.router.navigate(['todos', -1]);
  }

  updateTodo(id){
    console.log(`Updating todo ${id}`);
    this.router.navigate(['todos', id]);
  }

  deleteTodo(id){
    this.service.deleteTodo('in28minutes', id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo "${id}" Sucessfull!`;
        this.refreshTodos();
      }
    );
  }
}

export class Todo {
  constructor(public id: number, public description: string, public done: boolean, public targetDate: Date){

  }
}
