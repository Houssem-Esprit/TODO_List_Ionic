import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AddTaskModel, TODOLIST } from './Models/todo-list';
import { Observable, of, throwError } from 'rxjs';
import {  catchError, map, tap } from 'rxjs/operators';
// eslint-disable-next-line @typescript-eslint/naming-convention
const headers = new HttpHeaders({'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

   baseUrl = 'http://localhost:8000';
  constructor(private httpClient: HttpClient) { }


  addTask(task: any): Observable<TODOLIST> {
    console.log('[service] AddTask Lunched, task: ', task);
    return this.httpClient.post<TODOLIST>(`${this.baseUrl}/api/tasks`, task, {headers});
  }


  deleteTask(id: number): Observable<void> {
    console.log('[service] Delete Task, id :',id);
    return this.httpClient.delete<void>(`${this.baseUrl}/api/tasks/${id}`)
    ;
  }

  getAllTasks(): Observable<TODOLIST[]> {
    return this.httpClient.get<TODOLIST[]>(`${this.baseUrl}/api/tasks.json`).pipe(
      tap( tasks => console.log('tasks', tasks))
    );
  }

  updateTaskType(type, idTask): Observable<TODOLIST> {
    return this.httpClient.put<TODOLIST>(`${this.baseUrl}/tasks/update-tasks/${idTask}`, type, {headers});
  }

  getTodoTasks(): Observable<TODOLIST[]>{
    return this.getAllTasks().pipe(map(tasks => tasks.filter(task => task.type === 'TODO')));
  }

  getDoingTasks(): Observable<TODOLIST[]>{
    return this.getAllTasks().pipe(map(tasks => tasks.filter(task => task.type === 'DOING')));
  }

  getDoneTasks(): Observable<TODOLIST[]>{
    return this.getAllTasks().pipe(map(tasks => tasks.filter(task => task.type === 'DONE')));
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
