<template>
    <div>
        <Topbar/>

        <div class="m-4">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import Topbar from './Topbar.vue';
</script>