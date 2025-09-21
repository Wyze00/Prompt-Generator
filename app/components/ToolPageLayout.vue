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
      <h1 class="text-4xl font-bold text-gray-100">{{ tool.name.slice(0,1).toUpperCase() + tool.name.slice(1) }} Command Generator</h1>
      <p class="text-xl text-gray-300 mt-2">{{ tool.description }}</p>
    </div>

    <div class="space-y-8">

      <template v-if="tool.documentation">
        <section class="card">
          <h2 class="section-title">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Overview
          </h2>
          <p class="text-gray-300">
            {{ tool.documentation.overview }}
          </p>
        </section>

        <section class="card">
          <h2 class="section-title">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
            Installation
          </h2>
          <div class="code-block relative group">
            <pre class="text-green-400 whitespace-pre-wrap font-mono">{{ tool.documentation.installation }}</pre>
            <button @click="copyToClipboard(tool.documentation.installation)" class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 p-1 rounded">
              <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
        </section>

        <section class="card">
          <h2 class="section-title">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            Usage
          </h2>
          <div class="space-y-6">
            <div v-for="usageCmd in tool.documentation.usage" :key="usageCmd.mode">
              <h3 class="text-lg font-semibold text-gray-200 uppercase">{{ usageCmd.mode }}</h3>
              <p class="text-gray-300 font-mono mt-1 mb-2">{{ usageCmd.text }}</p>
              <pre class="text-gray-300 text-sm font-mono bg-gray-900/50 p-4 rounded-lg overflow-x-auto">{{ usageCmd.options }}</pre>
            </div>
          </div>
        </section>
      </template>

      <section class="card">
        <h2 class="section-title">
          <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          Select Command
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <button v-for="(command, index) in tool.command" :key="index" @click="selectedCommand = index" :class="['p-4 rounded-lg border-2 transition-all duration-200 text-left', selectedCommand === index ? 'border-green-500 bg-green-500/10' : 'border-gray-600 hover:border-gray-500']">
            <h3 class="font-semibold text-gray-100 mb-2">{{ command.name }}</h3>
            <p class="text-sm text-gray-400">{{ command.description }}</p>
          </button>
        </div>
      </section>

      <section v-if="selectedCommand !== null && tool.command[selectedCommand]" class="card">
        <h2 class="section-title">
          <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Prompt Maker
        </h2>
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
        <h3 class="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
          Generated Command
        </h3>
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
import { ref, reactive, watch, toRefs, computed } from 'vue';
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
            if (flag.input) {
              const flagString = flag.flag;
              const flagParts = flagString.split(' ');

              if (flagString.startsWith('<') && flagString.endsWith('>')) {
                commandParts.push(value);
              }
              else if (flagParts.length > 1 && flagParts[1]!.startsWith('<')) {
                 commandParts.push(`${flagParts[0]} ${value}`);
              }
              else if (flagString.includes('<')) {
                 commandParts.push(flagString.replace(/<.*?>/, value));
              }
              else {
                commandParts.push(`${flagString} ${value}`);
              }
            } else {
              commandParts.push(flag.flag);
            }
          }
          if (flag.options) processGroups(flag.options, `${flagKey}_`, isFlagActive);
        }
      } else if (group.type === 'required_one_of' || group.type === 'optional_one_of') {
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

const copyToClipboard = async (text: string) => {
  if (!navigator.clipboard) {
    console.error('Clipboard API not available');
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

watch(tool, () => {
    Object.keys(formData).forEach(key => delete formData[key]);
    selectedCommand.value = 0;
    generateCommand();
}, { immediate: true });

watch(formData, () => { generateCommand() }, { deep: true });
watch(selectedCommand, () => { generateCommand() });
</script>