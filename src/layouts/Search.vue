<template>
    <form class="relative" @submit.prevent="$emit('searching')">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon class="w-5 h-5 text-gray-500 dark:text-gray-400"/>
        </div>
        <input :value="modelValue" @input="updateValue" type="text" :placeholder="placeholder" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </form>
</template>

<script setup lang="ts">
import SearchIcon from '@/icons/Search.vue'

defineProps(['modelValue', 'placeholder'])
const emit = defineEmits(['update:modelValue', 'searching'])

const updateValue = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
};
</script>