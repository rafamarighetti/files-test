import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from '../../models/file.model';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css'],
})
export class FileDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentFile: File = {
    title: '',
    description: '',
    published: false
  };

  message = '';

  constructor(
    private fileService: FileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getFile(this.route.snapshot.params['id']);
    }
  }

  getFile(id: string): void {
    this.fileService.get(id).subscribe({
      next: (data) => {
        this.currentFile = data;
      },
      error: (e) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentFile.title,
      description: this.currentFile.description,
      published: status
    };

    this.message = '';

    this.fileService.update(this.currentFile.id, data).subscribe({
      next: (res) => {
        this.currentFile.published = status;
        this.message = res.message
          ? res.message
          : 'O status foi alterado com sucesso!';
      },
      error: (e) => console.error(e)
    });
  }

  updateFile(): void {
    this.message = '';

    this.fileService
      .update(this.currentFile.id, this.currentFile)
      .subscribe({
        next: (res) => {
          this.message = res.message
            ? res.message
            : 'Item atualizado com sucesso!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteFile(): void {
    this.fileService.delete(this.currentFile.id).subscribe({
      next: (res) => {
        this.router.navigate(['/files']);
      },
      error: (e) => console.error(e)
    });
  }
}
