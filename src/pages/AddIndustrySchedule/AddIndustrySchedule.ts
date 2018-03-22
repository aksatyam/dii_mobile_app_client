import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';

@Component({
  selector: 'page-AddIndustrySchedule',
  templateUrl: 'AddIndustrySchedule.html'
})
export class AddIndustrySchedulePage{
    public IndustryId:any;
    public title:any="Add Schedules";
    public AllProductData:any;
    public AllStagesData:any;
    public Product:any;
    public stagesArray:any;
    public tempArray:Array<{id: number, value: string}> =[];
    public array : any= [];
    constructor(  public navCtrl: NavController,
        public navParms: NavParams,
        public webService: ServiceSingletonProvider) {
        if(this.navParms.get('IndustryId')){
            this.IndustryId=this.navParms.get('IndustryId');
        }
        this.getAllMaterial();
    }

    getAllMaterial(){
        this.webService.presentLoading();
        this.webService.getAllMaterialChk(this.IndustryId).then(data=>{
            this.webService.stopLoading();
            console.log(data);
            if(data['data']){
                this.AllProductData=data['data'];
            }
        })
    }

    ProductSelected(){
        console.log(this.Product);
        this.webService.presentLoading();
        this.webService.getIndustryAllSatgeEquip(this.IndustryId).then(data=>{
            this.webService.stopLoading();
            console.log(data);
            if(data['data']){
                this.AllStagesData=data['data'];
            }
        })
    }

    StageSelected(){
        console.log(this.stagesArray);
        this.tempArray=[];
        for(let v=0;v<this.stagesArray.length;v++){
            this.tempArray.push({id:v, value:this.AllStagesData[v]});
        }
        console.log(this.tempArray);
    }

    timeChange(val){
        console.log(val);
    }

    SaveSchedule(){
        console.log(this.array);
        if(this.Product==undefined ||this.Product==''){
            this.webService.presentAlert('Alert!','Select Product name.');
        }
        else if(this.stagesArray==undefined || this.stagesArray==[]){
            this.webService.presentAlert('Alert','Select atleast One Stage');
        }
        else if(this.tempArray){
            console.log(this.array)
            for(let v=0;v<this.tempArray.length;v++){
                if(this.array[v]==undefined || !this.array[v]){
                    return this.webService.presentAlert('Alert!','Enter '+this.tempArray[v].value['stage_name']+' quantity');
                }
            }
            this.saveCallWebService();
        }
    }

    saveCallWebService(){
        let satgeArr=[];
        let myKeyVals={ indu_id:this.IndustryId, product_id:this.Product};
        if(this.tempArray.length<25 && this.tempArray.length>0){
            let i =0;
            for(let item of this.tempArray){
                let obj = {
                    stage_id : item.value['_id'],
                    perUnitTime:  Number(this.array[i])
                }
                satgeArr.push(obj);
                i++;
            }
        }
        myKeyVals['stages'] = satgeArr;
        this.webService.presentLoading();
        this.webService.postIndustryOneSchedule(myKeyVals).then(data=>{
            this.webService.stopLoading();
            console.log(data);
            if(data['msg']){
                this.Reset();
                this.webService.presentAlert('Success!','Schedule Added Successfully');
            }
        })
    }

    Reset(){
        this.tempArray=[];
        this.Product='';
        this.stagesArray=[];
    }

}