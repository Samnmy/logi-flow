import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-sm font-medium text-gray-500">{{ title }}</h3>
        <div class="p-2 rounded-lg" [ngClass]="iconBgColor">
          <ng-content select="[icon]"></ng-content>
        </div>
      </div>
      
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-bold text-gray-900">{{ value }}</span>
        <span class="text-xs font-medium px-2 py-0.5 rounded-full"
          [ngClass]="trend > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
          <span *ngIf="trend > 0">↗</span>
          <span *ngIf="trend < 0">↘</span>
          {{ Math.abs(trend) }}%
        </span>
      </div>
    </div>
  `,
  styles: []
})
export class StatsCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = 0;
  @Input() trend: number = 0;
  @Input() iconContext: 'blue' | 'purple' | 'red' | 'green' = 'blue';

  get iconBgColor() {
    switch (this.iconContext) {
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'purple': return 'bg-purple-50 text-purple-600';
      case 'red': return 'bg-red-50 text-red-600';
      case 'green': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  }

  protected readonly Math = Math;
}
