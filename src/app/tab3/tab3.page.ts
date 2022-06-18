import {Component} from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})




export class Tab3Page {

  
  contactlist  = [
    {id: 1, name: 'Andrea Mae Layan', email: 'bridgettearchimedes900@gmail.com',number: '09567653539'},
    {id: 1, name: 'Sweet Revenge', email: 'Demon908@gmail.com',number: '09631852032'},
    {id: 1, name: 'EcoreLov', email: 'Lovelicakes@gmail.com',number: '09062026630'},

  ]


  

  constructor(public alertController: AlertController, public toastController: ToastController, public route: Router ) {
  }

  
  async  confirmation(index: number) {
    const alert = await this.alertController.create({
      header: 'Are You Sure You Want To Delete?',
      buttons: [
        {
          text: 'Yes',
          role: 'destructive',
          handler: () => {

              this.contactlist.splice(index, 1);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', 
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ],
    });

    await alert.present();
  }
  async addUser() {
    let prompt = await this.alertController.create({
      header: 'Add Contact',
      message: "",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
        },{
          name: 'email',
          placeholder: '@gmail  <optional>',
        },
        {
          name: 'number',
          placeholder: 'Phone number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: (data) => {
            console.log('Saved clicked');
            var nameLetter = /^[A-Za-z]+$/;

            if((data.name != null) && (data.number.length > 0)){
              if(data.name.length > 15){
              this.showErrorToast('<ion-text color="danger"><b>Name should be greater than 15 letters</b></ion-text>');
              return false;
              }
              else if(data.number.length != 11){
              this.showErrorToast('<ion-text color="danger"><b>Number should be 11 numbers only</b></ion-text>');
              return false;
              }
              else if(!data.name.match(nameLetter)){
              this.showErrorToast('<ion-text color="danger"><b>Name should be aphabet only</b></ion-text>');
              return false;
              }
              else{
                if(data.email.length == 0){
                  data.email = "none"
                }
              this.contactlist.push({
                id: data.id,
                name: data.name,
                email: data.email,
                number: data.number
              });
              this.showErrorToast('<ion-text color="danger"><b>Added</b></ion-text>');
            }
            }
            else{
              this.showErrorToast('<ion-text color="danger"><b>Pls fill in the blanks</b></ion-text>');
              return false;
            }


          }
        }
      ]
    });
    await prompt.present();

  }
  async showErrorToast(data: any) {
    let toast = this.toastController.create({
      message: data,
      duration: 3000,
      position: 'top'
    });



    (await toast).present();
  }

  async redirectTo(){
    this.route.navigate(['mailpage'])
  }
}
