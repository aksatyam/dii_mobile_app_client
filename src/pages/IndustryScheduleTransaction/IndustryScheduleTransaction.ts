import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
import { AddIndustryScheduleTransactionPage } from '../AddIndustryScheduleTransaction/AddIndustryScheduleTransaction';
import { RequiredMaterialsDescPage } from '../RequiredMaterialsDesc/RequiredMaterialsDesc';

@Component({
    selector: 'page-IndustryScheduleTransaction',
    templateUrl: 'IndustryScheduleTransaction.html'
})
  
export class IndustryScheduleTransactionPage {
    public title:any="Industry Schedule Transaction";
    public IndustryInfo:any;
    public industyDeatils:any='Industry Schedule Transaction';
    public IndustryID:any;
    public Status:boolean=false;
    public SchedTransData:any;
    constructor(  public navCtrl: NavController,
        public webService:ServiceSingletonProvider, 
        public navParms:NavParams) {
          if(this.navParms.get('IndustryInfo')){
            this.IndustryInfo=this.navParms.get('IndustryInfo');
          }
          console.log(this.IndustryInfo);
          this.title=this.IndustryInfo.indu_name;
          this.IndustryID=this.IndustryInfo._id;
          this.CallWebServices();
    }
    
    addInduScheduleTransaction(){
      this.navCtrl.push(AddIndustryScheduleTransactionPage,{'IndustryId':this.IndustryID});
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
      this.webService.getAllScheduleTransaction(this.IndustryID).then(data=>{
        this.webService.stopLoading();
        console.log(data);
        if(data['data']){
          this.SchedTransData=data['data'];
        }
      })
    }

    requiredMaterials(sched){
      this.navCtrl.push(RequiredMaterialsDescPage,{'IndustryInfo':this.IndustryInfo,'ProductInfo':sched});
    }
}