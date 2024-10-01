// nel file store inserisco url generico dell'api che devo usare per centralizzarlo con reactive rendo l'elemento reattivo quindi javascript monitorerà qualsiasi cambiamento nei suoi valori e aggiornerà l'UI in automatico

import { reactive } from "vue";

export const store = reactive({
  apiUrl: "http://127.0.0.1:8000/api/",
});
