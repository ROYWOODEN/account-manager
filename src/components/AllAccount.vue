<template>
     <v-table density="compact" class="my-4">
    <thead>
      <tr>
        <th class="text-left">Метки</th>
        <th class="text-left">Тип</th>
        <th class="text-left">Логин</th>
        <th class="text-left">Пароль</th>
        <th class="text-left">Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="({ metka, type, login, password }, index) in counterStore.allData" :key="index">


        <td>
          <div v-if="metka !== null" class="d-flex flex-wrap" style="gap: 4px; max-width: 200px;">
            <v-chip
              v-for="({ text }, metkaIndex) in metka"
              :key="metkaIndex"
              size="small"
              color="red-lighten-1"
            >
              {{ text }};
            </v-chip>
          </div>

          <div v-else>
            <span class="text-grey">—</span>
          </div>
        </td>
        
      

        <td>
          <v-chip :color="type === 'Локальная' ? 'green-lighten-3' : 'blue-lighten-3'" size="small">
            {{ type }}
          </v-chip>
        </td>
        
        
        <td>{{ login }}</td>
        
        <td style="width: 200px;">
          <v-text-field
            v-if="password !== null"
            :type="showPassword[index] ? 'text' : 'password'"
            :model-value="password"
            readonly
            density="compact"
            hide-details
            variant="underlined"
          >
            <template v-slot:append-inner>
              <v-icon
                small
                @click="showPassword[index] = !showPassword[index]"
                style="cursor: pointer;"
              >
                {{ showPassword[index] ? 'mdi-eye-off' : 'mdi-eye' }}
              </v-icon>
            </template>
          </v-text-field>
          <span v-else class="text-grey">—</span>
        </td>
        
       
        <td>
          <v-btn
            icon
            size="small"
            color="error"
            variant="text"
            @click="deleteForm(index)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  </template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore();
const showPassword = ref<boolean[]>([]);



function deleteForm(index: number) {
  counterStore.allData.splice(index, 1);
  localStorage.setItem('addFormData', JSON.stringify(counterStore.allData));
}



</script>
<style>

</style>