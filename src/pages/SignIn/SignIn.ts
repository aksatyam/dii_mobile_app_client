import { Component } from '@angular/core';
import { NavController,AlertController,MenuController } from 'ionic-angular';

import { IndustryInfoPage } from '../industryInfo/industryInfo';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton'
@Component({
  selector: 'page-SignIn',
  templateUrl: 'SignIn.html'
})
export class SignInPage {

  public alert: any;
  public userId:any;
  public password:any;
  public UserData:any;
  constructor(public navCtrl: NavController,public alertCtrl:AlertController,public menuCtrl:MenuController,public webService:ServiceSingletonProvider) {
    this.menuCtrl.enable(false);
  }


  submit(){
    if((this.userId==undefined||this.userId=='')&&(this.password==undefined||this.password=='')){
      this.presentAlert('Kindly enter Username and Password.');
    }
    else if(this.userId==undefined||this.userId==''){
      this.presentAlert('Kindly enter Username.');
    }
    else if(this.password==undefined||this.password==''){
      this.presentAlert('Kindly enter Password.');
    }
    else{
      var myKeyVals={userEmail:this.userId, userPassword:this.password}
      console.log('API Calling....');
      this.webService.presentLoading();
      this.webService.postIndustryLogin(myKeyVals).then(data=>{
        this.webService.stopLoading();
        console.log(data);
        this.UserData=data;
        if(this.UserData['data']){
          this.webService.setTokenId(this.UserData['data']._id);
          this.webService.setDeviceId(this.UserData['data'].user_deviceId);
          this.webService.setUserId(this.UserData['data'].user_email);
          this.webService.setUSER(this.UserData['data']);
          this.userId='';
          this.password='';
          this.navCtrl.setRoot(IndustryInfoPage,{"UserDetails": this.UserData['data']});
        }
      });
    }
    
  }

  forgetPassword(){
    console.log('Forget Password Login Page..');
  }

  presentAlert(message) {
    this.alert = this.alertCtrl.create({
      title: 'Attention!!',
      subTitle: message,
      buttons: [{
        text: 'OK',
      }],
      cssClass: 'alertcss'
    });
    this.alert.present();
  }
}
