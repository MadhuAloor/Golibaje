import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { EventsPage } from '../pages/events/events';
import { Page2 } from '../pages/page2/page2';
import { LoginPage } from '../pages/login/login';


@NgModule({
  declarations: [
    MyApp,
    EventsPage,
    Page2,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EventsPage,
    Page2,
    LoginPage
  ],
  providers: []
})
export class AppModule {}
