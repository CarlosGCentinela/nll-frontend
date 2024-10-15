import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './app/Core/Pages/LandingPage/LandingPage.component';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter([
      { path: '', component: LandingPageComponent },
    ]),
    provideAnimations()
  ]
}).catch(err => console.error(err));