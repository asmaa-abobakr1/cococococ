import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/interfaces';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() layout: 'grid' | 'compact' = 'grid'; // grid or compact
  @Output() addToCart = new EventEmitter<Product>();
  readonly fallbackImage = '/product-placeholder.svg';

  get productImageSrc(): string {
    return this.product?.img || this.fallbackImage;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (!img.src.endsWith(this.fallbackImage)) {
      img.src = this.fallbackImage;
    }
  }

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
