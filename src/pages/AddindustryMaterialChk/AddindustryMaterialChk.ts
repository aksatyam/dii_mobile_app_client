import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';

@Component({
  selector: 'page-AddindustryMaterialChk',
  templateUrl: 'AddindustryMaterialChk.html'
})
export class AddIndustryMaterialChkPage {
  public IndustryId:any;
  public title:any="Add Products";
  public allMaterials:any;
  public Product:any;
  public materialArray:any;
  public array : any= [];
  public demoArr:any;
  public tempArray:Array<{id: number, value: string}> =[];
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
        this.webService.getIndustryAllMaterial(this.IndustryId).then(data=>{
            this.webService.stopLoading();
            console.log(data);
            if(data['data']){
                this.allMaterials=data['data'];
            }
        })
    }

    ProductSelected(){
        console.log(this.Product);
        this.demoArr=this.allMaterials.filter(ele=>{
            return ele._id!=this.Product;
        })
    }

    MaterialSecelted(){
        this.tempArray=[];
        console.log(this.materialArray);
        for(let v=0;v<this.materialArray.length;v++){
            this.tempArray.push({id:v, value:this.demoArr[v]});
        }
    }

    SaveProduct(){
        if(this.Product==undefined ||this.Product==''){
            this.webService.presentAlert('Alert!','Select Product name.');
        }
        else if(this.materialArray==undefined || this.materialArray==[]){
            this.webService.presentAlert('Alert','Select atleast One Material');
        }
        else if(this.tempArray){
            for(let v=0;v<this.tempArray.length;v++){
                if(this.array[v]==undefined || !this.array[v]){
                    return this.webService.presentAlert('Alert!','Enter '+this.tempArray[v].value['material_name']+' quantity');
                }
            }
            this.saveCallWebService();
        }
    }

    Reset(){
        this.tempArray=[];
        this.Product='';
        this.demoArr=[];
        this.materialArray=[];
    }

    saveCallWebService(){
        let myKeyVals={ indu_id:this.IndustryId, product_id:this.Product};
        for(let j=0;j<25;j++){
            if(this.tempArray[j]){
                myKeyVals["material"+j]=this.tempArray[j].value['_id'];
                myKeyVals["material"+j+"_qty"]=this.array[j];  
            }          
        }
        
        this.webService.presentLoading();
        this.webService.postIndustryOneProducts(myKeyVals).then(data=>{
            this.webService.stopLoading();
            console.log(data);
            if(data['msg']){
                this.Reset();
                this.webService.presentAlert('Success!','Product Added Successfully');
            }
        })
    }
}