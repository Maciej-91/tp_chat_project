<template>
	<div>
		<b-button @click="showModal = true">Créer un canal</b-button>

		<b-modal v-model="showModal" title="Créer un nouveau canal de discussion">
			<div>
				<b-form-input v-model="canalName" placeholder="Entrez le nom du canal"></b-form-input>
			</div>
			<div class="selectClass">
				<b-form-select v-model="selectedUsers" :options="users" multiple :select-size="4"></b-form-select>
				<!-- <ul>
					<li v-for="user in connectedUsers" :key="user">{{ user }}</li>
				</ul> -->
			</div>
			<template #modal-footer>
				<b-button variant="primary" @click="createCanal()">Créer</b-button>
				<b-button variant="secondary" @click="showModal = false">Annuler</b-button>
			</template>
		</b-modal>
	</div>
</template>
  

<script>
import { defineComponent } from 'vue';
import store from '../store'
import mqtt from 'mqtt'
import axios from 'axios';
export default defineComponent({
	name: "NewCanalModal",
	data() {
		return {
			client: null,
			showModal: false,
			canalName: '',
			selectedUsers: [],
			users: [],
			connectedUsers: []
		}
	},
	computed: {
		username() {
			return store.getters.username
		},
		// connectedUsers() {
		// 	return store.getters.connectedUsers
		// }
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
		createCanal() {
			const privateTopic = `${this.canalName}/${this.username}/${this.users.join('/')}`
			console.log(privateTopic)
			this.client.publish('private', privateTopic)
			this.showModal = false;
			this.$emit('newTopic', privateTopic)
		},
		/*sendTopicName() {
			axios.post('http://localhost:8090/api/subscribe', { topicName: this.canalName })
				.then(response => {
					console.log(response.data)
				})
				.catch(error => {
					console.log(error)
				})
		},
		createCanal() {
			console.log(this.selectedUsers)
			const canal = {
				name: this.canalName,
				users: this.selectedUsers
			};
			console.log(canal)
			this.selectedUsers.push(this.username)
			axios.post('http://localhost:8090/api/subscribe', { topicName: this.canalName })
				.then(response => {
					console.log(response.data)
				})
				.catch(error => {
					console.log(error)
				})
			axios.post('http://localhost:8090/api/publishCanal', {
				topic: this.canalName,
				users: this.selectedUsers
			})
				.then((response) => {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
			this.showModal = false;
		},*/
		getAllUsers() {
			let jsonUsers
			axios.get('http://localhost:8090/api/users')
				.then((response) => {
					jsonUsers = response.data
					this.users = jsonUsers.map((item) => JSON.parse(item).username).filter(name => name !== this.username);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	},
	mounted() {
		this.connection()
		setInterval(() => {
			this.getAllUsers()
		}, 1000);
		// console.log(this.connectedUsers)
		// console.log(this.username)
		// this.client.subscribe('private');
		// this.client.on('message', (topic, message) => {
			// if (topic === 'utilisateurs/connectés') {
			// 	this.connectedUsers = JSON.parse(message.toString())
			// 	this.client.publish('utilisateurs/connectés', JSON.stringify(this.connectedUsers))
			// }
		// 	console.log(topic)
		// 	console.log(message)
		// 	console.log(`Received message on topic ${topic}: ${message.toString()}`);
		// 	this.$emit('newTopic', message)
		// });
		/*this.client.subscribe('users');
		this.client.on('message', (topic, message) => {
			console.log(topic)
			console.log(message)
			this.connectedUsers.push(message.toString())
		})*/
		console.log(this.connectedUsers)
	}
})
</script>
<style scoped>
.selectClass {
	display: flex;
	justify-content: center;
	margin-top: 0.5rem;
}

select {
	width: 80%;
}
</style>