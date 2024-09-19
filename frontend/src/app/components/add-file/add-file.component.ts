import { Component } from '@angular/core';
import { File } from '../../models/file.model';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css'],
})
export class AddFileComponent {
  file: File = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private fileService: FileService) {}

  saveFile(): void {
    const data = {
      title: this.file.title,
      description: this.file.description
    };

    this.fileService.create(data).subscribe({
      next: (res) => {
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newFile(): void {
    this.submitted = false;
    this.file = {
      title: '',
      description: '',
      published: false
    };
  }
}
