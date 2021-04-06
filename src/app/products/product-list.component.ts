import {Component, OnInit} from '@angular/core';
import {IProduct} from './product';
import {ProductService} from './product.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService) {
  }

  // tslint:disable-next-line:component-selector
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin: number = 2; // type not required for static variables
  showImage = false;
  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct [] = [];
  products: IProduct[] = [];

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
    // this.listFilter = 'cart';
  }

  performFilter = (filterBy: string): IProduct[] => {
    return this.products.filter(
      (product: IProduct) => product.productName.toLowerCase().includes(filterBy.toLowerCase())
    );
  }

  toggleImage = (): void => {
    this.showImage = !this.showImage;
  }

  onRatingClicked = (message: string): void => {
    this.pageTitle = `Product List: ${message}`;
  }
}
