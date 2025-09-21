<template>
  <div v-if="tool">
    <ToolPageLayout :tool="tool" />
  </div>
  <div v-else class="text-center p-8">
    <h1 class="text-2xl text-red-400">Tool "{{ slug }}" tidak ditemukan.</h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import ToolPageLayout from '../../components/ToolPageLayout.vue';

// Kita perlu cara untuk mendapatkan semua tool. Mari kita buat index file.
import { allTools } from '../../../data/enumeration/index';

const route = useRoute();
const slug = route.params.slug as keyof typeof allTools;
const tool = allTools[slug];

// (Opsional) Atur judul halaman secara dinamis
useHead({
  title: tool ? `${tool.name} Generator` : 'Tool Not Found'
});
</script>