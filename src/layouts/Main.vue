<template>
    <Topbar @sidebartoggle="sidebartoggle"/>
    <div class="flex flex-col items-start pt-16 h-screen">
        <div class="grow w-full flex">
            <aside class="border-r w-56 bg-white dark:bg-gray-800 dark:border-gray-700" :class="{ hidden: sidebarclose }">
                <Sidebar/>
            </aside>
            <main class="flex-1 grow p-4 overflow-y-auto">
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Topbar from './Topbar.vue'
import Sidebar from './Sidebar.vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import type { Ref } from 'vue'

const sidebarclose: Ref<boolean> = ref(false);

onMounted(() => {
    sidebarclose.value = window.innerWidth < 768;
})

const sidebartoggle = async () => {
    sidebarclose.value = !sidebarclose.value
}
</script>