import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';

@Component({
  selector: 'page-AddIndustryEquipment',
  templateUrl: 'AddIndustryEquipment.html'
})
export class AddIndustryEquipmentPage {
  public IndustryId:any;
  public title:any="Add Equipment";
  public EquipName:any='';
  public Description:any='';
  constructor(public navCtrl: NavController,
        public navParms: NavParams,
        public webService: ServiceSingletonProvider) {
          if(this.navParms.get('IndustryId')){
            this.IndustryId=this.navParms.get('IndustryId');
        }
  }

  SaveEquip(){
    if(this.EquipName=='' && this.Description==''){
      this.webService.presentAlert('Alert!','Enter Equipment Name and Description');
    }
    else if(this.EquipName==''){
        this.webService.presentAlert('Alert!','Enter Equipment Name');
    }
    else if(this.Description==''){
        this.webService.presentAlert('Alert!','Enter Equipment Name Description');
    }
    else{
      var myKeyVals={indu_id:this.IndustryId, equip_name:this.EquipName, description:this.Description};
      this.webService.presentLoading();
      this.webService.postIndustryOneEquip(myKeyVals).then(data=>{
        this.webService.stopLoading();
        console.log(data);
        if(data['msg']){
          this.Reset();
          this.webService.presentAlert('Success!','Equipment Added Successfully.');
        }
      })
    }
  }

  Reset(){
    this.EquipName='';
    this.Description='';
  }
}
