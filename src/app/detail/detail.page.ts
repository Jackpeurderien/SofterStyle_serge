import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { Product } from 'src/models/product.Model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
    // productDetail: Product;

    articles: Product;
    newArticle: Product;

    // images: string[];
  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(param =>
      {
        const id=+param.get('id');
        // this.productDetail=this.getArticles(id);
        // this.articles = this.getArticles(id);
        this.getArticles(id);

      });
  }

getArticles(id: number): Product {
  console.log(id);
  this.dataService.getArticleById(id).then(tokeep => {
    this.articles= tokeep;
  });
  return this.articles;
  // return this.dataService.getArticleById(id);

}
// goToH(): void{
//   this.navCtrl.navigateForward(`/home`);
// }

addProduct() {
  this.newArticle.id = Date.now();
  this.dataService.addProduct(this.newArticle).then(article => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.newArticle = <Product>{};
    this.articles= article;
    this.showToast('Article added!');
    // this.loadAll();
    this.loadProduct();
  });
}

loadProduct(){
  this.dataService.getProduct().then(article => {
    this.articles = this.articles;
  });
}


updateProduct(article: Product){
  this.dataService.updateProduct(article);
  this.showToast('Article updated!');
}

deleteProduct(article: Product){
  this.dataService.deleteProduct(article.id);
  this.showToast('Article removed!');
  // this.loadAll();
  this.loadProduct();
  this.navCtrl.navigateRoot('');

}

async showToast(msg){
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}

}
