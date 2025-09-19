<template>
  <nav class="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">CP</span>
            </div>
            <span class="text-xl font-bold text-gray-100">Command Prompt Maker</span>
          </NuxtLink>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="relative group">
            <button class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Tools
            </button>
            <div class="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div class="py-1">
                <div class="px-4 py-2 text-sm text-gray-400 font-medium">Reconnaissance</div>
                <NuxtLink 
                  to="/recon/dig" 
                  class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  dig
                </NuxtLink>
              </div>
              <div class="px-4 py-2 text-sm text-gray-400 font-medium">Enumeration</div>
              <NuxtLink 
                to="/enumeration/gobuster" 
                class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                gobuster
              </NuxtLink>
            </div>
          </div>
          
          <NuxtLink 
            to="/about" 
            class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            About
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>