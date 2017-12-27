import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
import {Storage} from "@ionic/storage";
@Component({
  selector: 'page-AdminProfile',
  templateUrl: 'AdminProfile.html'
})
export class AdminProfilePage {
  public title:any="Profile";
  public ProfileDetails:any=[];
  public name:any;
  public email:any;
  public contact:any;
  public UID:any;
  public createdDate:any;
  constructor(public navCtrl: NavController,  public storage:Storage, public webServies:ServiceSingletonProvider,public navParms: NavParams) {
    this.storage.get('USERINFO').then((val)=>{
     console.log(val);
     this.ProfileDetails.push(val);
    this.getData(this.ProfileDetails);
    });
  }

  getData(ProfileDetails){
    this.name=ProfileDetails[0].user_name;
    this.email=ProfileDetails[0].user_email;
    this.contact=ProfileDetails[0].user_contact;
    this.UID=ProfileDetails[0].user_uuid;
    this.createdDate=ProfileDetails[0].createdAt;
  }
}
