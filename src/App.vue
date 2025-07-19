<template>
  <ErrorAlert v-if="counterStore.error" />
  <router-view />
</template>

<script setup lang="ts">
import ErrorAlert from '@/components/ErrorAlert.vue';

import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();


</script>