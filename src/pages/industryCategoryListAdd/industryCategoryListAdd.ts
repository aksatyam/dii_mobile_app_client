import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
@Component({
  selector: 'page-industryCategoryListAdd',
  templateUrl: 'industryCategoryListAdd.html'
})
export class IndustryCategoryListAddPage {
  public CategroyListData:any;
  public title:any="Add Industry Categroy";
  public categoryName:any='';
  public categoryDesc:any='';

  constructor(public navCtrl: NavController, public webService:ServiceSingletonProvider, public navParms:NavParams) {
    if(this.navParms.get('SelectedData')){
        this.CategroyListData=this.navParms.get('SelectedData');
        this.title="Add "+this.CategroyListData.indu_cat_name+" Industry";
    }
  }
  SaveIndustry(){
    if(this.categoryDesc=='' && this.categoryName==''){
        return this.webService.presentAlert('Alert!','Enter Industry Category Name and Description.');
    }
    else if(this.categoryName==''){
        return this.webService.presentAlert('Alert!','Enter Industry Category Name.');
    }
    else if(this.categoryDesc==''){
        this.webService.presentAlert('Alert!','Enter Industry Description');
    }
    else{
        console.log('Calling Web Services...');
        this.postIndustryCategoryList();
    }
  }

  Reset(){
    this.categoryDesc='';
    this.categoryName='';
  }

  postIndustryCategoryList(){
    this.webService.presentLoading();
    this.webService.postCategoryList(this.categoryName,this.categoryDesc,this.CategroyListData._id).then(data=>{
      this.webService.stopLoading();
      console.log(data);
        if(data['msg']=='done'){
            this.webService.presentAlert('Success!',this.categoryName+' Added Successfully.')
            this.Reset();
        }
    });  
  }
}
