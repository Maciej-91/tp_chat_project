<template>
  <div>
		<ConnectionMenu/>
    <div class="container">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Nom d'utilisateur:"
          label-for="input-1"
          description=""
        >
          <b-form-input
            id="input-1"
            v-model="form.username"
            type="username"
            placeholder="Entrez votre nom d'utilisateur"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Mot de passe:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Entrez votre mot de passe"
            required
          ></b-form-input>
        </b-form-group>
        <div class="center">
          <b-button type="submit" variant="primary">Enregistrer</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ConnectionMenu from '../components/ConnectionMenu.vue'
  export default defineComponent ({
    name: "Regisrty",
		components: {
			ConnectionMenu
		},
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.username = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  });
</script>
<style scoped>
	form {
		width: 50%;
	}
	.container {
		display: flex;
		width: 50% !important;
		justify-content: center;
		margin-top: 5rem;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		padding: 3rem;
	}
	#input-group-1 {
		text-align: start;
		margin-bottom: 1rem;
	}
	#input-group-2 {
		text-align: start;
		margin-bottom: 1rem;
	}
  .center {
		display: flex;
		justify-content: center;
	}
</style>