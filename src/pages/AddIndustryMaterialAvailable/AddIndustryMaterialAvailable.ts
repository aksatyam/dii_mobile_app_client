import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';

@Component({
  selector: 'page-AddIndustryMaterialAvailable',
  templateUrl: 'AddIndustryMaterialAvailable.html'
})
export class AddIndustryMaterialAvailablePage {
  public IndustryId:any;
  public title:any="Add Material Available";
  public Quantity:any="0";
  public Material:any='';
  public AllMaterialData:any;
  constructor(public navCtrl: NavController,
        public navParms: NavParams,
        public webService: ServiceSingletonProvider) {
          if(this.navParms.get('IndustryId')){
            this.IndustryId=this.navParms.get('IndustryId');
        }
        this.getAllMaterial();
  }

  getAllMaterial(){
    this.webService.presentLoading();
    this.webService.getIndustryAllMaterial(this.IndustryId).then(data=>{
      this.webService.stopLoading();
      console.log(data);
      if(data['data']){
        this.AllMaterialData=data['data'];
      }
    })
  }
  
  MaterialSelected(){

  }

  SaveMaterialAvailable(){
    if(this.Material==undefined || this.Material==''){
      this.webService.presentAlert('Alert!','Select Material?');
    }
    else if(this.Quantity==0 || this.Quantity=='' || this.Quantity==undefined){
      this.webService.presentAlert('Alert!','Enter Valid Quatity of selected material');
    }else{
      this.CallWebServices();
    }
  }

  Reset(){
    this.Material='';
    this.Quantity=0;
  }

  CallWebServices(){
    var myKeyVals={ indu_id:this.IndustryId, material_master_id:this.Material, available_quantity:this.Quantity};
    this.webService.presentLoading();
    this.webService.postOneMateriAvailableMater(myKeyVals).then(data=>{
      this.webService.stopLoading();
      console.log(data);
      if(data['msg']){
        this.Reset();
        this.webService.presentAlert('Success!','Material quantity added successfully')
      }
    })
  }
}
