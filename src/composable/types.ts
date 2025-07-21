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

  export type { FormData, MetkaArrayValues, RecordType };

