import { Component } from '@angular/core';
import { NavController,MenuController, NavParams} from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton'
import { IndustryCategoryAddPage } from '../../pages/industryCategoryAdd/industryCategoryAdd';
import { IndustryCategoryListPage } from '../../pages/industryCategoryList/industryCategoryList';
@Component({
  selector: 'page-Dashboard',
  templateUrl: 'Dashboard.html'
})
export class DashboardPage {
  public industryCategory:any;
  public title:any="Dashboard";
  public Status:boolean=false;
  public UserInfo:any;
  constructor(public navCtrl: NavController,
              public menuctrl:MenuController,
              public webService:ServiceSingletonProvider,
              public navParms:NavParams) {
    this.menuctrl.enable(true);
    if(this.navParms.get('UserDetails')){
      this.UserInfo=this.navParms.get('UserDetails');
      this.webService.setUSER=this.UserInfo;
    }
    this.getCategory();
  }

  addIndustryCategory(){
    this.navCtrl.push(IndustryCategoryAddPage);
  }

  getCategory(){
    this.webService.presentLoading();
    this.webService.getCategory().then(data=>{
      this.webService.stopLoading();
      console.log(data);
      if(data){
        if(data['data']){
          this.industryCategory=data['data'];
        }else{
          this.webService.presentAlert('Alert',data['message']);
        }
      }
    })
  }

  ionViewDidEnter(){
    if(this.Status){
      this.getCategory();
    }
    this.Status=true;
  }

  selectedIndustryList(cat){
    this.navCtrl.push(IndustryCategoryListPage,{'Category':cat});
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getCategory();
      refresher.complete();
    }, 2000);
  }

}
