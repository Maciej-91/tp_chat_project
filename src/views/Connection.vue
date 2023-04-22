<template>
	<div>
		<ConnectionMenu />
		<div class="container">
			<b-form @submit="onSubmit" @reset="onReset" v-if="show">
				<b-form-group id="input-group-1" label="Nom d'utilisateur:" label-for="input-1" description="">
					<b-form-input id="input-1" v-model="form.username" placeholder="Entrez votre nom d'utilisateur"
						required></b-form-input>
				</b-form-group>

				<div class="center">
					<b-button type="submit" variant="primary">Connection</b-button>
				</div>
			</b-form>
		</div>
	</div>
</template>

<script>
import router from '@/router';
import { defineComponent } from 'vue';
import ConnectionMenu from '../components/ConnectionMenu.vue';
import axios from 'axios';
import store from '../store'
export default defineComponent({
	name: "Connection",
	components: {
		ConnectionMenu
	},
	data() {
		return {
			form: {
				username: '',
			},
			show: true,
			invalidUsername: false,
		}
	},
	// computed: {
	// 	userNameState() {
	// 		return this.invalidUsername
	// 	}
	// },
	methods: {
		// login() {
		// 	console.log(this.username)
		// 	const user = users.users.find((user) => user.username === this.username);
		// 	console.log(user)

		// 	if (user && user.password === this.password) {
		// 		this.showLoginForm = false;
		// 	} else {
		// 		this.invalidUsername = true;
		// 	}
		// },
		onSubmit(event) {
			event.preventDefault();
			console.log(this.form.username)

			axios.post('http://localhost:8090/api/user', {
				username: this.form.username
			})
				.then((response) => {
					console.log(response);
					if(response.data === "Utilisateur enregistré avec succès") {
						console.log("Utilisateur enregistré avec succès")
						store.commit('setUsername', this.form.username)
						this.GoToHomPage()
					}
				})
				.catch(function (error) {
					console.log(error);
				});
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
		},
		GoToHomPage() {
			router.push('/home')
		}
	}
})
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