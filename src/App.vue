<template>
  <component :is="$route.meta.layout || 'div'">
      <router-view />
  </component>
</template>

<script setup lang="ts">
import {RouterView } from 'vue-router'
</script>