import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, Thumbnail } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { ServiceProvider } from '../../providers/service/service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Token } from '../../model/token.model'
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@IonicPage()
@Component({
  selector: 'page-generate-document',
  templateUrl: 'generate-document.html',
})
export class GenerateDocumentPage {
  public Token: Token
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
  token = new Array();
  AccessTokenKey;
  package_ID = new Array();
  navParamToken = new Array()
  displayToken = new Array();
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
        { text: this.firstname },
        { text: 'Surname', style: 'subheader' },
        { text: this.surname },
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

    var request = require('request');



    this.pdfObj = pdfMake.createPdf(docDefinition);





  }
  downloadPdf() {
    console.log(this.token)
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
      console.log(this.pdfObj)
    }
    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'https://uatapi.signinghub.co.za/authenticate',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        'grant_type': 'password',
        'client_id': 'APIT_INT_DGH2',
        'client_secret': '946C5E5FCCC0BCA7B2F95BA092332542ABDDD16AA0A67873D70803A6D54ADBD4',
        'username': 'shservice2.gautenghealth@lt-shaccounts.co.za',
        'password': 'P@ssword1234'
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      let results = JSON.parse(response.body);
      this.token = results.access_token

      let obj = {
        token: this.token
      }
      console.log(obj)
      this.navParamToken = obj
      console.log(this.navParamToken)

      var options = {
        'method': 'POST',
        'url': 'https://uatapi.signinghub.co.za/v3/packages',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        },
        body: "{\r\n    \"package_name\": \"Test\"\r\n}"


      };
      console.log(this.navParamToken)

     

      request(this.navParamToken,options, function (error, response) {
        console.log(this.navParamToken)
        if (error) throw new Error(error);
        console.log(response)
        let packageId = JSON.parse(response.body);
        console.log(packageId)
        this.package_ID = packageId.package_id


        console.log(this.package_ID)
        console.log(this.navParamToken)

        var options = {
          'method': 'POST',
          'url': 'https://uatapi.signinghub.co.za/v3/packages/' + this.package_ID + '/documents',
          'headers': {
            'Content-Type': 'application/octet-stream',
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json',
            'x-file-name': 'file.pdf',
            'x-convert-document': 'true',
            'x-source': 'API'



          },
          body: "<file contents here>"

        };
        request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log(response.body);
        });
      });



    });


  }
}
