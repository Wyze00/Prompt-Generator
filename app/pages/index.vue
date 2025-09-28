  <template>
    <div>
      <!-- Hero Section -->
      <section class="relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div class="text-center">
            <h1 class="text-4xl sm:text-6xl font-bold text-gray-100 mb-6">
              Command Prompt
              <span class="text-green-500">Generator</span>
            </h1>
            <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Generate and customize command-line tools with interactive options. Perfect for penetration testers, developers, and system administrators.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink :to="randomToolLink" class="btn-primary text-lg px-8 py-3">
                Try a Random Tool
              </NuxtLink>
              <a href="#available-tools" class="btn-secondary text-lg px-8 py-3">
                Browse Tools
              </a>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Features Section -->
      <section class="py-20 bg-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-center text-gray-100 mb-12">
            Why Use Command Prompt Generator?
          </h2>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="card">
              <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-100 mb-3">Interactive Configuration</h3>
              <p class="text-gray-400">
                Build commands visually with easy-to-use forms. No need to memorize complex syntax and parameters.
              </p>
            </div>
  
            <div class="card">
              <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-100 mb-3">Comprehensive Documentation</h3>
              <p class="text-gray-400">
                Every tool comes with detailed installation guides, usage examples, and best practices.
              </p>
            </div>
  
            <div class="card">
              <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-100 mb-3">Copy & Run</h3>
              <p class="text-gray-400">
                Generated commands are ready to copy and paste directly into your terminal for immediate use.
              </p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Tools Preview -->
      <section id="available-tools" class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold text-center text-gray-100 mb-25">
          AVAILABLE TOOLS
        </h1>
        
        <div class="space-y-16">
          <div v-for="category in toolCategories" :key="category.name">
            <h2 class="text-3xl font-bold text-gray-100 mb-8 uppercase text-center">
              {{ category.name }}
            </h2>
            <ToolCardGrid
              :data="category.data"
              :base-path="category.basePath"
            />
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { toolCategories } from '~~/data/tools';
import ToolCardGrid from '~/components/ToolCardGrid.vue';

const randomToolLink: globalThis.Ref<string, string | undefined> = ref('/recon/dig');

onMounted(() => {
  const allLinks: string[] = [];
  toolCategories.forEach(category => {
    Object.keys(category.data).forEach(toolKey => {
      if (category.data[toolKey]!.command) {
        allLinks.push(`${category.basePath}/${toolKey}`);
      }
    });
  });

  if (allLinks.length > 0) {
    const randomIndex = Math.floor(Math.random() * allLinks.length);
    randomToolLink.value = allLinks[randomIndex];
  }
});

useHead({
  title: 'Command Prompt Generator'
});
</script>