import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface FormData {
  metka: MetkaArrayValues[] | null;
  type: RecordType;
  login: string;
  password: string | null;
}

interface MetkaArrayValues {
  text: string;
}

type RecordType = 'Локальная' | 'LDAP' | null;



export const useCounterStore = defineStore('counter', () => {
  
    const addFormData = ref<FormData[]>([]);

    const addForm = (formData: FormData) => {
        addFormData.value.push(formData);
    };

    return {
        addFormData,
        addForm,
    };
})
