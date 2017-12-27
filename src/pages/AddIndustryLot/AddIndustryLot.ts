import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';

@Component({
  selector: 'page-AddIndustryLot',
  templateUrl: 'AddIndustryLot.html'
})
export class AddIndustryLotPage {
  public IndustryId:any;
  public title:any="Add Lot";
  public MaterialList:any;
  public materialsArray:any=[];
  public LotName:any='';
  public lotQuantity:number=0;
  public tempArray:any;
  constructor(  public navCtrl: NavController,
                public navParms: NavParams,
                public webService: ServiceSingletonProvider) {
            if(this.navParms.get('IndustryId')){
                this.IndustryId=this.navParms.get('IndustryId');
            }
            this.getAllMaterialList();
  }

  SaveLots(){
    if(this.materialsArray<1 && this.LotName=='' && this.lotQuantity==0){
        this.webService.presentAlert('Alert!','Fill all the blank fields');
    }
    else if(this.LotName==''){
        this.webService.presentAlert('Alert!','Enter Lot Name?');
    }
    else if(this.materialsArray<1){
        this.webService.presentAlert('Alert!','Select at least one Material?');
    }
    else if(this.lotQuantity<=0){
        this.webService.presentAlert('Alert!','Lot Quantity should not be Zero or Negative');
    }
    else{
        this.postData();
    }
  }
    Reset(){
        this.materialsArray=[];
        this.LotName='';
        this.lotQuantity=0;
    }

    getAllMaterialL(){
        console.log(this.materialsArray);
    }

    getAllMaterialList(){
        this.webService.presentLoading();
        this.webService.getIndustryAllMaterial(this.IndustryId).then(data=>{
            this.webService.stopLoading();
                if(data['data']){
                    this.MaterialList=data['data'];
                }
        })
    }

    postData(){
    var myKeyVals={indu_id:this.IndustryId,lot_name:this.LotName, lot_qty:this.lotQuantity};
        for(var i=0;i<25;i++){
            var keyVal='material'+i;
            if(this.materialsArray[i]){
                myKeyVals[keyVal]=this.materialsArray[i];
            }
        }

     console.log(myKeyVals);
     this.webService.presentLoading();
     this.webService.postIndustryOneLots(myKeyVals).then(data=>{
         this.webService.stopLoading();
         console.log(data);
         if(data['msg']){
             this.Reset();
             this.webService.presentAlert('Success!','Lot Added Successfully');
         }
     })
    }
}