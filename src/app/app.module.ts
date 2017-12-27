import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignInPage }from '../pages/SignIn/SignIn';
import { DashboardPage } from '../pages/Dashboard/Dashboard';
import { CoreShopPage } from '../pages/CoreShop/CoreShop';
import { ServiceSingletonProvider } from '../providers/service-singleton/service-singleton';
import { IndustryCategoryAddPage } from '../pages/industryCategoryAdd/industryCategoryAdd';
import { IndustryCategoryListPage } from '../pages/industryCategoryList/industryCategoryList';
import { IndustryCategoryListAddPage } from '../pages/industryCategoryListAdd/industryCategoryListAdd';
import { IndustryListPage } from '../pages/industryList/industryList';
import { IndustryListAddPage } from '../pages/industryListAdd/industryListAdd';
import { IndustryInfoPage } from '../pages/industryInfo/industryInfo';
import { AdminProfilePage } from '../pages/AdminProfile/AdminProfile';
import { IndustryDetailsPage } from '../pages/IndustryDetails/IndustryDetails';
import { IndustryUserTypePage } from '../pages/IndustryUserType/IndustryUserType';
import { IndustryUserPage } from '../pages/IndustryUser/IndustryUser';
import { IndustryEquipmentPage } from '../pages/IndustryEquipment/IndustryEquipment';
import { IndustryMaterialPage } from '../pages/IndustryMaterial/IndustryMaterial';
import { IndustryStageEquipPage } from '../pages/IndustryStageEquip/IndustryStageEquip';
import { IndustryShiftPage } from '../pages/IndustryShift/IndustryShift';
import { IndustryLotsPage } from '../pages/IndustryLots/IndustryLots'; 
import { AddIndustryUserTypePage } from '../pages/AddIndustryUserType/AddIndustryUserType';
import { AddIndustryUserPage } from '../pages/AddIndustryUser/AddIndustryUser';
import { AddIndustryEquipmentPage } from '../pages/AddIndustryEquipment/AddIndustryEquipment';
import { AddIndustryMaterialPage } from '../pages/AddIndustryMaterial/AddIndustryMaterial';
import { AddIndustryStageEquipPage } from '../pages/AddIndustryStageEquip/AddIndustryStageEquip';
import { AddIndustryShiftPage } from '../pages/AddIndustryShift/AddIndustryShift';
import { AddIndustryLotPage } from '../pages/AddIndustryLot/AddIndustryLot';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignInPage,
    DashboardPage,
    CoreShopPage,
    IndustryCategoryAddPage,
    IndustryCategoryListPage,
    IndustryCategoryListAddPage,
    IndustryListPage,
    IndustryListAddPage,
    IndustryInfoPage,
    AdminProfilePage,
    IndustryDetailsPage,
    IndustryUserTypePage,
    IndustryUserPage,
    IndustryEquipmentPage,
    IndustryMaterialPage,
    IndustryStageEquipPage,
    IndustryShiftPage,
    IndustryLotsPage,
    AddIndustryUserTypePage,
    AddIndustryUserPage,
    AddIndustryEquipmentPage,
    AddIndustryMaterialPage,
    AddIndustryStageEquipPage,
    AddIndustryShiftPage,
    AddIndustryLotPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignInPage,
    DashboardPage,
    CoreShopPage,
    IndustryCategoryAddPage,
    IndustryCategoryListPage,
    IndustryCategoryListAddPage,
    IndustryListPage,
    IndustryListAddPage,
    IndustryInfoPage,
    AdminProfilePage,
    IndustryDetailsPage,
    IndustryUserTypePage,
    IndustryUserPage,
    IndustryEquipmentPage,
    IndustryMaterialPage,
    IndustryStageEquipPage,
    IndustryShiftPage,
    IndustryLotsPage,
    AddIndustryUserTypePage,
    AddIndustryUserPage,
    AddIndustryEquipmentPage,
    AddIndustryMaterialPage,
    AddIndustryStageEquipPage,
    AddIndustryShiftPage,
    AddIndustryLotPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceSingletonProvider
  ]
})
export class AppModule {}
