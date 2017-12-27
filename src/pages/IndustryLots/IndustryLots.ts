import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
import { AddIndustryLotPage } from '../AddIndustryLot/AddIndustryLot';

@Component({
  selector: 'page-IndustryLots',
  templateUrl: 'IndustryLots.html'
})     
export class IndustryLotsPage {
  public title:any="Industry Lot";
  public IndustryInfo:any;
  public industyDeatils:any='Industry Lots';
  public IndustryID:any;
  public Status:boolean=false;
  public LotsData:any;
    
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

  addInduLot(){
    this.navCtrl.push(AddIndustryLotPage,{'IndustryId':this.IndustryID})
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
    this.webService.getIndustryAllLots(this.IndustryID).then(data=>{
      this.webService.stopLoading();
      console.log(data);
      if(data['data']){
        this.LotsData=data['data'];
      }
    })
  }
}
