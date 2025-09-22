<template>
  <ul class="space-y-2 list-disc list-inside">
    <template v-for="(item, key) in data" :key="key">
      
      <li v-if="isTool(item)">
        <NuxtLink 
          :to="`${basePath}/${key}`" 
          class="text-green-400 hover:text-green-300 hover:underline font-bold"
        >
          {{ formatToolName(item.name) }}
        </NuxtLink>
        <p class="text-sm text-gray-400 ml-6">{{ item.description }}</p>
      </li>

      <li v-else class="list-none mt-6">
        <h2 class="text-2xl font-extrabold text-gray-100 mb-2 uppercase">{{ key }}</h2>
        
        <ToolList
          :data="item"
          :base-path="`${basePath}/${key}`"
        />
      </li>

    </template>
  </ul>
</template>

<script setup lang="ts">
import type { ITool } from '../../types/interfaces';

defineProps<{
  data: Record<string, any>;
  basePath: string;
}>();

const isTool = (item: any): item is ITool => {
  return item && typeof item === 'object' && 'command' in item;
};

const formatToolName = (name: string | undefined) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1);
};
</script>