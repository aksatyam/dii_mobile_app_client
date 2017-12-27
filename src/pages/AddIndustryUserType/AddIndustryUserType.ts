import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';
@Component({
  selector: 'page-AddIndustryUserType',
  templateUrl: 'AddIndustryUserType.html'
})
export class AddIndustryUserTypePage {
    public title="Add User Type";
    public IndustryId:any;
    public UserType:any='';
    public Description:any='';
    constructor(public navCtrl: NavController, public webService:ServiceSingletonProvider, public navParms:NavParams) {
        if(this.navParms.get('IndustryId')){
            this.IndustryId=this.navParms.get('IndustryId');
        }
    }

    SaveIndustry(){
        if(this.UserType=='' && this.Description==''){
            this.webService.presentAlert('Alert!','Enter User Type and Description');
        }
        else if(this.UserType==''){
            this.webService.presentAlert('Alert!','Enter User Type');
        }
        else if(this.Description==''){
            this.webService.presentAlert('Alert!','Enter User Type Description');
        }
        else{
            var myKeyVals={indu_id:this.IndustryId, type:this.UserType, type_description:this.Description};
            this.webService.presentLoading();
            this.webService.postSaveIndstryType(myKeyVals).then(data=>{
                this.webService.stopLoading();
                console.log(data);
                if(data['msg']){
                    this.Reset();
                    this.webService.presentAlert('Success','User Type Added Successfully.');
                }
            })
        }
    }
    
    Reset(){
        this.UserType='';
        this.Description='';
    }
}