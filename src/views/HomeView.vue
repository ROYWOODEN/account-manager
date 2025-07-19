<template>

  <div class="d-flex flex-column align-center justify-center mt-10">
    <div class="d-flex flex-row align-center justify-center mb-8">
      <h1 class="me-4">Учетный записи</h1>
      <v-btn 
      :icon="isCross ? 'mdi-close' : 'mdi-plus'" 
      variant="outlined" 
      @click="toggleIcon"
    ></v-btn>
    </div>


    <div v-if="addAcc" class="w-50">
      <Form class="w-100" />
    </div>
    


      <div v-if="counterStore.allData.length > 0">
        <AllAccount />
      </div>

    <div v-else-if="counterStore.allData.length === 0">
      <h3>Данные не найдены</h3>
    </div>

    <div v-else>
      <v-progress-circular
        color="primary"
        indeterminate
        :size="48"
        :width="5"
    ></v-progress-circular>
    </div>

    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Form from '@/components/Form.vue'
import AllAccount from '@/components/AllAccount.vue'  
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore();

const addAcc = ref<boolean>(false);
const isCross = ref<boolean>(false);



const toggleIcon = () => {
    isCross.value = !isCross.value;
    addAcc.value = !addAcc.value;
}


onMounted(() => {
    counterStore.getFormData();
  
});
</script>