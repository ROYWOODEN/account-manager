import { ref } from 'vue'
import { defineStore } from 'pinia'

interface FormData {
  metka?: MetkaArrayValues[] | null;
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
  const error = ref<string>('');

    
    function addForm (formData: FormData) {

        const data = JSON.parse(localStorage.getItem('addFormData') || '[]') as FormData[];
        const  updates = [...data, formData];
        localStorage.setItem('addFormData', JSON.stringify(updates));
        console.log('Успешно сохранено');
        getFormData();
        
    };






    function getFormData() {

        const data = JSON.parse(localStorage.getItem('addFormData') || '[]');
        console.log(data);
        if(data) {
          // console.log(allData.value);
          if(Array.isArray(data)) {
            allData.value = data.reverse();
          }
          else {
            allData.value = [data].reverse();
          }
        }
    };






    function ShowError(err: string) {
      error.value = err;
      setTimeout(() => {
        error.value = '';
      }, 3000);
    }

    return {
        addForm,
        allData,
        getFormData,
        error,
        ShowError,
    };
})
