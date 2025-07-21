<template>
    <v-form>
        <v-text-field label="Метка (введите метки через ;)"
            v-model="metka"
            :counter="50"
            :error="metkaError"
            @blur="validateMetka"
        />
        <v-select
            clearable
            label="Тип записи"
            :items="['Локальная', 'LDAP']"
            v-model="type"
            required
            :error="typeError"
            @update:model-value="validateType"
        ></v-select>
        <v-text-field 
        label="Логин" 
        v-model="login"
        :counter="100"
        required
        :error="loginError"
        @blur="validateLogin"
        />

        <v-text-field 
        v-if="type === 'Локальная'" 
        v-model="password"
        label="Пароль"
        :counter="100"
        required
        :error="passwordError"
        @blur="validatePassword" />

        <div class="d-flex flex-row align-center justify-center mb-4">
            <v-btn class="mt-4 text-white d-flex align-center justify-center" color="primary" @click="checkForm">Сохранить</v-btn>
        </div>
    </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

import type { FormData, RecordType, MetkaArrayValues } from '@/composable/types';


const props = defineProps<{
    toggleIcon: () => void;
}>();

const counterStore = useCounterStore();

const metka = ref<string | null>(null);
const type = ref<RecordType | null>(null);
const login = ref<string>('');
const password = ref<string | null>(null);


const metkaError = ref<boolean>(false);
const typeError = ref<boolean>(false);
const loginError = ref<boolean>(false);
const passwordError = ref<boolean>(false);


const validateMetka = () => {
    if (metka.value && metka.value.length > 50) {
        metkaError.value = true;
    } else {
        metkaError.value = false;
    }
};

const validateType = () => {
    if (!type.value) {
        typeError.value = true;
    } else {
        typeError.value = false;
    }
};

const validateLogin = () => {
    if (!login.value.trim()) {
        loginError.value = true;
    } else if (login.value.length > 100) {
        loginError.value = true;
    } else {
        loginError.value = false;
    }
};

const validatePassword = () => {
    if (type.value === 'Локальная' && !password.value) {
        passwordError.value = true;
    } else if (password.value && password.value.length > 100) {
        passwordError.value = true;
    } else {
        passwordError.value = false;
    }
};

function checkForm() {

    validateMetka();
    validateType();
    validateLogin();
    validatePassword();

    if (metkaError.value || typeError.value || loginError.value || passwordError.value) {
        counterStore.ShowError('Пожалуйста, исправьте ошибки в форме');
        return;
    }

    save();
}


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

    metka.value = null;
    type.value = null;
    login.value = '';
    password.value = null;
    
    metkaError.value = false;
    typeError.value = false;
    loginError.value = false;
    passwordError.value = false;
    
    props.toggleIcon();
}
}





</script>