<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <div class="flex items-center text-sm text-gray-400 mb-2">
        <NuxtLink to="/" class="hover:text-green-400">Home</NuxtLink>
        <template v-for="crumb in breadcrumbs" :key="crumb.to">
          <span class="mx-2">/</span>
          <NuxtLink v-if="crumb.to" :to="crumb.to" class="hover:text-green-400">{{ crumb.name }}</NuxtLink>
          <span v-else class="text-green-400">{{ crumb.name }}</span>
        </template>
      </div>
      <h1 class="text-4xl font-bold text-gray-100">{{ tool.name }} Command Generator</h1>
      <p class="text-xl text-gray-300 mt-2">{{ tool.description }}</p>
    </div>

    <div class="space-y-8">
      <section class="card">
        <h2 class="section-title">Select Command</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <button v-for="(command, index) in tool.command" :key="index" @click="selectedCommand = index" :class="['p-4 rounded-lg border-2 transition-all duration-200 text-left', selectedCommand === index ? 'border-green-500 bg-green-500/10' : 'border-gray-600 hover:border-gray-500']">
            <h3 class="font-semibold text-gray-100 mb-2">{{ command.name }}</h3>
            <p class="text-sm text-gray-400">{{ command.description }}</p>
          </button>
        </div>
      </section>

      <section v-if="selectedCommand !== null && tool.command[selectedCommand]" class="card">
        <h2 class="section-title">Prompt Maker</h2>
        <form @submit.prevent="generateCommand" class="space-y-6">
          <OptionGroup
            :groups="tool.command[selectedCommand]!.groups"
            :form-data="formData"
            key-prefix=""
          />
          <button type="submit" class="w-full btn-primary">
            Generate Command
          </button>
        </form>
      </section>

      <div v-if="generatedCommand" class="card">
        <h3 class="text-xl font-bold text-gray-100 mb-4">Generated Command</h3>
        <div class="code-block relative group">
          <code class="text-green-400">{{ generatedCommand }}</code>
           <button @click="copyToClipboard(generatedCommand)" class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 p-2 rounded hover:bg-gray-600">
             <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, toRefs, computed } from 'vue';
import { useRoute } from 'vue-router';
import type { ITool, IGroup } from '../../types/interfaces';
import OptionGroup from '~/components/OptionGroup.vue';

const props = defineProps<{
  tool: ITool;
}>();
const { tool } = toRefs(props);
const route = useRoute();

const selectedCommand = ref<number | null>(0);
const generatedCommand = ref('');
const formData = reactive<Record<string, any>>({});

const breadcrumbs = computed(() => {
  return route.path.split('/').filter(p => p).map((segment, index, arr) => {
    const name = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { name, to: index === arr.length - 1 ? null : '/' + arr.slice(0, index + 1).join('/') };
  });
});

// ====================================================================
// FUNGSI GENERATE COMMAND DENGAN LOGIKA BARU YANG LEBIH PINTAR
// ====================================================================
const generateCommand = () => {
  if (selectedCommand.value === null || !tool.value) {
    generatedCommand.value = ''; return;
  }
  const commandDef = tool.value.command[selectedCommand.value];
  if (!commandDef) return;
  
  const commandParts: string[] = [commandDef.name];

  const processGroups = (groups: IGroup[], keyPrefix: string, isParentActive: boolean) => {
    if (!isParentActive) return;

    for (const [groupIndex, group] of groups.entries()) {
      const currentGroupKeyPrefix = `${keyPrefix}${groupIndex}`;
      if (group.type === 'required' || group.type === 'optional') {
        for (const [flagIndex, flag] of group.flags.entries()) {
          const flagKey = `${currentGroupKeyPrefix}_${flagIndex}`;
          const value = formData[flagKey];
          const isFlagActive = !!value;

          if (isFlagActive) {
            // --- BLOK LOGIKA BARU DIMULAI DI SINI ---
            if (flag.input) {
              const flagString = flag.flag; // e.g., "-u <url>", "@<nameServer>", "<domain>"
              const flagParts = flagString.split(' ');

              // Kasus 1: Argumen Posisi (contoh: "<domain>")
              // Seluruh string adalah placeholder.
              if (flagString.startsWith('<') && flagString.endsWith('>')) {
                commandParts.push(value);
              }
              // Kasus 2: Flag dengan nilai terpisah (contoh: "-u <url>")
              // Bagian pertama adalah flag, bagian kedua adalah placeholder.
              else if (flagParts.length > 1 && flagParts[1]!.startsWith('<')) {
                 commandParts.push(`${flagParts[0]} ${value}`);
              }
              // Kasus 3: Flag dengan nilai terintegrasi (contoh: "@<nameServer>")
              // Placeholder ada di dalam string flag itu sendiri.
              else if (flagString.includes('<')) {
                 commandParts.push(flagString.replace(/<.*?>/, value));
              }
              // Kasus 4: Flag input standar lainnya (jika ada)
              else {
                commandParts.push(`${flagString} ${value}`);
              }
            } else {
              // Untuk checkbox (tidak ada input)
              commandParts.push(flag.flag);
            }
            // --- BLOK LOGIKA BARU BERAKHIR DI SINI ---
          }
          if (flag.options) processGroups(flag.options, `${flagKey}_`, isFlagActive);
        }
      } else if (group.type === 'required_one_of' || group.type === 'optional_one_of') {
        // ... (Logika untuk radio button SAMA PERSIS seperti sebelumnya, tidak perlu diubah)
        const radioGroupKey = `group_${currentGroupKeyPrefix}`;
        const selectedIndex = formData[radioGroupKey];
        if (selectedIndex !== undefined && selectedIndex !== null) {
          const selectedFlag = group.flags[selectedIndex];
          if (selectedFlag) {
            let isFlagActive = false;
            if (selectedFlag.input) {
              const inputKey = `${currentGroupKeyPrefix}_${selectedIndex}_input`;
              const inputValue = formData[inputKey];
              if (inputValue) {
                 // Terapkan juga logika baru di sini untuk radio button
                const flagString = selectedFlag.flag;
                const flagParts = flagString.split(' ');
                if (flagParts.length > 1 && flagParts[1]!.startsWith('<')) {
                    commandParts.push(`${flagParts[0]} ${inputValue}`);
                } else if (flagString.includes('<')) {
                    commandParts.push(flagString.replace(/<.*?>/, inputValue));
                } else {
                    commandParts.push(`${flagString} ${inputValue}`);
                }
                isFlagActive = true;
              }
            } else {
              commandParts.push(selectedFlag.flag);
              isFlagActive = true;
            }
            if (selectedFlag.options) processGroups(selectedFlag.options, `${currentGroupKeyPrefix}_${selectedIndex}_`, isFlagActive);
          }
        }
      }
    }
  };
  processGroups(commandDef.groups, '', true);
  generatedCommand.value = commandParts.join(' ').trim();
};

const copyToClipboard = async (text: string) => { /* ... Sama seperti sebelumnya ... */ };
watch(tool, () => { /* ... Sama seperti sebelumnya ... */ }, { immediate: true });
watch(formData, () => { generateCommand() }, { deep: true });
watch(selectedCommand, () => { generateCommand() });
</script>