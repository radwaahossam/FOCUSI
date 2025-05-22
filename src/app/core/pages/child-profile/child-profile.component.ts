
import { Component, OnInit } from '@angular/core';
import { ChildServiceService } from './../../services/child-service.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-child-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './child-profile.component.html',
  styleUrl: './child-profile.component.css'
})

export class ChildProfileComponent implements OnInit {
  childData: any = null;
  isLoading = true;

  showEditModal = false;
  editData: any = {}; // لتعديل البيانات مؤقتًا

  constructor(private ChildServiceService: ChildServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadChildData();
  }

  loadChildData() {
    this.isLoading = true;
    this.ChildServiceService.getChildProfile().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (data) => {
        this.childData = data;
      },
      error: (err) => {
        console.error('Error loading child profile', err);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadPhoto(file);
    }
  }

  uploadPhoto(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.childData.photoUrl = reader.result as string;
      this.ChildServiceService.saveChildProfile(this.childData).subscribe();

      // هنا ممكن تضيفي call ل API لرفع الصورة فعليًا
    };
    reader.readAsDataURL(file);
  }

  openEditModal() {
    this.editData = { ...this.childData }; 
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  goToFeedback() {
    this.router.navigate(['/feedback']);
  }
  

  saveProfile() {
    this.ChildServiceService.saveChildProfile(this.editData).subscribe({
      next: (updatedData) => {
        this.childData = updatedData;
        this.showEditModal = false;
      },
      error: (err) => {
        console.error('Error saving profile', err);
      }
    });
  }
}



