import { Component } from '@angular/core';
import { ParentAdviceComponent } from "../components/parent-advice/parent-advice.component";

@Component({
  selector: 'app-advices',
  imports: [ParentAdviceComponent],
  templateUrl: './advices.component.html',
  styleUrl: './advices.component.css'
})
export class AdvicesComponent {

}
