import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
@Component({
  selector: 'page-industryListAdd',
  templateUrl: 'industryListAdd.html'
})
export class IndustryListAddPage {
  public title="Add Industry";
  public Categroy:any;
  public SubCategroy:any;
  public Indu_name:any;
  public Indu_type:any;
  public Indu_email:any;
  public Indu_contact:any;
  public Indu_address:any;
  public Indu_city:any;
  public Indu_state:any;
  public Indu_pin:any;
  public Indu_country:any;
  public Indu_ownerName:any;
  public Indu_staffCount:any;
  public Indu_desc:any;
  public Indu_estdYear:any;
  
  constructor(public navCtrl: NavController, public webService:ServiceSingletonProvider, public navParms:NavParams) {
    if(this.navParms.get('Categroy')&&this.navParms.get('SubCategory')){
        this.Categroy=this.navParms.get('Categroy');
        this.SubCategroy=this.navParms.get('SubCategory')
        console.log(this.Categroy);
        console.log(this.SubCategroy);
        this.title="Add "+this.SubCategroy.indu_cat_list_name;
      }
  }
  SaveIndustry(){
    if(this.Indu_name=='' || this.Indu_name==undefined){
      return this.webService.presentAlert('Alert!','Enter industry name.');
    }
    else if(this.Indu_type=='' || this.Indu_type==undefined){
      return this.webService.presentAlert('Alert!','Enter industry type.');
    }
    else if(this.Indu_email=='' || this.Indu_email==undefined){
      return this.webService.presentAlert('Alert!','Enter industry email.');
    }
    else if(!this.validateEmail(this.Indu_email)){
      return this.webService.presentAlert('Alert!','Inavlid industry email Id');
    }
    else if(this.Indu_contact=='' || this.Indu_contact==undefined){
      return this.webService.presentAlert('Alert!','Enter industry contact.');
    }
    else if(!this.validatePhone(this.Indu_contact)){
      return this.webService.presentAlert('Alert!','Inavlid industry contact No');
    }
    else if(this.Indu_address=='' || this.Indu_address==undefined){
      return this.webService.presentAlert('Alert!','Enter industry address.');
    }
    else if(this.Indu_city=='' || this.Indu_city==undefined){
      return this.webService.presentAlert('Alert!','Enter industry type.');
    }
    else if(this.Indu_state=='' || this.Indu_state==undefined){
      return this.webService.presentAlert('Alert!','Enter industry type.');
    }
    else if(this.Indu_pin=='' || this.Indu_pin==undefined){
      return this.webService.presentAlert('Alert!','Enter industry type.');
    }
    else if(this.Indu_country=='' || this.Indu_country==undefined){
      return this.webService.presentAlert('Alert!','Enter industry type.');
    }
    else if(this.Indu_ownerName=='' || this.Indu_ownerName==undefined){
      return this.webService.presentAlert('Alert!','Enter industry type.');
    }
    else if(this.Indu_staffCount=='' || this.Indu_staffCount==undefined){
      return this.webService.presentAlert('Alert!','Enter industry type.');
    }
    else if(this.Indu_desc=='' || this.Indu_desc==undefined){
      return this.webService.presentAlert('Alert!','Enter industry type.');
    }
    else if(this.Indu_estdYear=='' || this.Indu_estdYear==undefined){
      return this.webService.presentAlert('Alert!','Enter industry type.');
    }
    else{
      this.CallWebService();
    }
  }

  Reset(){
     this.Indu_name="";
     this.Indu_type="";
     this.Indu_email="";
     this.Indu_contact="";
     this.Indu_address="";
     this.Indu_city="";
     this.Indu_state="";
     this.Indu_pin="";
     this.Indu_country="";
     this.Indu_ownerName="";
     this.Indu_staffCount="";
     this.Indu_desc="";
     this.Indu_estdYear="";
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePhone(phone){
    var re = /^\d{10}$/;
    return re.test(phone);
  }

  CallWebService(){
    var myKeyVals={ indu_category: this.Categroy._id,
                    indu_sub_category:this.SubCategroy._id,
                    name: this.Indu_name,
                    type: this.Indu_type,
                    email: this.Indu_email,
                    contact: this.Indu_contact,
                    address: this.Indu_address,
                    city: this.Indu_city,
                    state: this.Indu_state,
                    pin: this.Indu_pin,
                    country: this.Indu_country,
                    owner: this.Indu_ownerName,
                    staff_count: this.Indu_staffCount,
                    description: this.Indu_desc,
                    estd_year: this.Indu_estdYear
                  };
    this.webService.presentLoading();
    this.webService.postSaveIndustryList(myKeyVals).then(data=>{
      this.webService.stopLoading();
      console.log(data);
      if(data){
        if(data['msg']=='done'){
          this.webService.presentAlert('Success!',' Industry Added Successfully.')
          this.Reset();
        }else{
          this.webService.presentAlert('Alert!',data['message']);
        }
      }
    })
  }
}
