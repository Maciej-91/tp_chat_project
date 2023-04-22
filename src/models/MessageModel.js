// Importation de Vue.js
import Vue from 'vue';

// Définition du modèle Message
const Message = Vue.extend({
  data() {
    return {
      topic: '',
      message: '',
    };
  },
});

// Exportation du modèle User
export default Message;
