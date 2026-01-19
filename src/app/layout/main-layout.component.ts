import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, TopbarComponent],
  template: `
    <div class="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <app-sidebar></app-sidebar>
      
      <div class="flex-1 flex flex-col ml-64 transition-all duration-300">
        <app-topbar></app-topbar>
        
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class MainLayoutComponent {}
