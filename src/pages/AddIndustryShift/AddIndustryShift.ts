import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';

@Component({
  selector: 'page-AddIndustryShift',
  templateUrl: 'AddIndustryShift.html'
})

export class AddIndustryShiftPage {
  public IndustryId:any;
  public title:any="Add Shift";
  public ShiftName:any='';
  public Description:any='';
  public ShiftTime:any='';
  public timeStarts:any;
  public timeEnds:any;
  constructor(public navCtrl: NavController,
        public navParms: NavParams,
        public webService: ServiceSingletonProvider) {
          if(this.navParms.get('IndustryId')){
            this.IndustryId=this.navParms.get('IndustryId');
        }
  }

  timeChange(){
    console.log(this.timeStarts);
    console.log(this.timeEnds);
    if(this.timeStarts==this.timeEnds){
      this.webService.presentAlert('Alert!','Both the times should not be same');
    }
    else if(this.timeStarts>this.timeEnds){
      this.webService.presentAlert('Alert!','Start Time should not be greater than End Time');
    }
  }


  SaveShift(){
    if(this.ShiftName=='' && this.ShiftTime=='' && this.timeStarts=='' && this.timeEnds=='' && this.Description){
      this.webService.presentAlert('Success!','Fill the blank fields');
    }
    else if(this.ShiftName==''){
      this.webService.presentAlert('Alert!','Enter shift name');
    }
    else if(this.ShiftTime==''){
      this.webService.presentAlert('Alert!','Enter shift time');
    }
    else if(this.timeStarts==''){
      this.webService.presentAlert('Alert!','Select start time');
    }
    else if(this.timeEnds==''){
      this.webService.presentAlert('Alert!','Select end time');
    }
    else if(this.timeStarts==this.timeEnds){
      this.webService.presentAlert('Alert!','Both the times should not be same');
    }
    else if(this.timeStarts>this.timeEnds){
      this.webService.presentAlert('Alert!','Start Time should not be greater than End Time');
    }
    else if(this.Description==''){
      this.webService.presentAlert('Alert!','Enter shift description');
    }
    else{
      this.postData();
    }
  }

  Reset(){
      this.ShiftName='';
      this.ShiftTime='';
      this.Description='';
  }

  postData(){
    var myKeyVals={ indu_id:this.IndustryId, 
                    shift_name:this.ShiftName, 
                    shift_time:this.ShiftTime, 
                    start_time:this.timeStarts, 
                    end_time:this.timeEnds,
                    shift_desc:this.Description};

    this.webService.presentLoading();
    this.webService.postIndustryOneShift(myKeyVals).then(data=>{
      this.webService.stopLoading();
      console.log(data);
      if(data['msg']){
        this.Reset();
        this.webService.presentAlert('Success', 'Shift Saved Successfully');
      }
    })
  }
}