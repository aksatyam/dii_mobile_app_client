import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';

@Component({
  selector: 'page-AddIndustryMaterial',
  templateUrl: 'AddIndustryMaterial.html'
})
export class AddIndustryMaterialPage {
  public IndustryId:any;
  public title:any="Add Materials";
  public MaterialName:any='';
  public Description:any='';
  public inspectionPara='';
  public qualityCheckPara='';
  constructor(public navCtrl: NavController,
        public navParms: NavParams,
        public webService: ServiceSingletonProvider) {
          if(this.navParms.get('IndustryId')){
            this.IndustryId=this.navParms.get('IndustryId');
        }
  }

  SaveMaterial(){
    if(this.MaterialName=='' && this.Description=='' && this.inspectionPara=='' && this.qualityCheckPara=='' ){
      this.webService.presentAlert('Alert!','Fill all the blank fields.');
    }
    else if(this.MaterialName==''){
      this.webService.presentAlert('Alert!','Enter the material name');
    }
    else if(this.Description==''){
      this.webService.presentAlert('Alert!','Enter the material description');
    }
    else if(this.inspectionPara==''){
      this.webService.presentAlert('Alert!','Enter the material inspection paremater');
    }
    else if(this.qualityCheckPara==''){
      this.webService.presentAlert('Alert!','Enter the material qualitycheck paremeter');
    }
    else{
      this.postData();
    }
  }

  Reset(){
    this.MaterialName='';
    this.Description='';
    this.inspectionPara='';
    this.qualityCheckPara='';
  }

  postData(){
    var myKeyVals={indu_id:this.IndustryId, name:this.MaterialName, description:this.Description, inspection_parem:this.inspectionPara, qulaitycheck_parem:this.qualityCheckPara};
    this.webService.presentLoading();
    this.webService.postIndustryOneMaterial(myKeyVals).then(data=>{
      this.webService.stopLoading();
      console.log(data);
      if(data['msg']){
        this.Reset();
        this.webService.presentAlert('Success!','Material Added Successfully.');
      }
    })
  }
}