<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-dvh">
    <div class="card">
      <h1 class="text-4xl font-bold text-gray-100 mb-6">Linux Tools</h1>
      
      <ToolList 
        :data="linux" 
        base-path="/linux"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import ToolList from '~/components/ToolList.vue';
import { linux } from '../../../data/linux'; 

useHead({
  title: 'Linux Tools'
});
</script>

<style scoped>
</style>