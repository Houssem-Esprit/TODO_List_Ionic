import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TODOLIST } from '../Models/todo-list';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  todoList$:TODOLIST[] = [];
  isAddTaskClicked: boolean = false;


  constructor(public alertController: AlertController) {
    this.todoList$.push(new TODOLIST(1,"TODO","IONIC-TODOLIST-APP","Create Ionic TodoList and manage the consumtion of data flow from an API Platform webservices")
);
    this.todoList$.push(new TODOLIST(2,"TODO", "IONIC-TODOLIST-Back-end", "Create an API Platform Server contains several APIs to feed the TODOLIST Ionic app"));
  }


  addTask(){
    this.isAddTaskClicked = true;
    console.log("Button Show State : ",this.isAddTaskClicked);
  }

  cancel(){
    this.isAddTaskClicked = false;

  }

  async presentAlertMultipleButtons(task:TODOLIST) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'DELETE',
      message: `Are you sure you want to delete task: ${task.title} from ${task.type} list ?`,
      buttons: ['Cancel',{
        text: 'Delete',
        role: 'delete',
        cssClass: 'secondary',
        handler: (task) => {

        }
      }]
    });

    await alert.present();
  }

  deleteTask(task:TODOLIST){
    if(task){
      this.presentAlertMultipleButtons(task);
    }
  }
 
}
