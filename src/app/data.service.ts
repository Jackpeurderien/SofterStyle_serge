import { Injectable } from '@angular/core';
import { Product } from 'src/models/product.Model';
// import { __values } from 'tslib';
import { Storage } from '@ionic/storage';



const ARTICLES_KEY = 'my-items';

@Injectable({
  providedIn: 'root'
})


export class DataService {

   article: Product[] = [
//     {
//       id: 1,
//       nom: 'Chemise',
//       prix: 6,
//       taille: 25,
//       description: 'Lorem ipsum dolor sit, amet consectetur dolore, possimus laudantium veniam officia',
//       infoSup:  {
//       statut: 'Indisponible',
//       categorie: 'Homme',
//       couleur:'rouge'
//       },
//       image: 'assets/images/product1/1.jpg',
//    },
//        {
//              id: 2,
//               nom: 'Chaussure',
//               prix: 10,
//               taille: 25,
//               description: 'Lorem ipsum dolor sit, amet consectetur dolore, possimus laudantium veniam officia',
//               infoSup:  {
//                 statut: 'Disponible',
//                 categorie: 'Femme',
//                 couleur:'rouge'
//               },
//               image: 'assets/images/product2/2.jpg',
//             },
//             {
//               id: 3,
//               nom: 'Casquette',
//               prix: 30,
//               taille: 25,
//               description: 'Lorem ipsum dolor sit, amet consectetur dolore, possimus laudantium veniam officia',
//               infoSup:  {
//                 statut: 'Indisponible',
//                 categorie: 'Homme',
//                 couleur:'rouge'
//               },
//               image: 'assets/images/product3/3.jpg',
//             },
//             {
//               id: 4,
//               nom: 'Robe',
//               prix: 30,
//               taille: 25,
//               description: 'Lorem ipsum dolor sit, amet consectetur dolore, possimus laudantium veniam officia',
//               infoSup:  {
//                 statut: 'Disponible',
//                 categorie: 'Femme',
//                 couleur:'rouge'
//               },
//               image: 'assets/images/product4/4.jpg'
//             },
//             {
//               id: 5,
//               nom: 'Pantalon',
//               prix: 5,
//               taille: 25,
//               description: 'Lorem ipsum dolor sit, amet consectetur dolore, possimus laudantium veniam officia',
//               infoSup:  {
//                 statut: 'Indisponible',
//                 categorie: 'Homme',
//                 couleur:'rouge'
//               },
//               image: 'assets/images/product5/5.jpg'
//  }

  ];


  constructor(
    public storage: Storage,
 ) { this.init();}

  init(){
   this.storage.create();
  }
  ////////////////////////////////////////////////
  addProduct(article: Product): Promise<any> {
    return this.storage.get(ARTICLES_KEY).then((articles: Product[]) => {
     if (articles) {
      //  article.id = this.getId();
       articles.push(article);
      return this.storage.set(ARTICLES_KEY, articles);
     } else{
       return this.storage.set(ARTICLES_KEY, [article]);
     }
    }).then(() => {
      window.location.reload();
      window.location.reload();
    });
  }

  getProduct(): Promise<Product[]>{
    return this.storage.get(ARTICLES_KEY);
  }

  updateProduct(article: Product){
    return this.storage.get(ARTICLES_KEY).then((articles: Product[]) => {
      if (!articles || articles.length === 0) {
        return null;
      }
      const newArticles: Product[] = [];

      for (const i of articles ){
        if ( i.id === article.id) {
          newArticles.push(article);
        } else {
          newArticles.push(i);
        }
      }
      return this.storage.set(ARTICLES_KEY, newArticles);
  }).then(() => {
    window.location.reload();
  });
}

deleteProduct(id: number): Promise<any> {
  return this.storage.get(ARTICLES_KEY).then((articles: Product[]) =>{
    if (!articles || articles.length ===0) {
      return null;
    }
    const toKeep: Product[] = [];

    for (const i of articles){
      if (i.id !== id) {
        toKeep.push(i);
      }
    }
    return this.storage.set(ARTICLES_KEY, toKeep);
  }).then(() => {
    window.location.reload();
  });
}



  ////////////////////////////////////////////////

  getArticles(): Promise<Product>{
  //  return [... this.articles];
  return this.storage.get(ARTICLES_KEY);
  }

  getArticleById(id: number): Promise <Product> {
    return this.storage.get(ARTICLES_KEY).then((articles: Product[]) =>{
      if (!articles || articles.length === 0) {
        return null;
      }
    let toKeep: Product;

      for (const i of articles){
        if (i.id === id) {
          toKeep=i;
        }
      }
      return toKeep;
    });
  }

  // getArticleById(id: number): Product | undefined{
  //   const article = this.article.find(value => value.id === id);
  //   return article;
  // }


  // addArticle(article: Product): void {
  //   article.id = this.getId();
  //   this.articles.push(article);
  //   console.log(this.articles);
  // }

  addArticle(article: Product): Promise<any>{
    return this.storage.get(ARTICLES_KEY).then((articles: Product[]) => {
      if(articles){
        // article.id = this.getId();
        articles.push(article);
        return this.storage.set(ARTICLES_KEY, articles);
      } else{
        return this.storage.set(ARTICLES_KEY, [article]);
      }
    }).then(() => {
      window.location.reload();
    });
  }

 private getId(): number{
  let idMax= 0;
  this.article.forEach(article => {
    if(article.id && article.id > idMax){
      idMax =article.id;
    }
  });
  return idMax+1;
}

}
