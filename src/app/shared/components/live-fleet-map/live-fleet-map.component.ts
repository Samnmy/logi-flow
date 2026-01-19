import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live-fleet-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Live Fleet Overview</h3>
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>

      <div class="relative w-full h-64 bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
        <!-- Abstract Map Background -->
        <svg class="absolute inset-0 w-full h-full text-slate-200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <!-- Simulated Roads/Rivers -->
            <path d="M0,100 Q150,150 300,50 T600,100" fill="none" class="stroke-slate-300" stroke-width="20" opacity="0.5"/>
            <path d="M100,0 Q120,200 300,300" fill="none" class="stroke-slate-300" stroke-width="15" opacity="0.5"/>
        </svg>

        <!-- Fleet Markers -->
        <div class="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
            <div class="bg-blue-500 text-white p-2 rounded-full shadow-lg ring-4 ring-blue-100 transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
            <div class="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                Truck #42
            </div>
        </div>

        <div class="absolute bottom-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
            <div class="bg-orange-500 text-white p-2 rounded-full shadow-lg ring-4 ring-orange-100 transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
             <div class="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                Truck #15 (Delay)
            </div>
        </div>
      </div>
    </div>
  `
})
export class LiveFleetMapComponent {}
