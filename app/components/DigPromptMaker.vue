<template>
  <div class="card sticky top-24">
    <h3 class="section-title">
      <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
      Prompt Maker
    </h3>

    <form @submit.prevent="generateCommand" class="space-y-6">
      <!-- Required Options -->
      <div>
        <h4 class="text-lg font-semibold text-gray-200 mb-3 text-orange-400">Required Options</h4>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Domain/Hostname *
            </label>
            <input
              v-model="form.domain"
              type="text"
              placeholder="example.com"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              required
            />
            <p class="text-xs text-gray-400 mt-1">The domain or hostname to query</p>
          </div>
        </div>
      </div>

      <!-- Optional Options -->
      <div>
        <h4 class="text-lg font-semibold text-gray-200 mb-3 text-blue-400">Optional Options</h4>
        
        <div class="space-y-4">
          <!-- Record Type -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Record Type
            </label>
            <select
              v-model="form.recordType"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Default (A)</option>
              <option value="A">A - IPv4 address</option>
              <option value="AAAA">AAAA - IPv6 address</option>
              <option value="MX">MX - Mail exchange</option>
              <option value="NS">NS - Name servers</option>
              <option value="TXT">TXT - Text records</option>
              <option value="CNAME">CNAME - Canonical name</option>
              <option value="SOA">SOA - Start of authority</option>
              <option value="PTR">PTR - Pointer record</option>
            </select>
            <p class="text-xs text-gray-400 mt-1">Type of DNS record to query</p>
          </div>

          <!-- DNS Server -->
          <div>
            <label class="flex items-center mb-2">
              <input
                v-model="form.useCustomServer"
                type="checkbox"
                class="mr-2 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
              />
              <span class="text-sm font-medium text-gray-300">Use custom DNS server</span>
            </label>
            <input
              v-if="form.useCustomServer"
              v-model="form.dnsServer"
              type="text"
              placeholder="8.8.8.8"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <p class="text-xs text-gray-400 mt-1">Specific DNS server to query</p>
          </div>

          <!-- Port -->
          <div>
            <label class="flex items-center mb-2">
              <input
                v-model="form.useCustomPort"
                type="checkbox"
                class="mr-2 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
              />
              <span class="text-sm font-medium text-gray-300">Use custom port</span>
            </label>
            <input
              v-if="form.useCustomPort"
              v-model="form.port"
              type="number"
              placeholder="53"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              min="1"
              max="65535"
            />
            <p class="text-xs text-gray-400 mt-1">Custom port number</p>
          </div>

          <!-- Flags -->
          <div class="space-y-2">
            <h5 class="text-sm font-medium text-gray-300">Flags</h5>
            
            <label class="flex items-center">
              <input
                v-model="form.short"
                type="checkbox"
                class="mr-2 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
              />
              <span class="text-sm text-gray-300">+short</span>
              <span class="text-xs text-gray-400 ml-2">- Show short answer only</span>
            </label>
            
            <label class="flex items-center">
              <input
                v-model="form.trace"
                type="checkbox"
                class="mr-2 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
              />
              <span class="text-sm text-gray-300">+trace</span>
              <span class="text-xs text-gray-400 ml-2">- Trace delegation path</span>
            </label>
            
            <label class="flex items-center">
              <input
                v-model="form.norecurse"
                type="checkbox"
                class="mr-2 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
              />
              <span class="text-sm text-gray-300">+norecurse</span>
              <span class="text-xs text-gray-400 ml-2">- Don't use recursive queries</span>
            </label>

            <label class="flex items-center">
              <input
                v-model="form.reverse"
                type="checkbox"
                class="mr-2 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
              />
              <span class="text-sm text-gray-300">-x</span>
              <span class="text-xs text-gray-400 ml-2">- Reverse lookup (PTR)</span>
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="w-full btn-primary"
        :disabled="!form.domain"
      >
        Generate Command
      </button>
    </form>
  </div>
</template>

<script setup>
const emit = defineEmits(['commandGenerated'])

const form = reactive({
  domain: '',
  recordType: '',
  useCustomServer: false,
  dnsServer: '',
  useCustomPort: false,
  port: '',
  short: false,
  trace: false,
  norecurse: false,
  reverse: false
})

const generateCommand = () => {
  let command = 'dig'
  
  // Add flags first
  if (form.short) command += ' +short'
  if (form.trace) command += ' +trace'
  if (form.norecurse) command += ' +norecurse'
  if (form.reverse) command += ' -x'
  
  // Add custom server and port
  if (form.useCustomServer && form.dnsServer) {
    command += ` @${form.dnsServer}`
    if (form.useCustomPort && form.port) {
      command += ` -p ${form.port}`
    }
  }
  
  // Add domain
  command += ` ${form.domain}`
  
  // Add record type
  if (form.recordType) {
    command += ` ${form.recordType}`
  }
  
  emit('commandGenerated', command.trim())
}

// Generate command on form changes
watch(form, () => {
  if (form.domain) {
    generateCommand()
  }
}, { deep: true })
</script>