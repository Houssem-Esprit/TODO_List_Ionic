import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TODOLIST } from '../Models/todo-list';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  doneList$:TODOLIST[] = [];

  constructor(public alertController: AlertController) {

    this.doneList$.push(new TODOLIST(1,"DONE","IONIC-TODOLIST-APP","Create Ionic TodoList and manage the consumtion of data flow from an API Platform webservices")
    );
        this.doneList$.push(new TODOLIST(2,"DONE", "IONIC-TODOLIST-Back-end", "Create an API Platform Server contains several APIs to feed the TODOLIST Ionic app"));
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
