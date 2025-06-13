import { Component } from '@angular/core';
import { ParentStoriesComponent } from "../components/parent-stories/parent-stories.component";

@Component({
  selector: 'app-stories',
  imports: [ParentStoriesComponent],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.css'
})
export class StoriesComponent {

}
