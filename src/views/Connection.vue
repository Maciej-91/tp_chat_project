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
import store from '../store'
import mqtt from 'mqtt'
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
			client: null,
			connectedUsers: []
		}
	},
	computed: {
    username() {
      return store.getters.username
    }
	},
	methods: {
		connection() {
			this.client = mqtt.connect('wss://31c1474781644cc99b02813714a2f9e6.s2.eu.hivemq.cloud:8884/mqtt',
				{
					rejectUnauthorized: false,
					username: 'Maciej',
					password: 'toto123456',
					clientId: this.username,
					protocolId: 'MQTT',
					protocolVersion: 4,
					clean: true,
					reconnectPeriod: 1000,
					connectTimeout: 30 * 1000,
				}
			)
		},
		addUser(user) {
			console.log("adduser")
			console.log(user)
			this.connectedUsers.push(user);
			this.updateConnectedUsers();
			console.log(this.connectedUsers)
		},
		updateConnectedUsers() {
			const message = JSON.stringify(this.connectedUsers);
			this.client.publish('utilisateurs/connectes', message);
		},
		onSubmit(event) {
			event.preventDefault();
			// this.client.publish('utilisateurs/connectés', this.form.username )
			store.commit('setUsername', this.form.username)
			store.commit('addConnectedUser', this.connectedUsers)
			/*axios.post('http://localhost:8090/api/user', {
				username: this.form.username
			})
				.then((response) => {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});*/
			this.GoToHomPage()
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
	},
	mounted() {
		// this.connection()
		// this.client.subscribe('#');
		// this.client.on('message', (topic, message) => {
		// 	if(topic === 'utilisateurs/connectés') {
		// 		console.log(topic)
		// 		console.log(message.toString())
		// 		this.addUser(message.toString())
		// 	}
		// })
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