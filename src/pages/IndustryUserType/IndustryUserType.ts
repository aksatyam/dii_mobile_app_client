import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
import { AddIndustryUserTypePage } from '../AddIndustryUserType/AddIndustryUserType';
@Component({
  selector: 'page-IndustryUserType',
  templateUrl: 'IndustryUserType.html'
})
export class IndustryUserTypePage {
  public title:any="Industry User Type";
  public industyDeatils:any='Industry User Types'
  public IndustryData:any;
  public IndustryTypeData:any;
  public IndustryID:any;
  public Status:boolean=false;
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
    this.webService.getAllIndutsryType(this.IndustryID).then(data=>{
      this.webService.stopLoading();
      console.log(data);
      if(data['data']){
        this.IndustryTypeData=data['data'];
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

  addInduUserType(){
    this.navCtrl.push(AddIndustryUserTypePage,{'IndustryId':this.IndustryID});
  }
}
