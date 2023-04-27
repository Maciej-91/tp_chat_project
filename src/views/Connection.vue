<template>
	<div>
		<div class="container">
			<b-form @submit="onSubmit" v-if="show">
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
import store from '../store'
import mqtt from 'mqtt'
import mqttService from '@/services/MqttService';
export default defineComponent({
	name: "Connection",
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
					protocolId: 'MQTT',
					protocolVersion: 4,
					clean: true,
					reconnectPeriod: 1000,
					connectTimeout: 30 * 1000,
				}
			)
		},
		addUser(user) {
			this.connectedUsers.push(user);
			this.updateConnectedUsers();
		},
		updateConnectedUsers() {
			const message = JSON.stringify(this.connectedUsers);
			this.client.publish('utilisateurs/connectes', message);
		},
		onSubmit(event) {
			event.preventDefault();
			this.client.publish('utilisateurs/connectés', this.form.username )
			store.commit('setUsername', this.form.username)
			store.commit('addConnectedUser', this.connectedUsers)
			this.GoToHomPage()
		},
		GoToHomPage() {
			router.push('/home')
		}
	},
	mounted() {
		this.connection()
		this.client.subscribe('#');
		this.client.on('message', (topic, message) => {
			if(topic === 'utilisateurs/connectés') {
				this.addUser(message.toString())
			}
		})
	},
	created() {
		mqttService.connect('Maciej', 'toto123456');
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