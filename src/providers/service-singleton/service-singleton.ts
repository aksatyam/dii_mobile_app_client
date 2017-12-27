import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";
import {Events, AlertController, LoadingController,ToastController } from "ionic-angular";

@Injectable()
export class ServiceSingletonProvider {
  public BASE_URL: string = "http://dii-api-lpu.herokuapp.com/app/route/";
  public alert:any;
  public toast:any;
  public loading:any;
  public data:any;
  public headers:any={'Content-Type': 'application/json'};
  public DEVICE_ID:any;
  public TOKEN:any;
  public USER_ID:any;
  public USER:any; 
  public USER_TYPE:any;

  constructor(public http: Http,
    public storage:Storage,
    public toastCtrl: ToastController,
    public loadingCtrl:LoadingController,
    public alertCtrl:AlertController,
    public events:Events) {
    console.log('Hello ServiceSingletonProvider Provider');
  }

  checkLogin(){
    console.log('checkLogin');
    return new Promise(resolve=>{
      this.storage.get("ACCESS_TOKEN").then((val)=>{
        console.log(val);
        this.TOKEN=val;
      });

      this.storage.get("USER_ID").then((val)=>{
        console.log(val);
         this.USER_ID=val;
      });

      this.storage.get("USERINFO").then((val)=>{
        console.log("1"+val);
        this.USER=val;
        console.log(this.USER);
        if(this.TOKEN && this.USER_ID && this.USER){
          resolve(true) ;
        }else{
          resolve(false);
        }
      });
    });
  }

  setDeviceId(device_id) {
    this.storage.set('DEVICE_ID',device_id);
  }

  setTokenId(token) {
    this.storage.set('ACCESS_TOKEN',token);
  }

  setUserId(user_id) {
    this.storage.set('USER_ID',user_id);
  }

  setUSER(User){
    this.storage.set('USERINFO',User);
  }
  
  setIndustryId(Indu_id){
    this.storage.set('IndustryId',Indu_id);
  }

  getUserInfo(){
    var UserInfo=this.storage.get("USERINFO").then(data=>{
      return data;
    })
    return UserInfo;
  }

  postLogout(){
    return new Promise((resolve)=>{
      this.storage.set('ACCESS_TOKEN','');
      this.storage.set('USER_ID','');
      this.storage.set('USERINFO','');
      this.storage.set('DEVICE_ID','');
      resolve(true);
    });

  }
  
  //GET-POST Method Call Functions 
  getData(u) {
    return new Promise(resolve=>{
      this.http.get(u,{headers:new Headers(this.headers)})
        .map(res=>res.json())
        .subscribe(data=>{
        this.data=data;
        resolve(this.data)
      },err=>{
          console.log(JSON.stringify(err));
          var errord=JSON.parse(err['_body']);
          if(errord){
            this.presentToast(errord['message']);
            this.stopLoading();
          }
          else{
            console.log("error Occured");
            this.presentToast("Please Check Internet Connection or Try Again Later!");
          }
          resolve(false);
      })
    })
  }

