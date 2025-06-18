import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-test-choose',
  imports: [ CommonModule, RouterLink ],
  templateUrl: './test-choose.component.html',
  styleUrl: './test-choose.component.css'
})
export class TestChooseComponent {

    public animatedText = 'Child will open the camera in these tests, choose any option to do ';

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
