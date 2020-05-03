import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestpasswordPage } from './testpassword';

@NgModule({
  declarations: [
    TestpasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(TestpasswordPage),
  ],
})
export class TestpasswordPageModule {}
