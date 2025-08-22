import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectHomeComponent } from './Components/project-home/project-home.component';
import { ProjectFormComponent } from './Components/project-form/project-form.component';

const routes: Routes = [
  { path: '', component: ProjectHomeComponent },
  { path: 'create', component: ProjectFormComponent },
  { path: ':id/edit', component: ProjectFormComponent },
  {
    path: ':id/tasks',
    loadChildren: () =>
      import('../Tasks/tasks.module').then((m) => m.TasksModule), // Lazy load
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
