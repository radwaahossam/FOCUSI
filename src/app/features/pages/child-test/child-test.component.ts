import { Component } from '@angular/core';
import { ChildTestGameComponent } from "../child-test-game/child-test-game.component";

@Component({
  selector: 'app-child-test',
  imports: [ChildTestGameComponent],
  templateUrl: './child-test.component.html',
  styleUrl: './child-test.component.css'
})
export class ChildTestComponent {

}
