import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { HeaderComponent } from './components/header/header.component';
import { DatatableComponent } from './components/datatable/datatable.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterModule, 
    HeaderComponent,
    DatatableComponent
  ],
})
export class AppComponent {
  title = 'angular';
}
