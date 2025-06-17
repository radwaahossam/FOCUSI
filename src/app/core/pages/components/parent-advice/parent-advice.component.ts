
import { Component, OnInit } from '@angular/core';
import { AdviceService } from '../../../services/services/advice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent-advice',
  imports: [ CommonModule ],
  templateUrl: './parent-advice.component.html',
  styleUrls: ['./parent-advice.component.css']
})
export class ParentAdviceComponent implements OnInit {

  adviceList: string[] = [];
  isLoading = true;

  constructor(private adviceService: AdviceService) {}

  ngOnInit(): void {
    this.adviceService.getAdviceList().subscribe({
  next: (advice) => {
    this.adviceList = advice;
    this.isLoading = false;
  },
  error: (err) => {
    console.error('Error loading advice:', err);
    this.isLoading = false;
  }
});
  }
}

