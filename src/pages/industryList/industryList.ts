import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
import { IndustryListAddPage } from '../../pages/industryListAdd/industryListAdd';
import { IndustryInfoPage } from '../industryInfo/industryInfo';

@Component({
  selector: 'page-industryList',
  templateUrl: 'industryList.html'
})
export class IndustryListPage {
  public title="Industries";
  public Status:boolean=false;
  public Categroy:any;
  public SubCategroy:any;
  public industryList:any;
  constructor(public navCtrl: NavController, public webService:ServiceSingletonProvider, public navParms:NavParams) {
    if(this.navParms.get('Categroy')&&this.navParms.get('SubCategory')){
      this.Categroy=this.navParms.get('Categroy');
      this.SubCategroy=this.navParms.get('SubCategory')
      console.log(this.Categroy);
      console.log(this.SubCategroy);
      this.title=this.SubCategroy.indu_cat_list_name;
    }
    this.getIndustryList();
  }

  addIndustryList(){
    this.navCtrl.push(IndustryListAddPage,{'Categroy':this.Categroy,'SubCategory':this.SubCategroy});
  }

  getIndustryList(){
    this.webService.presentLoading();
    this.webService.getAllIndusryList(this.Categroy._id,this.SubCategroy._id).then(data=>{
      this.webService.stopLoading();
      console.log(data);
      if(data){
        if(data['data']){
          this.industryList=data['data'];
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
      this.getIndustryList();
      refresher.complete();
    }, 2000);
  }

  ionViewDidEnter(){
    if(this.Status){
      this.getIndustryList();
    }
    this.Status=true;
  }

  CallIndustryInfo(list){
    console.log(list);
    this.navCtrl.push(IndustryInfoPage,{'IndustryInfo':list});
  }
}
