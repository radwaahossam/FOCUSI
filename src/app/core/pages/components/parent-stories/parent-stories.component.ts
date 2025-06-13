
import { Component, OnInit } from '@angular/core';
import { StoryServiceService, Story } from './../../../services/story-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent-stories',
  imports: [ CommonModule ],
  templateUrl: './parent-stories.component.html',
  styleUrls: ['./parent-stories.component.css']
})
export class ParentStoriesComponent implements OnInit {
  stories: Story[] = [];
  isLoading = true;
  error = '';

  constructor(private storyService: StoryServiceService) {}

  ngOnInit(): void {
    this.storyService.getStories().subscribe({
      next: (data) => {
        console.log(data);
        this.stories = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load stories';
        this.isLoading = false;
      }
    });
  }

  openPDF(url: string): void {
    window.open(encodeURI(url), '_blank');
  }

}
