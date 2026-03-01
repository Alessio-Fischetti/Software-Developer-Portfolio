import { Component } from '@angular/core';
import { PcVersion } from '../pc-version/pc-version';

@Component({
  selector: 'home-component',
  imports: [PcVersion],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export class Home {
}
