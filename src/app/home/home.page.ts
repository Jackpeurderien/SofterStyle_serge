import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonList, ModalController, NavController, ToastController } from '@ionic/angular';
import { Product } from 'src/models/product.Model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  articles: Product[] = [];
  newArticle: Product;
  // // eslint-disable-next-line @typescript-eslint/member-ordering
  // @ViewChild('mylist')mylist: IonList;

  constructor(
    private dataService: DataService,
    public navCtrl: NavController,
    private toastController: ToastController
    ) {}

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit() {
      this.loadAll();
      }

  loadAll(): void{
    // this.articles = this.dataService.getArticles();
    this.dataService.getProduct().then(articles => {
      this.articles = articles;
    });

  }
  goTo(id: number): void{
    this.navCtrl.navigateForward(`/home/${id}`);
  }
  goToNew(): void{
    this.navCtrl.navigateForward(`/new-product`);
    // return null;
  }

  }
