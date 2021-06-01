/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AddTaskModel, TODOLIST } from '../Models/todo-list';
import { GenericValidator } from '../shared-module/generic-validator';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  todoList$: Observable<TODOLIST[]>;
  isAddTaskClicked: boolean = false;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  // eslint-disable-next-line @typescript-eslint/member-ordering
  addtask: FormGroup;
  private genericValidator: GenericValidator;

  constructor(public alertController: AlertController, private todoListService: TodoListService, private formBuilder: FormBuilder) {

    this.todoList$ = this.todoListService.getTodoTasks();

    this.validationMessages = {
      title: {
        required: 'Title is required.',
        minlength: 'Title should contain at least 3 caracters.',
        maxlength: `Title shouldn't contain more than 50 caracters.`
      },
      content: {
        required: 'Content is required.',
        minlength: 'Content should contain between 10 caracters at least and 2000 for max.',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }


  ngOnInit(): void {

    this.addtask = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],

    });

    this.addtask.valueChanges.subscribe(
      () => this.displayMessage = this.genericValidator.processMessages(this.addtask)
    );
  }

  onSubmit(): void {
    if (this.addtask.valid && this.addtask.dirty) {
      console.log('onSubmit lanched');
      console.log('title :',this.addtask.get('title'));
      //const task =new AddTaskModel(this.addtask.get('title').value,this.addtask.get('content').value,'TODO');
      const task = {
        title: this.addtask.get('title').value,
        content: this.addtask.get('content').value,
        type: 'TODO'
      };
      this.todoListService.addTask(task);
    }
  }

  addTask(){
    this.isAddTaskClicked = true;
    console.log('Button Show State : ',this.isAddTaskClicked);
  }

  cancel(){
    this.isAddTaskClicked = false;

  }

  async presentAlertMultipleButtons(task: TODOLIST) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'DELETE',
      message: `Are you sure you want to delete task: ${task.title} from ${task.type} list ?`,
      buttons: ['Cancel',{
        text: 'Delete',
        role: 'delete',
        cssClass: 'secondary',
        handler: () => {
          this.todoListService.deleteTask(task.id);
        }
      }]
    });

    await alert.present();
  }

  deleteTask(task: TODOLIST){
    if(task){
      this.presentAlertMultipleButtons(task);
    }
  }
}
