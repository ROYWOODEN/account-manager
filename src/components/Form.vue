<template>
    <v-form>
        <v-text-field label="Метка"
            v-model="metka"
            :counter="50"
        />
        <v-select
            clearable
            label="Тип записи"
            :items="['Локальная', 'LDAP']"
            v-model="type"
        ></v-select>
        <v-text-field 
        label="Логин" 
        v-model="login"
        :counter="100" />

        <v-text-field 
        v-if="type === 'Локальная'" 
        v-model="password"
        label="Пароль"
        :counter="100" />

        <div class="d-flex flex-row align-center justify-center mb-4">
            <v-btn class="mt-4 text-white d-flex align-center justify-center" color="primary" @click="save">Сохранить</v-btn>
        </div>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore();
type RecordType = 'Локальная' | 'LDAP';

interface FormData {
    metka: MetkaArrayValues[] | null;
    type: RecordType;
    login: string;
    password: string | null;
}

interface MetkaArrayValues {
    text: string;
}

const metka = ref<string | null>(null);
const type = ref<RecordType | null>(null);
const login = ref<string>('');
const password = ref<string | null>(null);



const save = () => {
    if(type.value && login.value) {
        if(metka.value) {
            const metkaArray = metka.value.split(';').map(el => el.trim());

            const metkaArrayValues: MetkaArrayValues[] = [];
            
            metkaArray.forEach(el => {
                metkaArrayValues.push({text: el});
            });

            // console.log(metkaArrayValues , 'metkaArrayValues');
          



            const formData: FormData = {
            metka: metkaArrayValues,
            type: type.value,
            login: login.value,
            password: password.value
        }
        counterStore.addForm(formData);
    }   else {
        
        const formData: FormData = {
            metka: null,
            type: type.value,
            login: login.value,
            password: password.value
        }
        counterStore.addForm(formData);
        

    }
}
}





</script>