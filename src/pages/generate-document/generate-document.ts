import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { ServiceProvider } from '../../providers/service/service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@IonicPage()
@Component({
  selector: 'page-generate-document',
  templateUrl: 'generate-document.html',
})
export class GenerateDocumentPage {
  letterObj = {
    from: 'janet',
    to: 'mpho',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
  }
  pdfObj = null
  currentLoggedIn = new Array();
  surname;
  firstname;
  email;
  id_number;
  id
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener,
    private service: ServiceProvider

  ) {
    this.currentLoggedIn.push(this.navParams.get('orgObject'));
    console.log(this.currentLoggedIn)
    this.id = this.currentLoggedIn[0][0].id
    this.firstname = this.currentLoggedIn[0][0].firstname
    this.surname = this.currentLoggedIn[0][0].surname
    this.id_number = this.currentLoggedIn[0][0].id_number
    this.email = this.currentLoggedIn[0][0].email

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerateDocumentPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }



  createPdf() {
    var docDefinition = {
      content: [
        { text: 'Section D: Declaration', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },

        { text: 'Full name', style: 'subheader' },
        { text: this.firstname},
        { text: 'Surname', style: 'subheader' },
        { text: this.surname},
        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },

        {
      
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition).open();
    this.service.generatetken(this.pdfObj).subscribe(_responseDataDesignation => {
      console.log(_responseDataDesignation)
    })
  }
  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var utf8 = new Uint8Array(buffer)
        var binaryArray = utf8.buffer;
        var blob = new Blob([binaryArray], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
}
