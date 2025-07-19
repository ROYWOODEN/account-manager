<template>
    <v-alert @click="closeError" class="cursor-pointer" :text=counterStore.error type="error" variant="tonal"></v-alert>
</template>

<script setup lang="ts">

import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();

const closeError = () => {
    counterStore.error = '';
}



</script>

<style>

</style>