import { ref } from 'vue'
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

type RecordType = 'Локальная' | 'LDAP';



export const useCounterStore = defineStore('counter', () => {


  const allData = ref<FormData[]>([]);

    const addFormData = ref<FormData[]>([]);

    
    function addForm (formData: FormData) {
      addFormData.value.push(formData);

      if(localStorage.getItem('addFormData') !== null) {
        const data = JSON.parse(localStorage.getItem('addFormData') || '[]');
        addFormData.value.push(...data);
        localStorage.setItem('addFormData', JSON.stringify(addFormData.value));
        console.log('Успешно сохранено');

      }
      else {
        localStorage.setItem('addFormData', JSON.stringify(addFormData.value));
        console.log('Успешно сохранено');
      }
    };






    function getFormData() {

      if(addFormData.value.length > 0) { 
        allData.value = addFormData.value;
      }
      else {
        const data = JSON.parse(localStorage.getItem('addFormData') || '[]');
        console.log(data);
        if(data) {
          console.log(allData.value);
          if(Array.isArray(data)) {
            allData.value = data;
          }
          else {
            allData.value = [data];
          }
        }
      }
    };

    return {
        addFormData,
        addForm,
        allData,
        getFormData,
    };
})
