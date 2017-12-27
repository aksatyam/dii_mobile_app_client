import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
import { AddIndustryStageEquipPage } from '../AddIndustryStageEquip/AddIndustryStageEquip';
@Component({
  selector: 'page-IndustryStageEquip',
  templateUrl: 'IndustryStageEquip.html'
})
export class IndustryStageEquipPage {
  public title:any="Stage Equipment";
  public IndustryInfo:any;
  public industyDeatils:any='Industry Stage Equipment';
  public IndustryID:any;
  public Status:boolean=false;
  public StageEquipmentData:any;
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

  addInduStageEquip(){
    this.navCtrl.push(AddIndustryStageEquipPage,{'IndustryId':this.IndustryID});
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

  CallWebServices(){
    this.webService.presentLoading();
    this.webService.getIndustryAllSatgeEquip(this.IndustryID).then(data=>{
      this.webService.stopLoading();
      console.log(data);
      if(data['data']){
        this.StageEquipmentData=data['data'];
      }
    })
  }

}
