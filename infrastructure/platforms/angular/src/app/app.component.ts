import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './components/datatable/datatable.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterModule, 
    HeaderComponent,
    CommonModule,
    DatatableComponent,
  ],
})
export class AppComponent {
  title = 'angular';
}
