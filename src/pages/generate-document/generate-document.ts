import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, Thumbnail } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { ServiceProvider } from '../../providers/service/service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Token } from '../../model/token.model';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


declare var require: any
declare const Buffer


@IonicPage()
@Component({
  selector: 'page-generate-document',
  templateUrl: 'generate-document.html',
})
export class GenerateDocumentPage {
  public Token: Token
  letterObj = {
    text: 'Lorem Ipsum is simply dummy text of the surname and typesetting industry. Lorem Ipsum has been the industry yours',
  }
  pdfObj = null
  currentLoggedIn = new Array();
  surname;
  firstname;
  email;
  id_number;
  id;
  base64String;
  token = new Array();
  AccessTokenKey;
  package_ID = new Array();
  navParamToken = new Array()
  displayToken = new Array();
  FileNameBinary = new Array();
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
    this.pdfObj = pdfMake.createPdf(docDefinition);
    console.log(this.pdfObj)
  }
  downloadPdf() {
    console.log(this.pdfObj)
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        console.log(buffer)
        var utf8 = new Uint32Array(buffer)
        console.log(utf8)
        var binaryArray = utf8.buffer;
        console.log(binaryArray)
       var base64String = buffer.toString('base64');
        console.log(base64String)
        this.base64String = base64String


        var base64data = Buffer.from('some binary data', 'binary').toString('base64');

console.log(base64data);
// ->  'c29tZSBiaW5hcnkgZGF0YQ=='

var originaldata = Buffer.from(base64data, 'base64');

console.log(originaldata);
// ->  <Buffer 73 6f 6d 65 20 62 69 6e 61 72 79 20 64 61 74 61>

console.log(originaldata.toString());
// ->  some binary data

        fetch(base64String)
.then(res => res.blob())
.then(blob => {
  console.log("here is your binary: ", blob)

  // now upload it
  // fetch(api, {method: 'POST', body: blob})
})
        var blob = new Blob([binaryArray], { type: 'application/pdf' });
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory,  this.base64String, blob, { replace: true }).then(fileEntry => {
          console.log(fileEntry)
          this.file.readAsBinaryString(this.file.dataDirectory,base64String ).then(fileEntryread => {
            console.log(fileEntryread)
            // Open the PDf with the correct OS tools
            // console.log(fileEntryread)
        
            var FileNameBinary = fileEntryread
            this.fileOpener.open(this.file.dataDirectory + this.base64String, 'application/pdf');
           




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
              var token = results.access_token
              console.log(token)
              var options = {
                'method': 'POST',
                'url': 'https://uatapi.signinghub.co.za/v3/packages',
                'headers': {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                },
                body: "{\r\n    \"package_name\": \"RWOPSmobile\"\r\n}"

              };
              console.log(token)



              request(options, function (error, response) {
                console.log(FileNameBinary)
                console.log(response)

                if (error) throw new Error(error);
                console.log(response)
                let packageId = JSON.parse(response.body);
                console.log(packageId)
                var package_ID = packageId.package_id


                console.log(package_ID)
                console.log(this.navParamToken)

                var options = {
                  'method': 'POST',
                  'url': 'https://uatapi.signinghub.co.za/v3/packages/' + package_ID + '/documents',
                  'headers': {
                    'Content-Type': 'application/octet-stream',
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'x-file-name': 'myletter.pdf',
                    'x-convert-document': 'true',
                    'x-source': 'API'



                  },
                  body: FileNameBinary

                };
                request(options, function (error, response) {
                  if (error) throw new Error(error);
                  let documentId = JSON.parse(response.body);
                  console.log(documentId);
                  var document_ID = documentId.documentid
                  console.log(document_ID)

                  // var options4 = {
                  //   'method': 'POST',
                  //   'url': 'https://uatapi.signinghub.co.za/v3/packages/' + package_ID + '/workflow/users',
                  //   'headers': {
                  //     'Authorization': 'Bearer ' + token,
                  //     'Content-Type': 'application/json',
                  //     'Accept': 'application/json',
                  //   },
                  //   body: "[{\r\n      \"user_email\": \"shservice2.gautenghealth@lt-shaccounts.co.za\",\r\n      \"user_name\": \"service manager\",\r\n      \"role\": \"SIGNER\",\r\n      \"email_notification\": true,\r\n      \"signing_order\": 1\r\n   }]"

                  // };
                  // request(options4, function (error, response) {
                  //   if (error) throw new Error(error);
                  //   console.log("workflow",response.body);
                });


                // var options5 = {
                //   'method': 'POST',
                //   'url': 'https://uatapi.signinghub.co.za/v3/packages/' + package_ID + '/documents/' + document_ID + '/fields/autoplace',
                //   'headers': {
                //     'Authorization': 'Bearer ' + token,
                //     'Content-Type': 'application/json',
                //     'Accept': 'application/json',
                //   },
                //   body: "\t\r\n\r\n{\r\n   \"search_text\": \"yours\",\r\n   \"placement\": \"TOP\",\r\n   \"order\": 1,\r\n   \"field_type\": \"ELECTRONIC_SIGNATURE\",\r\n   \"dimensions\": \r\n   {\r\n      \"width\": 150,\r\n      \"height\": 100\r\n   }\r\n}"

                // };
                // request(options5, function (error, response) {
                //   if (error) throw new Error(error);
                //   console.log("insertDocument",response.body);
                // });
                // });
              });
            });
          })
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
      console.log(this.base64String)
      this.pdfObj.getBuffer((buffer) => {
        var base64String = buffer.toString('base64');
        console.log(base64String)

        return new Promise((resolve, reject) => {
          var reader = new FileReader();
          reader.onloadend = (event) => {
              resolve(reader.result as string);
          };
          reader.onerror = (event) => {
              reject(reader.error);
          };
          reader.readAsBinaryString(base64String);
      });
      
      })

    }



  }
}