  postData(u,data){
    return new Promise(resolve => {
      this.http.post(u,data,{headers:new Headers(this.headers)})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        },err=>{
          var errord=JSON.parse(err['_body']);
          if(errord){
            this.presentToast(errord['message']);
            this.stopLoading();
          }
          else{
            console.log("error Occured");
            this.presentToast("Please Check Internet Connection or Try Again Later!");
          }
          resolve(false);
        });
    });
  }

  //GENERAL FUNCTION IN THE APPLICATION

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'OK',
      dismissOnPageChange: false
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  presentLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
  stopLoading(){
    this.loading.dismissAll();
  }

  presentAlert(mainTitle,subTitle) {
    let alert = this.alertCtrl.create({
      title: mainTitle,
      subTitle: subTitle,
      buttons: [{
        text:'OK',
      }],
      cssClass:'alertcss'
    });
    alert.present();
  }

  
  
  //SuperAdmin methods
  postSuperAdminSave(myKeyVals){
    var u=this.BASE_URL+"superadmin"+"/"+"save";
    console.log(u);
    console.log(myKeyVals);
    return this.postData(u,myKeyVals);
  }

  postSuperAdminLogin(UID,Password){
    var u=this.BASE_URL+"superadmin"+"/"+"getAdmin";
    console.log(u);
    var myKeyVals={ "UID": UID, "password": Password };
    console.log(myKeyVals);
    return this.postData(u,myKeyVals);
  }

  //Industry User Info
  postIndustryLogin(myKeyVals){
    var u=this.BASE_URL+"user_master"+"/"+"userGet";
    console.log(u);
    console.log(myKeyVals);
    return this.postData(u,myKeyVals);
  }

  //GET Industry Category List
  getCategory(){
    var u=this.BASE_URL+"industryCategory"+"/"+"getAll";
    console.log(u);
    return this.getData(u);
  }

  //POST Industry Category

  postCateegory(induName,induDesc){
    var u=this.BASE_URL+"industryCategory"+"/"+"save";
    console.log(u);
    var myKeyVals={category_name:induName, description: induDesc};
    return this.postData(u,myKeyVals);
  }

  //GET Selected Industry Category Types
  getCategoryList(id){
    var u=this.BASE_URL+"industryCategoryList"+"/"+"getAll"+"/"+id;
    console.log(u);
    return this.getData(u);
  }

  //POST Industry Selected Industry TYpes
  postCategoryList(category_name,description,indu_cat_id){
    var u=this.BASE_URL+"industryCategoryList"+"/"+"save";
    console.log(u);
    var myKeyVals={indu_cat_id:indu_cat_id,category_list_name:category_name, description: description};
    return this.postData(u,myKeyVals);
  }

  //GET all Industry after Selectd Category and Sub Category
  getAllIndusryList(cat_id,sub_cat_id){
    var u=this.BASE_URL+"industry"+"/"+"industry_getall"+"/"+cat_id+"/"+sub_cat_id;
    console.log(u);
    return this.getData(u);
  }

  //POST to SAVE Industry Data
  postSaveIndustryList(myKeyVals){
    var u=this.BASE_URL+"industry"+"/"+"industry_save";
    console.log(u);
    console.log(myKeyVals);
    return this.postData(u,myKeyVals);
  }

  getOneIndustryInfo(Id){
    var u=this.BASE_URL+"industry"+"/"+"industry_getone"+"/"+Id;
    console.log(u);
    return this.getData(u);
  }

  //POST to Save Industry Type
  postSaveIndstryType(myKeyVals){
    var u=this.BASE_URL+"user_type"+"/"+"save";
    console.log(u);
    console.log(myKeyVals);
    return this.postData(u,myKeyVals);
  }

  //GET TO all Industry User Types
  getAllIndutsryType(ID){
    var u=this.BASE_URL+"user_type"+"/"+"getOne"+"/"+ID;
    console.log(u);
    return this.getData(u);
  }

  //POST to Save Industry User
  postSaveIndustryUser(myKeyVals){
    var u=this.BASE_URL+"user_master"+"/"+"user_save";
    console.log(u);
    console.log(myKeyVals);
    return this.postData(u, myKeyVals);
  }

  //Get All User Of Industry
  getAllIndustryUser(ID){
    var u=this.BASE_URL+"user_master"+"/"+"userAll"+"/"+ID;
    console.log(u);
    return this.getData(u);
  }

  //Get all equipments of one Industry
  getIndustryAllEquip(ID){
    var u=this.BASE_URL+"equip_master"+"/"+"getAllEquip"+"/"+ID;
    console.log(u);
    return this.getData(u);
  }
//Post eqipment of one industry
  postIndustryOneEquip(myKeyVals){
    var u=this.BASE_URL+"equip_master"+"/"+"save";
    console.log(u);
    console.log(myKeyVals);
    return this.postData(u, myKeyVals);
  }

  //get All Material of One Industry
  getIndustryAllMaterial(ID){
    var u=this.BASE_URL+"material"+"/"+"getAll"+"/"+ID;
    console.log(u);
    return this.getData(u);
  }
  //Post one material of one Industry
  postIndustryOneMaterial(myKeyVals){
    var u=this.BASE_URL+"material"+"/"+"save";
    console.log(u);
    console.log(myKeyVals);
    return this.postData(u, myKeyVals);
  }
  //get All StageEquipment Info of one company
  getIndustryAllSatgeEquip(ID){
    var u=this.BASE_URL+"stageEquipment"+"/"+"getAll"+"/"+ID;
    console.log(u);
    return this.getData(u);
  }
  //post one StageEquipment Info of one company
  postIndustryOneStageEquip(myKeyVals){
    var u=this.BASE_URL+"stageEquipment"+"/"+"save";
    console.log(u);
    console.log(myKeyVals);
    return this.postData(u, myKeyVals);
  }
  //get all Shift Info of one company
  getIndustryAllShift(ID){
    var u=this.BASE_URL+"shift"+"/"+"allshift"+"/"+ID;
    console.log(u);
    return this.getData(u);
  }
  //post one Shift info of one company
  postIndustryOneShift(myKeyVals){
    var u=this.BASE_URL+"shift"+"/"+"save";
    console.log(u);
    console.log(myKeyVals);
    return this.postData(u, myKeyVals);
  }
  //get all Lots Info of one company
  getIndustryAllLots(ID){
    var u=this.BASE_URL+"lot"+"/"+"getAll"+"/"+ID;
    console.log(u);
    return this.getData(u);
  }
  
  //post one lots info of one company
  postIndustryOneLots(myKeyVals){
    var u=this.BASE_URL+"lot"+"/"+"save";
    console.log(u);
    console.log(myKeyVals);
    return this.postData(u, myKeyVals);
  }
  
}
