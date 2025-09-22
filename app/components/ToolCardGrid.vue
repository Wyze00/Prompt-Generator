<template>
  <div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <template v-for="(item, key) in data" :key="key">

        <NuxtLink v-if="isTool(item)" :to="`${basePath}/${key}`" class="card hover:border-green-500 transition-colors duration-200 group">
          <div class="flex items-center mb-3">
            <div class="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mr-3">
              <span class="font-mono text-green-400">{{ item.name.slice(0,1) }}</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-100 font-bold">{{ formatToolName(item.name) }}</h3>
              <span class="text-sm text-gray-400">{{ getToolSubtitle(item) }}</span>
            </div>
          </div>
        </NuxtLink>

      </template>
    </div>

    <template v-for="(item, key) in data" :key="key">
      <div v-if="!isTool(item)" class="mt-12">
        <h3 class="text-2xl font-bold text-gray-100 mb-6 uppercase border-b-2 border-gray-700 pb-2">
          Sub-Category: {{ key }}
        </h3>
        <ToolCardGrid
          :data="item"
          :base-path="`${basePath}/${key}`"
        />
      </div>
    </template>
  </div>
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

const getToolSubtitle = (item: ITool) => {
    return item.description;
}
</script>