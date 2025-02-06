import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-datatable',
  standalone: true,
  templateUrl: './datatable.component.html',
  imports: [
    TableModule,
    ProgressBarModule,
    ButtonModule,
    TagModule
  ],
})
export class DatatableComponent {
  customers = [
    {
      id: 1,
      name: "James Butt",
      country: { name: "Algeria", code: "dz" },
      representative: { name: "Ioni Bowcher", image: "ionibowcher.png" },
      status: "unqualified",
      activity: 17
    },
    {
      id: 2,
      name: "Sage Wieser",
      country: { name: "Egypt", code: "eg" },
      representative: { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
      status: "unqualified",
      activity: 40
    },
    {
      id: 3,
      name: "Mitsue Tollner",
      country: { name: "Paraguay", code: "py" },
      representative: { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
      status: "renewal",
      activity: 70
    },
    {
      id: 4,
      name: "Leota Dilliard",
      country: { name: "Serbia", code: "rs" },
      representative: { name: "Onyama Limba", image: "onyamalimba.png" },
      status: "renewal",
      activity: 100
    },
    {
      id: 5,
      name: "Art Venere",
      country: { name: "Panama", code: "pa" },
      representative: { name: "Asiya Javayant", image: "asiyajavayant.png" },
      status: "qualified",
      activity: 30
    }
  ];

  getSeverity(status: string) {
    switch (status) {
      case "unqualified":
        return "danger";
      case "renewal":
        return "success";
      case "qualified":
        return "info";
      default:
        return "secondary";
    }
  }
}
