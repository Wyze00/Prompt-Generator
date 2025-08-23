<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center text-sm text-gray-400 mb-2">
        <NuxtLink to="/" class="hover:text-green-400">Home</NuxtLink>
        <span class="mx-2">/</span>
        <span>Reconnaissance</span>
        <span class="mx-2">/</span>
        <span class="text-green-400">dig</span>
      </div>
      <h1 class="text-4xl font-bold text-gray-100">dig Command Generator</h1>
      <p class="text-xl text-gray-300 mt-2">DNS lookup utility for querying name servers</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Content Sections -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Overview -->
        <section class="card">
          <h2 class="section-title">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Overview
          </h2>
          <p class="text-gray-300 mb-4">
            The <code class="bg-gray-700 px-2 py-1 rounded text-green-400">dig</code> (Domain Information Groper) command is a network administration command-line tool for querying Domain Name System (DNS) name servers. It performs DNS lookup and displays the answers that are returned from the name servers.
          </p>
          <p class="text-gray-300">
            dig is useful for troubleshooting DNS problems and performing DNS lookups. It can query various DNS record types including A, AAAA, MX, NS, TXT, and more.
          </p>
        </section>

        <!-- Installation -->
        <section class="card">
          <h2 class="section-title">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
            Installation
          </h2>
          
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-200 mb-2">Ubuntu/Debian</h3>
              <div class="code-block relative group">
                <code class="text-green-400">sudo apt install dnsutils</code>
                <button @click="copyToClipboard('sudo apt install dnsutils')" class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 p-1 rounded">
                  <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-200 mb-2">CentOS/RHEL/Fedora</h3>
              <div class="code-block relative group">
                <code class="text-green-400">sudo yum install bind-utils</code>
                <button @click="copyToClipboard('sudo yum install bind-utils')" class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 p-1 rounded">
                  <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-200 mb-2">macOS</h3>
              <div class="code-block relative group">
                <code class="text-green-400">brew install bind</code>
                <button @click="copyToClipboard('brew install bind')" class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 p-1 rounded">
                  <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Usage -->
        <section class="card">
          <h2 class="section-title">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            Usage Examples
          </h2>
          
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-200 mb-2">Basic DNS Lookup</h3>
              <div class="code-block relative group">
                <code class="text-green-400">dig example.com</code>
                <button @click="copyToClipboard('dig example.com')" class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 p-1 rounded">
                  <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-200 mb-2">Query Specific Record Type</h3>
              <div class="code-block relative group">
                <code class="text-green-400">dig example.com MX</code>
                <button @click="copyToClipboard('dig example.com MX')" class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 p-1 rounded">
                  <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold text-gray-200 mb-2">Short Answer</h3>
              <div class="code-block relative group">
                <code class="text-green-400">dig +short example.com</code>
                <button @click="copyToClipboard('dig +short example.com')" class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 p-1 rounded">
                  <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Prompt Maker -->
      <div class="lg:col-span-1">
        <DigPromptMaker @commandGenerated="handleCommandGenerated" />
      </div>
    </div>

    <!-- Generated Command -->
    <div v-if="generatedCommand" class="mt-8">
      <div class="card">
        <h3 class="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
          Generated Command
        </h3>
        <div class="code-block relative group">
          <code class="text-green-400">{{ generatedCommand }}</code>
          <button @click="copyToClipboard(generatedCommand)" class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 p-2 rounded hover:bg-gray-600">
            <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const generatedCommand = ref('')

const handleCommandGenerated = (command) => {
  generatedCommand.value = command
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    // You could add a toast notification here
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

useHead({
  title: 'dig Command Generator - Command Prompt Maker',
  meta: [
    { name: 'description', content: 'Generate dig commands with interactive options. DNS lookup utility for querying name servers.' }
  ]
})
</script>