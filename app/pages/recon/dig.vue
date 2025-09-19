<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center text-sm text-gray-400 mb-2">
        <NuxtLink to="/" class="hover:text-green-400">Home</NuxtLink>
        <span class="mx-2">/</span>
        <span>Reconnaissance</span>
        <span class="mx-2">/</span>
        <span class="text-green-400">dig</span>
      </div>
      <h1 class="text-4xl font-bold text-gray-100">dig Command Generator</h1>
      <p class="text-xl text-gray-300 mt-2">DNS lookup utility for querying name servers</p>
    </div>

    <!-- Content Sections -->
    <div class="space-y-8">
      <!-- Overview -->
      <section class="card">
        <h2 class="section-title">
          <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Overview
        </h2>
        <p class="text-gray-300">
          Tools untuk query DNS
        </p>
      </section>

      <!-- Installation -->
      <section class="card">
        <h2 class="section-title">
          <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
          </svg>
          Installation
        </h2>
        
        <div class="code-block relative group">
          <code class="text-green-400">sudo apt install dnsutils</code>
          <button @click="copyToClipboard('sudo apt install dnsutils')" class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 p-1 rounded">
            <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
          </button>
        </div>
      </section>

      <!-- Usage -->
      <section class="card">
        <h2 class="section-title">
          <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
          Usage
        </h2>
        
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-200">DIG</h3>
          <ul class="space-y-2 text-gray-300">
            <li><strong>dig</strong></li>
            <li class="ml-4">• {&lt;domain&gt; (domain name / ip)}</li>
            <li class="ml-4">• {&lt;type&gt; (tipe) | -x (reverse lookup)}</li>
            <li class="ml-4">• [@&lt;nameServer&gt; (name server)]</li>
          </ul>
        </div>
      </section>

      <!-- Prompt Maker -->
      <section class="card">
        <h2 class="section-title">
          <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Prompt Maker
        </h2>

        <form @submit.prevent="generateCommand" class="space-y-6">
          <!-- Render groups dynamically -->
          <div v-for="(group, groupIndex) in tools.command[0].groups" :key="groupIndex" class="space-y-4">
            <div class="border-l-4 pl-4" :class="getGroupBorderColor(group.type)">
              <h4 class="text-lg font-semibold mb-3" :class="getGroupTextColor(group.type)">
                {{ getGroupTitle(group.type) }}
                <span v-if="group.description" class="text-sm font-normal text-gray-400 block">
                  {{ group.description }}
                </span>
              </h4>

              <!-- Handle different group types -->
              <div v-if="group.type === 'required' || group.type === 'optional'" class="space-y-3">
                <div v-for="(flag, flagIndex) in group.flags" :key="flagIndex">
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    {{ flag.flag }}
                    <span v-if="group.type === 'required'" class="text-red-400">*</span>
                  </label>
                  <input
                    v-if="flag.input"
                    v-model="formData[`${groupIndex}_${flagIndex}`]"
                    type="text"
                    :placeholder="getPlaceholder(flag.flag)"
                    class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    :required="group.type === 'required'"
                  />
                  <label v-else class="flex items-center">
                    <input
                      v-model="formData[`${groupIndex}_${flagIndex}`]"
                      type="checkbox"
                      class="mr-2 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
                    />
                    <span class="text-sm text-gray-300">{{ flag.flag }}</span>
                  </label>
                  <p class="text-xs text-gray-400 mt-1">{{ flag.description }}</p>
                </div>
              </div>

              <!-- Handle one_of groups (radio buttons) -->
              <div v-else class="space-y-3">
                <div class="space-y-2">
                  <label class="flex items-center">
                    <input
                      v-model="formData[`group_${groupIndex}`]"
                      type="radio"
                      :value="null"
                      class="mr-2 text-green-500 focus:ring-green-500"
                    />
                    <span class="text-sm text-gray-300">None</span>
                  </label>
                  <div v-for="(flag, flagIndex) in group.flags" :key="flagIndex" class="ml-4">
                    <label class="flex items-center mb-2">
                      <input
                        v-model="formData[`group_${groupIndex}`]"
                        type="radio"
                        :value="`${groupIndex}_${flagIndex}`"
                        class="mr-2 text-green-500 focus:ring-green-500"
                      />
                      <span class="text-sm text-gray-300">{{ flag.flag }}</span>
                    </label>
                    <input
                      v-if="flag.input && formData[`group_${groupIndex}`] === `${groupIndex}_${flagIndex}`"
                      v-model="formData[`${groupIndex}_${flagIndex}_input`]"
                      type="text"
                      :placeholder="getPlaceholder(flag.flag)"
                      class="w-full ml-6 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                    <p class="text-xs text-gray-400 mt-1 ml-6">{{ flag.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="w-full btn-primary"
          >
            Generate Command
          </button>
        </form>
      </section>

      <!-- Generated Command -->
      <div v-if="generatedCommand" class="card">
        <h3 class="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
          Generated Command
        </h3>
        <div class="code-block relative group">
          <code class="text-green-400">{{ generatedCommand }}</code>
          <button @click="copyToClipboard(generatedCommand)" class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 p-2 rounded hover:bg-gray-600">
            <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITool } from '~/types/interfaces'

