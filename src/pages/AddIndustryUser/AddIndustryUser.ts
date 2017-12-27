import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
@Component({
  selector: 'page-AddIndustryUser',
  templateUrl: 'AddIndustryUser.html'
})
export class AddIndustryUserPage {
    public title="Add User";
    public IndustryId:any;
    public Username:any='';
    public UserType:any;
    public Contact:any='';
    public Email:any='';
    public Password:any='';
    public UserTypeData:any;
    constructor(public navCtrl: NavController, public webService:ServiceSingletonProvider, public navParms:NavParams) {
        if(this.navParms.get('IndustryId')){
            this.IndustryId=this.navParms.get('IndustryId');
        }
        this.CallwebServices();
    }

    CallwebServices(){
        this.webService.presentLoading();
        this.webService.getAllIndutsryType(this.IndustryId).then(data=>{
            this.webService.stopLoading();
            console.log(data);
            if(data['data']){
                this.UserTypeData=data['data'];
            }
        })
    }

    SaveIndustry(){
        if(this.Username =='' || this.Username == undefined ){
            return this.webService.presentAlert('Alert!',"Enter User Name");
        }
        else if(this.UserType==undefined || this.UserType==''){
            return this.webService.presentAlert('Alert!',"Select User Type");
        }
        else if(this.Contact==undefined || this.Contact==''){
            return this.webService.presentAlert('Alert!','Enter Contact No');
        }
        else if(!this.validatePhone(this.Contact)){
            return this.webService.presentAlert('Alert!', 'Inavlid Phone No.');
        }
        else if(this.Email==undefined || this.Email==''){
            return this.webService.presentAlert('Alert!','Enter Email Id');
        }
        else if(!this.validateEmail(this.Email)){
            return this.webService.presentAlert('Alert!','Invalid Email');
        }
        else if(this.Password==undefined || this.Password==''){
            return this.webService.presentAlert('Alert!','Enter Password');
        }
        else{
            this.postData();
        }

    }

    postData(){
        console.log(this.Username);
        console.log(this.UserType);
        console.log(this.Contact);
        console.log(this.Email);
        console.log(this.Password);
        var myKeyVals={indu_id:this.IndustryId, 
                        type_id:this.UserType, 
                        name:this.Username,
                        contact:this.Contact,
                        email: this.Email,
                        password:this.Password,
                        deviceId:'123456789' };
        this.webService.presentLoading();
        this.webService.postSaveIndustryUser(myKeyVals).then(data=>{
            this.webService.stopLoading();
            console.log(data);
            if(data['msg']){
                this.Reset();
                this.webService.presentAlert('Success!','User Added Successfully.');
            }
        })
    }

    Reset(){
        this.Username='';
        this.UserType='';
        this.Email='';
        this.Contact='';
        this.Password='';
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    
      validatePhone(phone){
        var re = /^\d{10}$/;
        return re.test(phone);
      }
}