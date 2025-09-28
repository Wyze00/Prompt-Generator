<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-dvh">
    <div class="card">
      <h1 class="text-4xl font-bold text-gray-100 mb-6">Enumertion Tools</h1>
      
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
        base-path="/enumeration"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import ToolList from '~/components/ToolList.vue';
import { enumeration } from '~~/data/enumeration'; 
import type { ITool } from '~~/types/interfaces';
import type { Tools } from '~~/types/tools';

useHead({
  title: 'Enumertion Tools'
});

const searchQuery = ref('');

const filterData = (data: Tools, query: string): Tools => {
  const lowerCaseQuery = query.toLowerCase().trim();
  if (!lowerCaseQuery) {
    return data;
  }

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
    } 
    else if (item && typeof item === 'object') {
      const filteredSubCategory = filterData(item as Tools, query);
      if (Object.keys(filteredSubCategory).length > 0) {
        result[key] = filteredSubCategory;
      }
    }
  }

  return result;
};

const filteredTools = computed(() => {
  return filterData(enumeration, searchQuery.value);
});
</script>