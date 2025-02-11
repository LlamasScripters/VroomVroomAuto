// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    // Fournit HttpClient et intègre automatiquement les intercepteurs si vous en avez enregistrés via DI.
    provideHttpClient(withInterceptorsFromDi())
    // Si vous n'utilisez pas d'intercepteurs, vous pouvez simplement utiliser :
    // provideHttpClient()
  ]
});
