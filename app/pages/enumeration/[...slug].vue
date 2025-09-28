<template>
  <div v-if="tool">
    <ToolPageLayout :tool="tool" :key="route.path" />
  </div>
  <div v-else class="text-center p-8 min-h-dvh">
    <h1 class="text-2xl text-red-400">Tool tidak ditemukan.</h1>
    <p class="text-gray-400">URL Path: /enumeration/{{ slugParts.join('/') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { enumeration } from '~~/data/enumeration';
import ToolPageLayout from '~/components/ToolPageLayout.vue';
import type { ITool } from '~~/types/interfaces';

const route = useRoute();
const slugParts = route.params.slug as string[];
let tool: ITool | null = null;

if (slugParts.length === 1) {
  const toolName = slugParts[0] as keyof typeof enumeration;
  const found = enumeration[toolName];
  if (found && !found.hasOwnProperty('name')) { 
    tool = null;
  } else {
    tool = found as ITool;
  }

} else if (slugParts.length === 2) {
  const category = slugParts[0] as keyof typeof enumeration;
  const toolName: string = slugParts[1] as string;

  if (enumeration[category] && typeof enumeration[category] === 'object') {
    tool = (enumeration[category] as any)[toolName];
  }
}

useHead({
  title: tool ? `${tool.name.slice(0,1).toUpperCase() + tool.name.slice(1)} Generator` : 'Tool Not Found'
});
</script>