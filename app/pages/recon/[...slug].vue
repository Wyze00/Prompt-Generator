<template>
  <div v-if="tool">
    <ToolPageLayout :tool="tool" :key="route.path"/>
  </div>
  <div v-else class="text-center p-8">
    <h1 class="text-2xl text-red-400">Tool tidak ditemukan.</h1>
    <p class="text-gray-400">URL Path: /recon/{{ slugParts.join('/') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { recon } from '../../../data/recon'; // Impor dari index recon
import ToolPageLayout from '~/components/ToolPageLayout.vue';
import type { ITool } from '../../../types/interfaces';

const route = useRoute();
const slugParts = route.params.slug as string[];
let tool: ITool | null = null;

// Logika untuk mencari tool berdasarkan panjang array slug
if (slugParts.length === 1) {
  // Kasus: /recon/dig
  const toolName = slugParts[0] as keyof typeof recon;
  const found = recon[toolName];
  // Pastikan yang ditemukan bukan kategori
  if (found && !found.hasOwnProperty('name')) { 
    tool = null; // Ini adalah objek kategori, bukan tool
  } else {
    tool = found as ITool;
  }

} else if (slugParts.length === 2) {
  // Kasus: /recon/dns/tool1
  const category = slugParts[0] as keyof typeof recon;
  const toolName: string = slugParts[1] as string;

  // Cek apakah kategori ada dan merupakan objek
  if (recon[category] && typeof recon[category] === 'object') {
    tool = (recon[category] as any)[toolName];
  }
}

useHead({
  title: tool ? `${tool.name} Generator` : 'Tool Not Found'
});
</script>