import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TODOLIST } from '../Models/todo-list';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  doingList$:TODOLIST[] = [];

  constructor(public alertController: AlertController) {

    this.doingList$.push(new TODOLIST(1,"DOING","IONIC-TODOLIST-APP","Create Ionic TodoList and manage the consumtion of data flow from an API Platform webservices")
    );
        this.doingList$.push(new TODOLIST(2,"GOING", "IONIC-TODOLIST-Back-end", "Create an API Platform Server contains several APIs to feed the TODOLIST Ionic app"));
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
