import { Component } from '@angular/core';
import { NavController,NavParams,AlertController } from 'ionic-angular';
import { ServiceSingletonProvider } from '../../providers/service-singleton/service-singleton';

@Component({
  selector: 'page-AddIndustryScheduleTransaction',
  templateUrl: 'AddIndustryScheduleTransaction.html'
})
export class AddIndustryScheduleTransactionPage {
  public IndustryId:any;
  public title:any="Add Schedule Product";
  public Quantity:any="";
  public Product:any='';
  public AllMaterialData:any=[];
  public StartDate:any=new Date().toISOString();
  public EndDate:any=new Date().toISOString();
  public selectedPrductInfo:any;
  public currentDate:any=new Date();
  constructor(  public navCtrl: NavController,
                public navParms: NavParams,
                public webService: ServiceSingletonProvider,
                public alertCtrl:AlertController) {
          if(this.navParms.get('IndustryId')){
            this.IndustryId=this.navParms.get('IndustryId');
        }
        this.getAllMaterial();
  }

  getAllMaterial(){
    this.webService.presentLoading();
    this.webService.getAllMaterialChk(this.IndustryId).then(data=>{
        this.webService.stopLoading();
        console.log(data);
        if(data['data']){
            this.AllMaterialData=data['data'];
        }
    })
  }

  ProductSelected(){
    // if(this.Product!=''){
    //   this.webService.presentLoading();
    //   this.webService.getOneMaterialChkInfo(this.Product).then(data=>{
    //     this.webService.stopLoading();
    //     if(data['data']){
    //       this.selectedPrductInfo=data['data'];
    //       console.log(this.selectedPrductInfo);
    //     }
    //   })
    //}
  }

  dateChangeStart(){
    console.log(this.StartDate);
    console.log(this.EndDate);
    if(new Date(this.StartDate)<new Date(this.currentDate)){
      console.log('Start date shoudnot be previous date');
      this.showConfirm('Start date shoudnot be previous date');
    }
    else if(new Date(this.StartDate)>new Date(this.EndDate)){
      console.log('Start date should not be greater than end date');
      this.showConfirm('Start date should not be greater than end date');
    }
  }

  dateChangeEnd(){
    console.log(this.StartDate);
    console.log(this.EndDate);
    if(new Date(this.EndDate)<new Date(this.currentDate)){
      console.log('End date shoudnot be previous date');
      this.showConfirm('End date shoudnot be previous date');
    }
    else if(new Date(this.EndDate)<new Date(this.StartDate)){
      console.log('End date should not be less than end date');
      this.showConfirm('End date should not be less than  end date');
    }
  }

  SaveScheduleTrans(){
    if(this.Quantity==''|| this.Quantity==undefined || this.Quantity=='0'){
      this.webService.presentAlert('Alert','Enter the valid product quantity');
    }
    else if(new Date(this.StartDate)<new Date(this.currentDate)){
      console.log('Start date shoudnot be previous date');
      this.showConfirm('Start date shoudnot be previous date');
    }
    else if(new Date(this.StartDate)>new Date(this.EndDate)){
      console.log('Start date should not be greater than end date');
      this.showConfirm('Start date should not be greater than end date');
    }
    else if(new Date(this.EndDate)<new Date(this.currentDate)){
      console.log('End date shoudnot be previous date');
      this.showConfirm('End date shoudnot be previous date');
    }
    else if(new Date(this.EndDate)<new Date(this.StartDate)){
      console.log('End date should not be less than end date');
      this.showConfirm('End date should not be less than  end date');
    }
    else{
      this.CallWebServices();
    }
  }

  CallWebServices(){
    var myKeyVals={indu_id:this.IndustryId, quantity:this.Quantity,product_id:this.Product, fromDate:this.StartDate, toDate:this.EndDate};
    this.webService.presentLoading();
    this.webService.postOneScheduleTransaction(myKeyVals).then(data=>{
      this.webService.stopLoading();
      console.log(data);
      if(data['msg']){
        this.Reset();
        this.webService.presentAlert('Success!','Product Scheduled Successsfully.')
      }
    })
  }

  Reset(){
    this.Product='';
    this.Quantity="";
    this.StartDate=new Date(this.currentDate).toISOString();
    this.EndDate=new Date(this.currentDate).toISOString();
  }


  showConfirm(msg) {
    let confirm = this.alertCtrl.create({
      title: 'Attention?',
      message: msg,
      buttons: [
        {
          text: 'Dismiss',
          handler: () => {
            console.log('Agree clicked');
            this.StartDate=new Date(this.currentDate).toISOString();
            this.EndDate=new Date(this.currentDate).toISOString();
          }
        }
      ]
    });
    confirm.present();
  }
}