const generatedCommand = ref('')
const formData = reactive<Record<string, any>>({})

const tools: ITool = {
    name: 'dig',
    description: 'DNS lookup utility',
    command: [
        {
            name: 'dig',
            description: 'Melakukan query DNS untuk mendapatkan informasi domain.',
            groups: [
                {
                    type: 'required',
                    flags: [
                        {
                            flag: '<domain>',
                            description: 'Domain atau alamat IP yang akan di-query',
                            input: true,
                            isArgument: true
                        }
                    ]
                },
                {
                    type: 'optional_one_of',
                    description: 'Tentukan tipe query',
                    flags: [
                        {
                            flag: '<type>',
                            description: 'Tipe record (e.g., A, MX, TXT, ANY)',
                            input: true,
                            isArgument: true
                        },
                        {
                            flag: '-x',
                            description: 'Lakukan reverse lookup (untuk IP)',
                            input: false
                        }
                    ]
                },
                {
                    type: 'optional',
                    description: 'Opsi tambahan',
                    flags: [
                        {
                            flag: '@<nameServer>',
                            description: 'Gunakan nameserver spesifik',
                            input: true
                        },
                        {
                            flag: '+short',
                            description: 'Tampilkan jawaban dalam format singkat',
                            input: false
                        }
                    ]
                }
            ]
        }
    ]
}

const getGroupTitle = (type: string) => {
  switch (type) {
    case 'required': return 'Required Options'
    case 'optional': return 'Optional Options'
    case 'required_one_of': return 'Required (Choose One)'
    case 'optional_one_of': return 'Optional (Choose One)'
    default: return 'Options'
  }
}

const getGroupBorderColor = (type: string) => {
  switch (type) {
    case 'required': return 'border-red-500'
    case 'optional': return 'border-blue-500'
    case 'required_one_of': return 'border-orange-500'
    case 'optional_one_of': return 'border-purple-500'
    default: return 'border-gray-500'
  }
}

const getGroupTextColor = (type: string) => {
  switch (type) {
    case 'required': return 'text-red-400'
    case 'optional': return 'text-blue-400'
    case 'required_one_of': return 'text-orange-400'
    case 'optional_one_of': return 'text-purple-400'
    default: return 'text-gray-400'
  }
}

const getPlaceholder = (flag: string) => {
  if (flag.includes('<domain>')) return 'example.com'
  if (flag.includes('<type>')) return 'A, MX, TXT, etc.'
  if (flag.includes('<nameServer>')) return '8.8.8.8'
  return ''
}

const generateCommand = () => {
  let command = 'dig'
  const groups = tools.command[0].groups
  
  groups.forEach((group, groupIndex) => {
    if (group.type === 'required' || group.type === 'optional') {
      group.flags.forEach((flag, flagIndex) => {
        const key = `${groupIndex}_${flagIndex}`
        const value = formData[key]
        
        if (value) {
          if (flag.input) {
            if (flag.flag.startsWith('@')) {
              command += ` @${value}`
            } else if (flag.isArgument) {
              command += ` ${value}`
            } else {
              command += ` ${flag.flag} ${value}`
            }
          } else {
            command += ` ${flag.flag}`
          }
        }
      })
    } else if (group.type === 'required_one_of' || group.type === 'optional_one_of') {
      const selectedKey = formData[`group_${groupIndex}`]
      if (selectedKey) {
        const [gIndex, fIndex] = selectedKey.split('_').map(Number)
        const selectedFlag = groups[gIndex].flags[fIndex]
        
        if (selectedFlag.input) {
          const inputValue = formData[`${selectedKey}_input`]
          if (inputValue) {
            if (selectedFlag.isArgument) {
              command += ` ${inputValue}`
            } else {
              command += ` ${selectedFlag.flag} ${inputValue}`
            }
          }
        } else {
          command += ` ${selectedFlag.flag}`
        }
      }
    }
  })
  
  generatedCommand.value = command.trim()
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

// Generate command on form changes
watch(formData, () => {
  generateCommand()
}, { deep: true })

// Initialize command generation
onMounted(() => {
  generateCommand()
})

useHead({
  title: 'dig Command Generator - Command Prompt Maker',
  meta: [
    { name: 'description', content: 'Generate dig commands with interactive options. DNS lookup utility for querying name servers.' }
  ]
})
</script>