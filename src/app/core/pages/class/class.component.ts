import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-class',
  imports: [ CommonModule, RouterLink ],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {
  constructor(private location: Location) {}

  ngOnInit() {
    this.location.replaceState('/main/class'); 
    history.pushState(null, '', window.location.href);
    
    window.onpopstate = () => {
      history.pushState(null, '', window.location.href);
    };
  }

  public animatedText = 'Welcome to your class these options to improve your concentration please select any option';

  get firstLine() {
    return this.animatedText.split(' ').slice(0, 4).join(' '); 
  }
  
  get secondLine() {
    return this.animatedText.split(' ').slice(4, 10).join(' '); 
  }
  
  get thirdLine() {
    return this.animatedText.split(' ').slice(10).join(' '); 
  }
  
  get firstLineArray() {
    return this.firstLine.split(''); 
  }
  
  get secondLineArray() {
    return this.secondLine.split(''); 
  }
  
  get thirdLineArray() {
    return this.thirdLine.split('');
  }
}
