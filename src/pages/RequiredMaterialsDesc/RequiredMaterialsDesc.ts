import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';

@Component({
    selector: 'page-RequiredMaterialsDesc',
    templateUrl: 'RequiredMaterialsDesc.html'
})
  
export class RequiredMaterialsDescPage {
    public IndustryInfo:any;
    public title:any="Required Material Details";
    public IndustryID:any;
    public ProductInfo:any;
    public requiredMaterials:any;
    public materialsUsed:any=[];
    constructor(  public navCtrl: NavController,
        public webService:ServiceSingletonProvider, 
        public navParms:NavParams) {
            this.IndustryInfo=this.navParms.get('IndustryInfo');
            this.ProductInfo=this.navParms.get('ProductInfo');
            this.CallWebServices();
    }

    CallWebServices(){
        this.requiredMaterials=[];
        this.webService.presentLoading();
        this.webService.getOneMaterialChkInfo(this.ProductInfo.product_id._id).then(data=>{
            this.webService.stopLoading();
            if(data['data']){
                this.requiredMaterials.push(data['data']);
                this.materialsUsed=this.requiredMaterials[0].materials;
                console.log(this.requiredMaterials[0]);
                console.log(this.materialsUsed);
            }
        })
    }
}