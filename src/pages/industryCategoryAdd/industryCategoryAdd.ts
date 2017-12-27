import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton'

@Component({
  selector: 'page-industryCategoryAdd',
  templateUrl: 'industryCategoryAdd.html'
})
export class IndustryCategoryAddPage {
  public title:any='Add Industry';
  public categoryName:any='';
  public categoryDesc:any='';

  constructor(public navCtrl: NavController, public webService:ServiceSingletonProvider) {

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
        this.postIndustryCategory();
    }
  }

  Reset(){
    this.categoryDesc='';
    this.categoryName='';
  }

  postIndustryCategory(){
      this.webService.presentLoading();
      this.webService.postCateegory(this.categoryName,this.categoryDesc).then(data=>{
        this.webService.stopLoading();  
        console.log(data);
        if(data['msg']=='done'){
            this.webService.presentAlert('Success!',this.categoryName+' Industry Added Successfully.')
            this.Reset();
        }
      })
  }
}
