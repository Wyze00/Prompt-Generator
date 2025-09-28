<template>
  <div 
    class="relative" 
    @mouseenter="isSubmenuOpen = true" 
    @mouseleave="isSubmenuOpen = false"
  >
    <NuxtLink 
      :to="item.path" 
      class="flex justify-between items-center w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-gray-700 hover:text-white"
    >
      <span>{{ item.name }}</span>
      <svg v-if="item.children && item.children.length > 0" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </NuxtLink>

    <div 
      v-if="item.children && item.children.length > 0" 
      class="absolute left-full top-0 -mt-px w-48 bg-gray-800 rounded-md shadow-lg transition-all duration-200 border border-gray-700"
      :class="{ 
        'opacity-100 visible': isSubmenuOpen, 
        'opacity-0 invisible': !isSubmenuOpen 
      }"
    >
      <div class="py-1">
        <NavDropdownItem 
          v-for="child in item.children" 
          :key="child.path" 
          :item="child" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { NavLink } from '~~/types/navlink';

defineOptions({
  name: 'NavDropdownItem'
});

defineProps<{
  item: NavLink;
}>();

const isSubmenuOpen = ref(false);
</script>