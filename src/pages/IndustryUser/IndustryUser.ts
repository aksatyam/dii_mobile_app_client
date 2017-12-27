import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
import { AddIndustryUserPage } from '../AddIndustryUser/AddIndustryUser';
@Component({
  selector: 'page-IndustryUser',
  templateUrl: 'IndustryUser.html'
})
export class IndustryUserPage {
  public title:any="Industry User";
  public Status:boolean=false;
  public industyDeatils:any='Industry Users';
  public IndustryData:any;
  public IndustryID:any;
  public IndustryUserData:any;
  constructor(public navCtrl: NavController,
              public navParms: NavParams,
              public webService: ServiceSingletonProvider) {
    if(this.navParms.get('IndustryInfo')){
        this.IndustryData=this.navParms.get('IndustryInfo');
      }
      console.log(this.IndustryData);
      this.title=this.IndustryData.indu_name;
      this.IndustryID=this.IndustryData._id;                  
      this.CallWebServices();
  }

  CallWebServices(){
    this.webService.presentLoading();
    this.webService.getAllIndustryUser(this.IndustryID).then(data=>{
      this.webService.stopLoading();
      console.log(data);
      if(data['data']){
        this.IndustryUserData=data['data'];
      }
    })

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.CallWebServices();
      refresher.complete();
    }, 2000);
  }

  ionViewDidEnter(){
    if(this.Status){
      this.CallWebServices();
    }
    this.Status=true;
  }

  addInduUser(){
    this.navCtrl.push(AddIndustryUserPage,{'IndustryId':this.IndustryID});
  }

}
