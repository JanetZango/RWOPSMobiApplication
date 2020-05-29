import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenerateDocumentPage } from './generate-document';

@NgModule({
  declarations: [
    GenerateDocumentPage,
  ],
  imports: [
    IonicPageModule.forChild(GenerateDocumentPage),
  ],
})
export class GenerateDocumentPageModule {}
