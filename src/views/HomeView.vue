<template>

  <div class="d-flex flex-column align-center justify-center">
    <div class="d-flex flex-row align-center justify-center mb-8">
      <h1 class="me-4">Учетный записи</h1>
      <v-btn icon="$vuetify" variant="outlined">+</v-btn>
    </div>


    <div class="w-50">
      <Form class="w-100" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Form from '@/components/Form.vue'
</script>