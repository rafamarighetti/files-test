import { Component, OnInit } from '@angular/core';
import { File } from '../../models/file.model';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css'],
})
export class FilesListComponent implements OnInit {
  files?: File[];
  currentFile: File = {};
  currentIndex = -1;
  title = '';

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.retrieveFiles();
  }

  retrieveFiles(): void {
    this.fileService.getAll().subscribe({
      next: (data) => {
        this.files = data;
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveFiles();
    this.currentFile = {};
    this.currentIndex = -1;
  }

  setActiveFile(file: File, index: number): void {
    this.currentFile = file;
    this.currentIndex = index;
  }

  removeAllFiles(): void {
    this.fileService.deleteAll().subscribe({
      next: (res) => {
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchTitle(): void {
    this.currentFile = {};
    this.currentIndex = -1;

    this.fileService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.files = data;
      },
      error: (e) => console.error(e)
    });
  }
}
