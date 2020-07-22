import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateMemberPage } from './update-member.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateMemberPageRoutingModule {}
