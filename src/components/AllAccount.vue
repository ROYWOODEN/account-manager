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
      <tr v-for="(item, index) in counterStore.allData" :key="index">


        <td>
          <div v-if="item.metka !== null" class="d-flex flex-wrap" style="gap: 4px; max-width: 200px;">
            <v-chip
              v-for="(metka, metkaIndex) in item.metka"
              :key="metkaIndex"
              size="small"
              color="red-lighten-1"
            >
              {{ metka.text }}
            </v-chip>
          </div>

          <div v-else>
            <span class="text-grey">—</span>
          </div>
        </td>
        
      

        <td>
          <v-chip :color="item.type === 'Локальная' ? 'green-lighten-3' : 'blue-lighten-3'" size="small">
            {{ item.type }}
          </v-chip>
        </td>
        
        
        <td>{{ item.login }}</td>
        
        <td style="width: 200px;">
          <v-text-field
            v-if="item.password !== null"
            :type="showPassword[index] ? 'text' : 'password'"
            :model-value="item.password"
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
  localStorage.removeItem('addFormData');
}



</script>
<style>

</style>