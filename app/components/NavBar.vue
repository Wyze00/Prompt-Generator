<template>
  <nav class="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">CP</span>
            </div>
            <span class="text-xl font-bold text-gray-100">Command Prompt Generator</span>
          </NuxtLink>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="relative group/main">
            <button class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <span>Tools</span>
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div class="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover/main:opacity-100 group-hover/main:visible transition-all duration-200 border border-gray-700">
              <div class="py-1">
                <NavDropdownItem 
                  v-for="link in navStructure" 
                  :key="link.path" 
                  :item="link" 
                />
              </div>
            </div>
          </div>
          
          <NuxtLink to="/about" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-50">
            About
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { navStructure } from '../../data/navigation';
import NavDropdownItem from '~/components/NavDropdownItem.vue';
</script>