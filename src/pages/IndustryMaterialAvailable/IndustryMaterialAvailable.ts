import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
import { AddIndustryMaterialAvailablePage } from '../AddIndustryMaterialAvailable/AddIndustryMaterialAvailable';

@Component({
    selector: 'page-IndustryMaterialAvailable',
    templateUrl: 'IndustryMaterialAvailable.html'
})

export class IndustryMaterialAvailablePage {
    public title:any="Industry Material Available";
    public IndustryInfo:any;
    public industyDeatils:any='Industry Material Available';
    public IndustryID:any;
    public Status:boolean=false;
    public MaterialAvailableData:any;
      
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

    addInduMaterialAvailable(){
        this.navCtrl.push(AddIndustryMaterialAvailablePage,{'IndustryId':this.IndustryID});
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
        this.webService.getAllMaterialAvailableMaster(this.IndustryID).then(data=>{
            this.webService.stopLoading();
            console.log(data);
            if(data['data']){
                this.MaterialAvailableData=data['data'];
            }
        })
    }
}