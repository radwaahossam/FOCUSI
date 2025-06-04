
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
  editData: any = {}; 

constructor(private ChildServiceService: ChildServiceService, private router: Router ) {}

ngOnInit(): void {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.warn('❌ No token found. Redirecting to login.');
      this.router.navigate(['/login']);
      return;
    }
    this.loadChildData();
  }
}

loadChildData() {
  this.isLoading = true;
  this.ChildServiceService.getChildProfile().pipe(
    finalize(() => this.isLoading = false)
  ).subscribe({
    next: (data) => {
     if (data.pictureUrl) {
  data.photoUrl = data.pictureUrl + '?t=' + new Date().getTime(); 
}

      this.childData = data;
      console.log('✅ Child Profile Loaded:', data);
    },
    error: (err) => {
      console.error('Error loading child profile', err);
    }
  });
}

uploadPhoto(file: File) {
  const sanitizedFileName = this.sanitizeFileName(file.name);
  const cleanFile = new File([file], sanitizedFileName, { type: file.type });

  this.ChildServiceService.addProfilePicture(cleanFile).subscribe({
    next: () => {
      alert('Photo uploaded successfully');
      this.loadChildData();
    },
    error: (err) => {
      console.error('Error uploading photo', err);
    }
  });
}

sanitizeFileName(name: string): string {
  const timestamp = Date.now();
  const extension = name.substring(name.lastIndexOf('.') + 1);
  return `profile_${timestamp}.${extension}`;
}


onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.uploadPhoto(file);
  }
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
}



