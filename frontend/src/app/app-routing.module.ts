import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesListComponent } from './components/files-list/files-list.component';
import { FileDetailsComponent } from './components/file-details/file-details.component';
import { AddFileComponent } from './components/add-file/add-file.component';

const routes: Routes = [
  { path: '', redirectTo: 'files', pathMatch: 'full' },
  { path: 'files', component: FilesListComponent },
  { path: 'files/:id', component: FileDetailsComponent },
  { path: 'add', component: AddFileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
