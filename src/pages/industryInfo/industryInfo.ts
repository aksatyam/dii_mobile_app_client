import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
import { IndustryDetailsPage } from '../IndustryDetails/IndustryDetails';
import { IndustryUserTypePage } from '../IndustryUserType/IndustryUserType';
import { IndustryUserPage } from '../IndustryUser/IndustryUser';
import { IndustryEquipmentPage } from '../IndustryEquipment/IndustryEquipment';
import { IndustryMaterialPage } from '../IndustryMaterial/IndustryMaterial';
import { IndustryStageEquipPage } from '../IndustryStageEquip/IndustryStageEquip';
import { IndustryShiftPage } from '../IndustryShift/IndustryShift';
import { IndustryLotsPage } from '../IndustryLots/IndustryLots';
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-industryInfo',
  templateUrl: 'industryInfo.html'
})
export class IndustryInfoPage {
  public title="Dashboard";
  public IndustryInfo:any;
  public UserTypeCount:any;
  public UserCount:any;
  public EquipCount:any;
  public MaterialCount:any;
  public StageEquipCount:any;
  public ShiftCount:any;
  public LotsCount:any;  
  public Status:boolean=false;
  public IndustryDetails:any;
  public IndustryId:any;
  constructor(  public navCtrl: NavController, 
                public webService:ServiceSingletonProvider, 
                public navParms:NavParams,
                public storage:Storage) {
    if(this.navParms.get('UserDetails')){
        this.IndustryInfo=this.navParms.get('UserDetails');
        console.log(this.IndustryInfo);
        this.IndustryId=this.IndustryInfo['indu_id'];
        console.log(this.IndustryId);
        this.webService.setIndustryId(this.IndustryId);
      }
      this.storage.get("IndustryId").then((val)=>{
        console.log(val);
        this.IndustryId=val;
        console.log(this.IndustryId);
        this.getIndustryInfo(this.IndustryId);
      });
  }

  getIndustryInfo(InduId){
    this.webService.presentLoading();
    this.webService.getOneIndustryInfo(InduId).then(data=>{
      //this.webService.stopLoading();
      console.log(data);
      if(data['data']){
        this.IndustryDetails=data['data'];
        this.IndustryId=InduId;
        this.getCount();
      }
    })
  }

  ionViewDidEnter(){
    if(this.Status){
      this.getCount();
    }
    this.Status=true;
  }

  IndustryProfile(){
    //this.webService.presentAlert('Warning!','this card show about industry profile Info');
    this.navCtrl.push(IndustryDetailsPage,{'IndustryInfo':this.IndustryDetails});
  }

  IndustryUserTypeInfo(){
    //this.webService.presentAlert('Warning!','this card show about industry User Type Info');
    this.navCtrl.push(IndustryUserTypePage,{'IndustryInfo':this.IndustryDetails});
  }

  IndustryUserInfo(){
    //this.webService.presentAlert('Warning!','this card show about industry User Info');
    this.navCtrl.push(IndustryUserPage,{'IndustryInfo':this.IndustryDetails});
  }

  IndustryEquipInfo(){
    //this.webService.presentAlert('Warning!','this card show about industry Equipment Info');
    this.navCtrl.push(IndustryEquipmentPage,{'IndustryInfo':this.IndustryDetails});
  }

  IndustryMaterialInfo(){
    //this.webService.presentAlert('Warning!','this card show about industry Material Info');
    this.navCtrl.push(IndustryMaterialPage,{'IndustryInfo':this.IndustryDetails});
  }

  IndustryStageEquipInfo(){
    //this.webService.presentAlert('Warning!','this card show about industry Stage Equipment Info');
    this.navCtrl.push(IndustryStageEquipPage,{'IndustryInfo':this.IndustryDetails});
  }

  IndustryShiftInfo(){
    //this.webService.presentAlert('Warning!','this card show about industry Shift Info');
    this.navCtrl.push(IndustryShiftPage,{'IndustryInfo':this.IndustryDetails});
  }

  IndustryLotsInfo(){
    //this.webService.presentAlert('Warning!','this card show about industry Lots Info');
    this.navCtrl.push(IndustryLotsPage,{'IndustryInfo':this.IndustryDetails});
  }

  getCount(){
    //this.webService.presentLoading();
    this.webService.getAllIndutsryType(this.IndustryId).then(data=>{
      this.UserTypeCount=data['data'].length;
      console.log(this.UserTypeCount);
    });

    this.webService.getAllIndustryUser(this.IndustryId).then(data=>{
      this.UserCount=data['data'].length;
      console.log(this.UserCount);
    });

    this.webService.getIndustryAllEquip(this.IndustryId).then(data=>{
      this.EquipCount=data['data'].length;
      console.log(this.EquipCount);
    });

    this.webService.getIndustryAllMaterial(this.IndustryId).then(data=>{
      this.MaterialCount=data['data'].length;
      console.log(this.MaterialCount);
    });

    this.webService.getIndustryAllSatgeEquip(this.IndustryId).then(data=>{
      this.StageEquipCount=data['data'].length;
      console.log(this.StageEquipCount);
    });

    this.webService.getIndustryAllShift(this.IndustryId).then(data=>{
      this.ShiftCount=data['data'].length;
      console.log(this.ShiftCount);
    });

    this.webService.getIndustryAllLots(this.IndustryId).then(data=>{
      this.LotsCount=data['data'].length;
      console.log(this.LotsCount);
      this.webService.stopLoading();
    });
  }
}
