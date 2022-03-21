import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { Product } from 'src/models/product.Model';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  articles: Product[] = [];
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  newArticle: Product = <Product>{};



  error: boolean | undefined;

    productForm: FormGroup = this.fb.group({
      nom: [[], Validators.required],
      prix: [[], Validators.required],
      taille: [[], Validators.required],
      description: [[], Validators.required],
      statut: [[], Validators.required],
      categorie: [[], Validators.required],
      couleur: [[], Validators.required],
      image:[[], Validators.required],
    });

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private dataService: DataService,
    private storage: Storage,
    private plt: Platform,
    private toastController: ToastController
  ) {}



  ngOnInit(): void {
    // this.loadAll();
  }

  createProduct(){
    if(this.productForm.valid){
      const article: Product = {
        // id: this.productForm.get('id')?.value,
        id: Date.now(),
        nom: this.productForm.get('nom')?.value,
        taille: this.productForm.get('taille')?.value,
        prix: this.productForm.get('prix')?.value,
        description: this.productForm.get('description')?.value,
        infoSup : {
          statut: this.productForm.get('statut')?.value,
          categorie: this.productForm.get('categorie')?.value,
          couleur: this.productForm.get('couleur')?.value,
        },
        image: this.productForm.get('image')?.value
      };

      this.dataService.addArticle(article);
      // this.previousState();
      this.navCtrl.navigateRoot('');
   } else{this.error = true;}
  }

  clearError(){
    this.error = false;
  }

  previousState(){
    window.history.back();
  }
  ///////////////////////////////////////

}
