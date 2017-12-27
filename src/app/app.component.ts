import { Component,ViewChild } from '@angular/core';
import { Platform,Events,AlertController,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IndustryInfoPage } from '../pages/industryInfo/industryInfo';
import { ServiceSingletonProvider } from '../providers/service-singleton/service-singleton';
import { SignInPage } from '../pages/SignIn/SignIn';
import { AdminProfilePage } from '../pages/AdminProfile/AdminProfile';
import { AddIndustryUserPage } from '../pages/AddIndustryUser/AddIndustryUser'

@Component({
  selector:'app-container',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public pages: Array<{title: string,component: any,index:number}>;
  rootPage:any;
  private router=[];
  
  constructor(platform: Platform,
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              public webService:ServiceSingletonProvider,
              public events:Events,
              public alertCtrl:AlertController) {
    this.initializeApp(platform,statusBar,splashScreen);
    
  }

  initializeApp(platform,statusBar,splashScreen){
      platform.ready().then(() => {
        this.webService.checkLogin().then(login=>{
          console.log(login);
          if(login){
            this.rootPage=IndustryInfoPage;
          }else{
            this.rootPage=SignInPage;
          }
        })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  openUserProfile(page){
      this.nav.push(AdminProfilePage);
  }

  logOut(){
    let alert = this.alertCtrl.create({
      title: 'Attention',
      subTitle: 'Are you sure you want to Log Out  ?',
      buttons: [{
        text: 'NO',
        handler: data=> {
          console.log('Cancel Clicked');
        }
      },
        {
          text: 'YES',
          handler: data=> {
            this.webService.presentLoading();
            this.webService.postLogout().then(()=>{

              setTimeout(()=>{
                this.webService.stopLoading();
                location.reload();
              },1000);
            });
          }
        }],
      cssClass: 'alertcss'
    });
    alert.present();
  }
  
}

