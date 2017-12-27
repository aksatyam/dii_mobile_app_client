import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
import { AddIndustryShiftPage } from '../AddIndustryShift/AddIndustryShift';
@Component({
  selector: 'page-IndustryShift',
  templateUrl: 'IndustryShift.html'
})
export class IndustryShiftPage {
  public title:any="Industry Shift";
  public IndustryInfo:any;
  public industyDeatils:any='Industry Shifts';
  public IndustryID:any;
  public Status:boolean=false;
  public ShiftData:any;
  
  constructor(public navCtrl: NavController,
    public navParms: NavParams,
    public webService: ServiceSingletonProvider) {
      if(this.navParms.get('IndustryInfo')){
        this.IndustryInfo=this.navParms.get('IndustryInfo');
      }
      console.log(this.IndustryInfo);
      this.title=this.IndustryInfo.indu_name;
      this.IndustryID=this.IndustryInfo._id;
      this.CallWebServices();
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
  
  addInduShift(){
    this.navCtrl.push(AddIndustryShiftPage,{'IndustryId':this.IndustryID})
  }

  CallWebServices(){
    this.webService.presentLoading();
    this.webService.getIndustryAllShift(this.IndustryID).then(data=>{
      this.webService.stopLoading();
      console.log(data);
      if(data['data']){
        this.ShiftData=data['data'];
      }
    })
  }

}
