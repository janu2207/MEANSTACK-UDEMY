import {NgModule} from '@angular/core';

import {MatInputModule,
  MatExpansionModule,
   MatCardModule, MatToolbarModule, MatButtonModule,
    MatProgressSpinnerModule, MatPaginatorModule,
    MatDialogModule} from '@angular/material'
@NgModule({
  imports : [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
  ]
})
export class AngularMaterialModule{}
