import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';

@Component({
  selector: 'page-IndustryDetails',
  templateUrl: 'IndustryDetails.html'
})
export class IndustryDetailsPage {
  public title:any="Industry Details";
  public IndustryData:any;
  public industyDeatils:any='Industry Profile';
  constructor(public navCtrl: NavController,
              public navParms: NavParams,
              public webService: ServiceSingletonProvider) {
      if(this.navParms.get('IndustryInfo')){
        this.IndustryData=this.navParms.get('IndustryInfo');
      }
      console.log(this.IndustryData);
      this.title=this.IndustryData.indu_name;
  }

}
