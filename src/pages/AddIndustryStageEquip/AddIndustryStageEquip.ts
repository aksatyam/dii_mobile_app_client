import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';

@Component({
  selector: 'page-AddIndustryStageEquip',
  templateUrl: 'AddIndustryStageEquip.html'
})
export class AddIndustryStageEquipPage {
  public IndustryId:any;
  public title:any="Add Stage Equipment";
  public StageName:any='';
  public Description:any='';
  public MaterialsList:any;
  public EquipmentList:any;
  public Material:any='';
  public Equipment:any='';
  constructor(public navCtrl: NavController,
        public navParms: NavParams,
        public webService: ServiceSingletonProvider) {
          if(this.navParms.get('IndustryId')){
            this.IndustryId=this.navParms.get('IndustryId');
        }
        this.getAllMaterial();
  }

  SaveStageEquip(){
    if(this.StageName=='' && this.Description=='' && this.Material=='' && this.Equipment==''){
        this.webService.presentAlert('Alert!','Enter and select the blank fields?');
    }
    else if(this.StageName==''){
        this.webService.presentAlert('Alert!','Enter Stage Name');
    }
    else if(this.Material==''){
        this.webService.presentAlert('Alert!','Select Material');
    }
    else if(this.Equipment==''){
        this.webService.presentAlert('Alert!','Select Equipment');
    }
    else if(this.Description==''){
        this.webService.presentAlert('Alert!','Enter Stage Description');
    }
    else {
        this.postData();
    }
  }

  Reset(){
    this.StageName='';
    this.Description='';
    this.Material='';
    this.Equipment='';
  }

  postData(){
    var myKeyVals={ indu_id:this.IndustryId,
                    material_master_id:this.Material,
                    equipment_master_id:this.Equipment, 
                    stage_name:this.StageName,
                    description:this.Description};
    this.webService.presentLoading();
    this.webService.postIndustryOneStageEquip(myKeyVals).then(data=>{
        this.webService.stopLoading();
        console.log(data);
        if(data['msg']){
            this.Reset();
            this.webService.presentAlert('Success!','Stage Equipment Added Successfully');
        }
    })
  }

  getAllMaterial(){
      this.webService.presentLoading();
      this.webService.getIndustryAllMaterial(this.IndustryId).then(data=>{
          console.log(data);
          if(data['data']){
            this.MaterialsList=data['data'];
            this.getAllEquipment();
          }
      })
  }

  getAllEquipment(){
      this.webService.getIndustryAllEquip(this.IndustryId).then(data=>{
          this.webService.stopLoading();
          console.log(data);
          if(data['data']){
            this.EquipmentList=data['data'];
          }
      })
  }
}