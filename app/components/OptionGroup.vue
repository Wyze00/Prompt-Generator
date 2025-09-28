<template>
  <div class="space-y-6">
    <div v-for="(group, groupIndex) in groups" :key="groupIndex" class="space-y-4">
      <div class="border-l-4 pl-4" :class="getGroupBorderColor(group.type)">
        <h4 :class="['font-semibold', 'mb-3', isNested ? 'text-md' : 'text-lg', getGroupTextColor(group.type)]">
          {{ getGroupTitle(group.type) }}
          <span v-if="group.description" class="text-sm font-normal text-gray-400 block">
            {{ group.description }}
          </span>
        </h4>

        <div v-if="group.type === 'required' || group.type === 'optional'" class="space-y-3">
          <div v-for="(flag, flagIndex) in group.flags" :key="flagIndex">
            
            <div v-if="flag.input">
              <label class="block text-sm font-medium text-gray-300 mb-2">
                {{ flag.flag }}
                <span v-if="group.type === 'required'" class="text-red-400">*</span>
              </label>

              <div v-for="placeholder in getPlaceholders(flag.flag)" :key="placeholder" class="mb-3">
                <label v-if="getPlaceholders(flag.flag).length > 1" class="block text-xs font-medium text-green-400 mb-1">
                  {{ placeholder }}
                </label>
                <input
                  v-model="formData[`${keyPrefix}${groupIndex}_${flagIndex}_${placeholder}`]"
                  type="text"
                  :placeholder="placeholder"
                  class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  :required="group.type === 'required'"
                />
              </div>
              <p class="text-xs text-gray-400 -mt-2">{{ flag.description }}</p>
            </div>
            
            <div v-else>
              <label class="flex items-center">
                <input v-model="formData[`${keyPrefix}${groupIndex}_${flagIndex}`]" type="checkbox" class="mr-2 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"/>
                <span class="text-sm text-gray-300">{{ flag.flag }}</span>
              </label>
              <p class="text-xs text-gray-400 mt-1">{{ flag.description }}</p>
            </div>

            <div v-if="flag.options && isFlagActive(flag, groupIndex, flagIndex)" class="ml-6 mt-4">
              <OptionGroup :groups="flag.options" :form-data="formData" :key-prefix="`${keyPrefix}${groupIndex}_${flagIndex}_`" :is-nested="true" />
            </div>
          </div>
        </div>

        <div v-else class="space-y-3">
          <div class="space-y-2">
            <label v-if="group.type === 'optional_one_of'" class="flex items-center">
              <input v-model="formData[`group_${keyPrefix}${groupIndex}`]" type="radio" :value="null" :name="`group_${keyPrefix}${groupIndex}`" class="mr-2 text-green-500 focus:ring-green-500" />
              <span class="text-sm text-gray-300">None</span>
            </label>
            <div v-for="(flag, flagIndex) in group.flags" :key="flagIndex" class="ml-4">
              <label class="flex items-center mb-2">
                <input v-model="formData[`group_${keyPrefix}${groupIndex}`]" type="radio" :value="flagIndex" :name="`group_${keyPrefix}${groupIndex}`" :required="group.type === 'required_one_of'" class="mr-2 text-green-500 focus:ring-green-500" />
                <span class="text-sm text-gray-300">{{ flag.flag }}</span>
              </label>
              
              <div v-if="flag.input && formData[`group_${keyPrefix}${groupIndex}`] === flagIndex" class="ml-6 mt-2">
                <div v-for="placeholder in getPlaceholders(flag.flag)" :key="placeholder" class="mb-3">
                   <label v-if="getPlaceholders(flag.flag).length > 1" class="block text-sm font-medium text-green-400 mb-2">
                    {{ placeholder }}
                    <span v-if="group.type === 'required_one_of'" class="text-red-400">*</span>
                  </label>
                  <input
                    v-model="formData[`${keyPrefix}${groupIndex}_${flagIndex}_${placeholder}_input`]"
                    type="text"
                    :placeholder="placeholder"
                    class="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    :required="group.type === 'required_one_of'"
                  />
                </div>
                <p class="text-xs text-gray-400 -mt-2">{{ flag.description }}</p>
              </div>
              <p v-else-if="!flag.input" class="text-xs text-gray-400 mt-1">{{ flag.description }}</p>

              <div v-if="flag.options && formData[`group_${keyPrefix}${groupIndex}`] === flagIndex" class="ml-6 mt-4">
                <OptionGroup :groups="flag.options" :form-data="formData" :key-prefix="`${keyPrefix}${groupIndex}_${flagIndex}_`" :is-nested="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IGroup, IFlag } from '~~/types/interfaces';

const props = defineProps<{
  groups: IGroup[];
  formData: Record<string, any>;
  keyPrefix: string;
  isNested?: boolean;
}>();

const getPlaceholders = (flagStr: string): string[] => {
  const matches = flagStr.match(/<([^>]+)>/g);
  if (!matches) {
    return [flagStr.split(' ')[0] as string]; 
  }
  return matches.map(m => m.slice(1, -1));
};

const getGroupTitle = (type: string) => {
  switch (type) {
    case 'required': return 'Required Options'
    case 'optional': return 'Optional Options'
    case 'required_one_of': return 'Required (Choose One)'
    case 'optional_one_of': return 'Optional (Choose One)'
    default: return 'Options'
  }
};

const getGroupBorderColor = (type: string) => {
  switch (type) {
    case 'required': return 'border-red-500'
    case 'optional': return 'border-blue-500'
    case 'required_one_of': return 'border-orange-500'
    case 'optional_one_of': return 'border-purple-500'
    default: return 'border-gray-500'
  }
};

const getGroupTextColor = (type: string) => {
  switch (type) {
    case 'required': return 'text-red-400'
    case 'optional': return 'text-blue-400'
    case 'required_one_of': return 'text-orange-400'
    case 'optional_one_of': return 'text-purple-400'
    default: return 'text-gray-400'
  }
};

const isFlagActive = (flag: IFlag, groupIndex: number, flagIndex: number): boolean => {
  const flagKey = `${props.keyPrefix}${groupIndex}_${flagIndex}`;
  if (flag.input) {
    const placeholders = getPlaceholders(flag.flag);
    return placeholders.some(p => !!props.formData[`${flagKey}_${p}`]);
  }
  return !!props.formData[flagKey];
};
</script>