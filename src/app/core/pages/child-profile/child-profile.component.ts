
import { Component, OnInit } from '@angular/core';
import { ChildServiceService } from './../../services/child-service.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-child-profile',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './child-profile.component.html',
  styleUrl: './child-profile.component.css'
})

export class ChildProfileComponent implements OnInit {
  childData: any = null;
  isLoading = true;

showEditModal = false;
editData: any = {
  Name: '',
  Age: ''
};


editPictureFile: File | null = null;

constructor(private ChildServiceService: ChildServiceService, private router: Router ) {}

ngOnInit(): void {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.warn('❌ No token found. Redirecting to login.');
      this.router.navigate(['/auth/login']);
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
      console.log('✅ Child Profile Loaded');
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
  goToFeedback() {
    this.router.navigate(['/feedback']);
  }

openEditModal() {
  this.editData = {
    Name: this.childData?.name || '',
    Age: this.childData?.age || ''
  }; 
  this.editPictureFile = null;
  this.showEditModal = true;
}

closeEditModal() {
  this.showEditModal = false;
}

onSubmitEdit() {
  if (!this.editData.Name || this.editData.Name.trim() === '') {
    alert('Please enter a valid name');
    return;
  }

  const parsedAge = Number(this.editData.Age);
  if (!Number.isInteger(parsedAge) || parsedAge < 0) {
    alert('Please enter a valid age (integer >= 0)');
    return;
  }

  this.ChildServiceService.updateChildProfile(
    this.editData.Name.trim(),
    Math.floor(parsedAge),  
  ).subscribe({
    next: () => {
      alert('✅ Profile updated successfully');
      this.loadChildData();
      this.closeEditModal();
    },
    error: (err) => {
      console.error('❌ Error updating profile', err);
      alert('❌ Failed to update profile. Please try again.');
    }
  });
}

}