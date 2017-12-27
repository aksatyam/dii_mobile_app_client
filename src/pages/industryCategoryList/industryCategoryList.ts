import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
import { IndustryCategoryListAddPage } from '../../pages/industryCategoryListAdd/industryCategoryListAdd';
import { IndustryListPage } from '../industryList/industryList'
@Component({
  selector: 'page-industryCategoryList',
  templateUrl: 'industryCategoryList.html'
})
export class IndustryCategoryListPage {
  public title:any='Industry Category';
  public CategroyData:any;
  public Status:boolean=false;
  public industryCategoryList:any;
  constructor(public navCtrl: NavController, public webService:ServiceSingletonProvider, public navParms:NavParams) {
    if(this.navParms.get('Category')){
        this.CategroyData=this.navParms.get('Category');
        this.title=this.navParms.get('Category').indu_cat_name;
        this.getCategoryList();
    }
  }

  addIndustryCateList(){
    this.navCtrl.push(IndustryCategoryListAddPage,{'SelectedData':this.CategroyData});
  }

  getCategoryList(){
      this.webService.presentLoading();
      this.webService.getCategoryList(this.CategroyData['_id']).then(data=>{
          this.webService.stopLoading();
          console.log(data);
          if(data){
            if(data['data']){
              this.industryCategoryList=data['data'];
            }else{
              this.webService.presentAlert('Alert',data['message']);
            }
          }
      })

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getCategoryList();
      refresher.complete();
    }, 2000);
  }

  ionViewDidEnter(){
    if(this.Status){
      this.getCategoryList();
    }
    this.Status=true;
  }

  AllselectedIndustry(catlist){
    this.navCtrl.push(IndustryListPage,{'Categroy':this.CategroyData, 'SubCategory':catlist});
  }
}
