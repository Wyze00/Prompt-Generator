<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <div class="flex items-center text-sm text-gray-400 mb-2">
        <NuxtLink to="/" class="hover:text-green-400">Home</NuxtLink>
        <span class="mx-2">/</span>
        <span>Enumeration</span>
        <span class="mx-2">/</span>
        <span class="text-green-400">gobuster</span>
      </div>
      <h1 class="text-4xl font-bold text-gray-100">gobuster Command Generator</h1>
      <p class="text-xl text-gray-300 mt-2">Tools untuk brute force directory, file, vhost, dns dan lainnya</p>
    </div>

    <div class="space-y-8">
      <section class="card">
        <h2 class="section-title">Overview</h2>
        <p class="text-gray-300">Tools untuk brute force directory, file. vhost, dns dan lainnya</p>
      </section>
      <section class="card">
        <h2 class="section-title">Installation</h2>
        <div class="code-block relative group">
          <code class="text-green-400">sudo apt install gobuster</code>
          <button @click="copyToClipboard('sudo apt install gobuster')" class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 p-1 rounded">
             <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          </button>
        </div>
      </section>

      <section class="card">
        <h2 class="section-title">Select Command</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <button v-for="(command, index) in tools.command" :key="index" @click="selectedCommand = index" :class="['p-4 rounded-lg border-2 transition-all duration-200 text-left', selectedCommand === index ? 'border-green-500 bg-green-500/10' : 'border-gray-600 hover:border-gray-500']">
            <h3 class="font-semibold text-gray-100 mb-2">{{ command.name }}</h3>
            <p class="text-sm text-gray-400">{{ command.description }}</p>
          </button>
        </div>
      </section>

      <section v-if="selectedCommand !== null" class="card">
        <h2 class="section-title">Prompt Maker</h2>
        
        <form @submit.prevent="generateCommand" class="space-y-6">
          
          <OptionGroup
            v-if="tools.command[selectedCommand]"
            :groups="tools.command[selectedCommand]!.groups"
            :form-data="formData"
            key-prefix=""
          />

          <button type="submit" class="w-full btn-primary">
            Generate Command
          </button>
        </form>
      </section>

      <div v-if="generatedCommand" class="card">
        <h3 class="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
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
import { ref, reactive, watch, onMounted } from 'vue';
import type { ITool, IGroup } from '../../../types/interfaces'; // Pastikan path interface Anda benar
import OptionGroup from '~/components/OptionGroup.vue'; // Impor komponen baru

const selectedCommand = ref<number | null>(0);
const generatedCommand = ref('');
const formData = reactive<Record<string, any>>({});

const tools: ITool = {
    name: 'gobuster',
    description: 'Directory/File, DNS and VHost busting tool',
    command: [
        {
            name: 'gobuster dir',
            description: 'Directory and file brute forcing',
            groups: [
                {
                    type: 'required',
                    flags: [
                        {
                            flag: '-u <url>',
                            description: 'Target URL',
                            input: true,
                            options: [
                                { type: 'optional', flags: [{ flag: '-o1 <str>', description: 'Some description', input: true }] },
                                { type: 'optional', flags: [{ flag: '-o1 <str>', description: 'Some description', input: true }] },
                                // { type: 'required', flags: [{ flag: '-o2 <str>', description: 'Some description', input: true }] },
                                {
                                  type: 'required_one_of',
                                  description: 'Wordlist or extension (Nested)',
                                  flags: [
                                      { flag: '-o3 <wordlist>', description: 'Wordlist path', input: true },
                                      { flag: '-o4 <str>', description: 'Some description', input: true, options: [
                                        {
                                          type: 'required',
                                          flags: [
                                            {
                                              flag: '-mx',
                                              description: 'test',
                                              input: true,
                                              options: [
                                                {
                                                  type: 'required_one_of',
                                                  description: 'Wordlist or extension (Nested)',
                                                  flags: [
                                                      { flag: '-o3 <wordlist>', description: 'Wordlist path', input: true },
                                                      { flag: '-o4 <str>', description: 'Some description', input: true}
                                                  ]
                                                },
                                              ]
                                            }
                                          ],
                                        }
                                      ] }
                                  ]
                                },
                                {
                                  type: 'required_one_of',
                                  description: 'Wordlist or extension (Nested)',
                                  flags: [
                                      { flag: '-o3 <wordlist>', description: 'Wordlist path', input: true },
                                      { flag: '-o4 <str>', description: 'Some description', input: true, options: [
                                        {
                                          type: 'required',
                                          flags: [
                                            {
                                              flag: '-mx',
                                              description: 'test',
                                              input: true,
                                              options: [
                                                {
                                                  type: 'required_one_of',
                                                  description: 'Wordlist or extension (Nested)',
                                                  flags: [
                                                      { flag: '-o3 <wordlist>', description: 'Wordlist path', input: true },
                                                      { flag: '-o4 <str>', description: 'Some description', input: true}
                                                  ]
                                                },
                                              ]
                                            }
                                          ],
                                        }
                                      ] }
                                  ]
                                },
                                {
                                  type: 'optional_one_of',
                                  description: 'Another choice (Nested)',
                                  flags: [
                                      { flag: '-o5 <wordlist>', description: 'Wordlist path', input: true },
                                      { flag: '-o6 <str>', description: 'Some description', input: true }
                                  ]
                                },
                            ]
                        },
                        {
                          flag: '-req',
                          description: 'my'
                        }
                    ]
                },
                // {
                //     type: 'required_one_of',
                //     description: 'Wordlist or extension',
                //     flags: [
                //         { flag: '-w <wordlist>', description: 'Wordlist path', input: true },
                //         { flag: '-x <str>', description: 'Some description', input: true }
                //     ]
                // },
                { type: 'optional', flags: [{ flag: '-y <str>', description: 'Some description', input: true }] },
                { type: 'optional', flags: [{ flag: '-y <str>', description: 'Some description', input: true }] },
                {
                    type: 'optional_one_of',
                    description: 'Additional options',
                    flags: [
                        { flag: '-z <str>', description: 'Some description', input: true },
                        { flag: '-1 <str>', description: 'Some description', input: true }
                    ]
                }
            ]
        },
        {
            name: 'gobuster dns',
            description: 'DNS subdomain brute forcing',
            groups: [
                { type: 'required', flags: [{ flag: '-d <domain>', description: 'Target domain', input: true }] },
                { type: 'required', flags: [{ flag: '-w <wordlist>', description: 'Wordlist path', input: true }] }
            ]
        }
    ]
};

const generateCommand = () => {
  if (selectedCommand.value === null) {
    generatedCommand.value = '';
    return;
  }
  const commandDef = tools.command[selectedCommand.value];
  const commandParts: string[] = [commandDef!.name];

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
            if (flag.input) commandParts.push(`${flag.flag.split(' ')[0]} ${value}`);
            else commandParts.push(flag.flag);
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
                commandParts.push(`${selectedFlag.flag.split(' ')[0]} ${inputValue}`);
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

  processGroups(commandDef!.groups, '', true);
  generatedCommand.value = commandParts.join(' ').trim();
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

watch(formData, () => {
  generateCommand();
}, { deep: true });

watch(selectedCommand, (newValue, oldValue) => {
  if (newValue !== oldValue) {
      Object.keys(formData).forEach(key => delete formData[key]);
      generateCommand();
  }
});

onMounted(() => {
  generateCommand();
});

useHead({
  title: 'gobuster Command Generator - Command Prompt Maker',
  meta: [
    { name: 'description', content: 'Generate gobuster commands with interactive options. Directory/File, DNS and VHost busting tool.' }
  ]
});
</script>