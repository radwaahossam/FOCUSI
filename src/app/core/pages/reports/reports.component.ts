import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  imports: [ CommonModule ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
expandedIndex: number | null = null;

  toggleExpand(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  reports = [
    {
      month: 'May 2025',
      totalTime: '155 minutes',
      focusScore: '75%',
      timeChange: '+25 mins from April',
      activityBreakdown: {
        stories: 60,
        games: 45,
        videos: 50,
        advice: 60
      },
      mostInteractive: 'Puzzle Game – Level 2',
      favoriteTopic: 'Shapes',
      leastEngaged: 'Advice videos',
      tasks: { completed: 18, total: 20 },
      averageDaily: '5.2 mins/day',
      notes: [
        'Consistent preference for visual content',
        'Suggested to reduce passive activities'
      ],
      recommendations: [
        'Add 1 new story per week',
        'Encourage offline play time'
      ]
    },
    {
      month: 'April 2025',
      totalTime: '130 minutes',
      focusScore: '80%',
      timeChange: '+30 mins from March',
      activityBreakdown: {
        stories: 40,
        games: 50,
        videos: 30,
        advice: 10
      },
      mostInteractive: 'Story: The Magic Forest',
      favoriteTopic: 'Colors',
      leastEngaged: 'Advice videos',
      tasks: { completed: 15, total: 18 },
      averageDaily: '4.3 mins/day',
      notes: [
        'Good improvement in game interaction',
        'Less interest in advice section'
      ],
      recommendations: [
        'Include more visual learning games',
        'Add parental interaction activities'
      ]
    }
  ];
}
