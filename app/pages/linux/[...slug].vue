<template>
  <div v-if="content.type === 'category'" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-dvh">
    <div class="card">
      <h1 class="text-4xl font-bold text-gray-100 mb-6">{{ title }}</h1>
      
      <div class="mb-8">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari tool berdasarkan nama atau deskripsi..."
          class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
        />
      </div>

      <ToolList 
        :data="filteredTools" 
        :base-path="basePath"
      />
    </div>
  </div>

  <div v-else-if="content.type === 'tool'">
    <ToolPageLayout :tool="content.data" :key="route.path"/>
  </div>

  <div v-else class="text-center p-8 min-h-dvh">
    <h1 class="text-2xl text-red-400">Konten tidak ditemukan.</h1>
    <p class="text-gray-400">URL Path: /linux/{{ slugParts.join('/') }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import ToolList from '~/components/ToolList.vue';
import ToolPageLayout from '~/components/ToolPageLayout.vue';
import { linux } from '~~/data/linux'; 
import type { Tools } from '~~/types/tools';
import type { ITool } from '~~/types/interfaces';

const route = useRoute();
const searchQuery = ref('');
const slugParts = computed(() => (route.params.slug as string[] || []));

const getContentFromSlug = () => {
  let current: any = linux;
  for (const part of slugParts.value) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return { type: 'not-found', data: null };
    }
  }
  
  if (current && typeof current === 'object') {
    if ('command' in current) {
      return { type: 'tool', data: current as ITool };
    }
    return { type: 'category', data: current as Tools };
  }

  return { type: 'not-found', data: null };
};

const content = computed(getContentFromSlug);

// Judul halaman dinamis
const title = computed(() => {
  if (content.value.type === 'category') {
      const name = slugParts.value.length > 0 ? slugParts.value[slugParts.value.length - 1] : 'Linux';
      return `${name!.charAt(0).toUpperCase() + name!.slice(1)} Tools`;
  }
  if (content.value.type === 'tool') {
      const toolName = content.value.data!.name as string;
      return `${toolName.charAt(0).toUpperCase() + toolName.slice(1)} Generator`;
  }
  return 'Not Found';
});

// Base path dinamis untuk link
const basePath = computed(() => {
  // Filter slug yang kosong untuk menghindari double slash
  const validSlugs = slugParts.value.filter(p => p);
  if (validSlugs.length === 0) {
    return '/linux';
  }
  return `/linux/${validSlugs.join('/')}`;
});

useHead({
  title: title.value
});

// Logika filter yang sudah ada
const filterData = (data: Tools, query: string): Tools => {
  const lowerCaseQuery = query.toLowerCase().trim();
  if (!lowerCaseQuery) return data;
  const result: Tools = {};
  for (const key in data) {
    const item = data[key];
    if (item && 'command' in item) {
      const tool = item as ITool;
      if (
        tool.name.toLowerCase().includes(lowerCaseQuery) ||
        tool.description.toLowerCase().includes(lowerCaseQuery)
      ) {
        result[key] = tool;
      }
    } else if (item && typeof item === 'object') {
      const filteredSub = filterData(item as Tools, query);
      if (Object.keys(filteredSub).length > 0) {
        result[key] = filteredSub;
      }
    }
  }
  return result;
};

const filteredTools = computed(() => {
  if (content.value.type === 'category') {
    return filterData(content.value.data, searchQuery.value);
  }
  return {};
});

</script>