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
  public minParem:any=0;
  public maxParem:any=100;
  public ParemCount:any=this.minParem;
  public paremeterName : any= [];
  public paremeterQuantity : any= [];
  public tempparemeterName:Array<{id: number, value: string}> =[];  
  constructor(public navCtrl: NavController,
        public navParms: NavParams,
        public webService: ServiceSingletonProvider) {
          if(this.navParms.get('IndustryId')){
            this.IndustryId=this.navParms.get('IndustryId');
        }
  }

  onInputChange(){
    console.log(this.ParemCount);
    this.paremeterName=[];
    this.paremeterQuantity=[]
    this.tempparemeterName=[];
    if(this.ParemCount>0){
      for(let j=0;j<this.ParemCount;j++){
        this.tempparemeterName.push({id:j,value:""+j});
      }
    }
  }

  SaveMaterial(){
    if(this.MaterialName=='' && this.Description==''){
      this.webService.presentAlert('Alert!','Fill all the blank fields.');
    }
    else if(this.MaterialName==''){
      this.webService.presentAlert('Alert!','Enter the material name');
    }
    else if(this.Description==''){
      this.webService.presentAlert('Alert!','Enter the material description');
    }
    else if(this.ParemCount>0 && this.tempparemeterName.length>0){
      for(let v=0;v<this.tempparemeterName.length;v++){
        if(this.paremeterName[v]==undefined || !this.paremeterName[v]){
            return this.webService.presentAlert('Alert!','Enter '+(v+1)+' Paremeter Name');
        }
        else if(this.paremeterQuantity[v]==undefined || !this.paremeterQuantity[v]){
          return this.webService.presentAlert('Alert!','Enter '+(v+1)+' Paremeter PerUnit Quantity');          
        }
      }
      this.postData();
    }
    else{
    this.postData();
    }
  }

  Reset(){
    this.MaterialName='';
    this.Description='';
    this.ParemCount=0;
    this.tempparemeterName=[];
  }

  postData(){
    let paremeterArr=[];
    let myKeyVals={indu_id:this.IndustryId, name:this.MaterialName, description:this.Description};
    if(this.tempparemeterName.length){
      let k=0;
      for(let item of this.tempparemeterName){
        let obj={
          parem_name:this.paremeterName[k],
          parem_qty:Number(this.paremeterQuantity[k])
        }
        paremeterArr.push(obj);
        k++;
      }
      myKeyVals['parameters']=paremeterArr;
    }
    console.log(myKeyVals);
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