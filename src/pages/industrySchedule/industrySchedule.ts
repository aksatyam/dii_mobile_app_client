import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
import { AddIndustrySchedulePage } from '../AddIndustrySchedule/AddIndustrySchedule';

@Component({
    selector: 'page-industrySchedule',
    templateUrl: 'industrySchedule.html'
})
  
export class IndustrySchedulePage {
    public title:any="Industry Product";
    public IndustryInfo:any;
    public industyDeatils:any='Industry Schedules';
    public IndustryID:any;
    public Status:boolean=false;
    public ScheduleData:any;
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


    addInduSchedules(){
        this.navCtrl.push(AddIndustrySchedulePage,{'IndustryId':this.IndustryID});
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
        this.webService.getAllSchedule(this.IndustryID).then(data=>{
          this.webService.stopLoading();
          console.log(data);
          if(data['data']){
            this.ScheduleData=data['data'];
          }
        })
      }
      
}