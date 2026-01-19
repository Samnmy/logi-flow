import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto pb-24">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>Home</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <span class="font-medium text-gray-900">Settings</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
        <p class="text-gray-500 mt-1 text-lg">Manage your account settings and operational preferences.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- General Settings Column -->
        <div class="lg:col-span-2 space-y-6">
            <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                <div class="flex items-center gap-3 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                    <h2 class="text-xl font-bold text-gray-900">General Settings</h2>
                </div>

                <div class="space-y-6">
                    <!-- Language -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">System Language</label>
                        <div class="relative">
                            <select class="block w-full pl-4 pr-10 py-3 text-base border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-900">
                                <option>English (US)</option>
                                <option>Spanish (ES)</option>
                                <option>French (FR)</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </div>
                        <p class="mt-2 text-sm text-gray-500">This will change the interface language for your dashboard.</p>
                    </div>

                    <!-- Timezone -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Timezone</label>
                        <div class="relative">
                            <select class="block w-full pl-4 pr-10 py-3 text-base border-gray-200 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-900">
                                <option>Eastern Time (US & Canada) (UTC-05:00)</option>
                                <option>Pacific Time (US & Canada) (UTC-08:00)</option>
                                <option>Central European Time (UTC+01:00)</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        </div>
                    </div>

                     <!-- Toggles -->
                    <div class="pt-4 border-t border-gray-100">
                        <div class="flex items-center justify-between py-4">
                            <div>
                                <h3 class="text-sm font-semibold text-gray-900">Email Notifications</h3>
                                <p class="text-sm text-gray-500">Receive daily summaries of shipment statuses.</p>
                            </div>
                            <!-- Toggle Active -->
                            <button class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600">
                                <span class="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                            </button>
                        </div>

                         <div class="flex items-center justify-between py-4">
                            <div>
                                <h3 class="text-sm font-semibold text-gray-900">Beta Features</h3>
                                <p class="text-sm text-gray-500">Enable experimental features in your dashboard.</p>
                            </div>
                            <!-- Toggle Inactive -->
                            <button class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200">
                                <span class="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Profile Column -->
        <div class="lg:col-span-1">
             <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-8 h-full">
                <div class="flex items-center gap-3 mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <h2 class="text-xl font-bold text-gray-900">Profile Information</h2>
                </div>

                <div class="flex items-center gap-4 mb-8">
                    <div class="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-400 text-2xl">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 18h.01"></path><path d="M7 16h-.01"></path><path d="M7 12h-.01"></path><path d="M7 8h-.01"></path><path d="M17 16h.01"></path><path d="M17 12h.01"></path><path d="M17 8h.01"></path><rect x="3" y="2" width="18" height="20" rx="2"></rect></svg>
                    </div>
                    <div>
                        <button class="text-sm font-semibold text-blue-600 hover:text-blue-700">Change Avatar</button>
                        <p class="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max 1MB.</p>
                    </div>
                </div>

                <div class="space-y-6">
                    <!-- Full Name -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </div>
                            <input type="text" value="Alex Morgan" class="block w-full pl-10 pr-3 py-3 border-gray-200 bg-gray-50 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500">
                        </div>
                    </div>

                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <input type="email" value="alex@logiflow.com" readonly class="block w-full pl-10 pr-3 py-3 border-gray-200 bg-gray-100 rounded-lg text-sm text-gray-500 cursor-not-allowed">
                        </div>
                    </div>

                    <!-- Role -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            </div>
                            <input type="text" value="Logistics Manager" readonly class="block w-full pl-10 pr-3 py-3 border-gray-200 bg-gray-100 rounded-lg text-sm text-gray-500 cursor-not-allowed">
                        </div>
                    </div>

                    <button class="w-full mt-4 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 2v6h6M21.5 22v-6h-6M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2"></path></svg>
                        Update Password
                    </button>
                </div>
             </div>
        </div>

      </div>

      <!-- Sticky Footer -->
      <div class="fixed bottom-0 right-0 left-0 md:left-64 bg-white border-t border-gray-200 p-4 flex justify-end gap-3 z-40">
           <button class="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">Cancel</button>
           <button class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
               Save Changes
           </button>
      </div>

    </div>
  `,
  styles: []
})
export class SettingsComponent {}
