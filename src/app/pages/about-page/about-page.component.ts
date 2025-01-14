import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'about-page',
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AboutPageComponent {

}
