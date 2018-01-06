import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
import { AddIndustryMaterialChkPage } from '../AddindustryMaterialChk/AddindustryMaterialChk';

@Component({
    selector: 'page-industryMaterialChk',
    templateUrl: 'industryMaterialChk.html'
})
  
export class IndustryMaterialChkPage {
    public title:any="Industry Product";
    public IndustryInfo:any;
    public industyDeatils:any='Industry Products';
    public IndustryID:any;
    public Status:boolean=false;
    public MaterialChkData:any;
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

    addInduProducts(){
      this.navCtrl.push(AddIndustryMaterialChkPage,{'IndustryId':this.IndustryID});
    }

CallWebServices(){
  this.webService.presentLoading();
    this.webService.getAllMaterialChk(this.IndustryID).then(data=>{
      this.webService.stopLoading();
      console.log(data);
      if(data['data']){
        this.MaterialChkData=data['data'];
      }
    })
  }
}