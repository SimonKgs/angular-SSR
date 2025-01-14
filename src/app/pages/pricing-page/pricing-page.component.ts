import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PricingPageComponent {

  private title = inject(Title)
  private meta = inject(Meta)
  private platform = inject(PLATFORM_ID)

  ngOnInit(): void {
    // It makes a difference between the server and the browser dont use
    // if( isPlatformBrowser(this.platform) ){
    //   document.title = 'Pricing Page';
    // }
    
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({ name: 'description', content: 'Pricing Page' });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
    this.meta.updateTag({ name: 'keywords', content: 'SSR ANGULAR PAGE' });
  }
}
