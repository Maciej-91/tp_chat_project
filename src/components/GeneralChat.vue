<template>
	<div class="container">
		<div class="subContainer">
			<div class="col-md-8" style="margin-left: 25%;">
				<div class="card">
					<div class="card-header">Bienvenue dans le Chat général <span class="bold">{{ this.username }}</span>
					</div>
					<div class="card-body" style="max-height: 500px; overflow: auto;">
						<ul class="list-unstyled">
							<p v-if="this.messages.length === 0" style="text-align: center;">Soyez le premiez à envoyer un
								message <span class="bold">{{ this.username }}</span></p>
								<li v-for="(mess, index) in this.messages" v-bind:key="index">
									<div
										:class="username === mess.split(':')[0] ? 'containerUserConnected' : 'containerUser'">
										<div :class="username === mess.split(':')[0] ? ' userConnected' : 'user'">
											<p class="usernameP">{{ mess.split(":")[0] }}</p>
										</div>
									</div>
									<div
										:class="username.trim() === mess.split(':')[0].trim() ? 'textContentConnected' : 'textContent'">
										<p class="borderText">{{ mess.split(":")[1] }}<br><span class="time">{{
											mess.split(":")[2] }}</span></p>
									</div>
								</li>
							<!--<li v-for="(mess, index) in this.messages" v-bind:key="index">
								<div
									:class="username.trim() === mess.split(':')[0].trim() ? 'containerUserConnected' : 'containerUser'">
									<div :class="username.trim() === mess.split(':')[0].trim() ? ' userConnected' : 'user'">
										<p class="usernameP">{{ mess.split(":")[0] }}</p>
									</div>
								</div>
								<div
									:class="username.trim() === mess.split(':')[0].trim() ? 'textContentConnected' : 'textContent'">
									<p class="borderText">{{ mess.split(":")[1] }}<br><span class="time">{{
										mess.split(":")[2] }}</span></p>
								</div>
							</li>-->
						</ul>
					</div>
				</div>
				<div style="margin-top: 15px">
					<form>
						<div class="form-group">
							<textarea class="form-control" id="textArea" rows="3" placeholder="Saisissez votre message"
								v-model="inputMessage"></textarea>
						</div>
						<div class="senButtonDiv">
							<button type="submit" class="btn btn-primary" @click="sendMessage">Envoyer</button>
						</div>
					</form>
				</div>
			</div>
			<DiscussionCanals :topicList="topicList" />
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import mqtt from 'mqtt'
import store from '../store'
import DiscussionCanals from '../components/DiscussionCanals.vue';

export default defineComponent({
	name: "GeneralChat",
	components: {
		DiscussionCanals,
	},
	data() {
		return {
			inputMessage: "",
			messages: [],
			time: "",
			topicList: [],
			client: null,
			isConnected: false,
			message: '',
			topic: 'my-topic',
			//connectedUsers: []
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

			this.client.on('connect', () => {
				console.log('Connected to MQTT broker');
				this.isConnected = true;
			});

			this.client.on('message', (topic, message) => {
				console.log(`Received message on topic ${topic}: ${message.toString()}`);
			});

			this.client.on('error', (err) => {
				console.error('Error connecting to MQTT broker', err);
				this.isConnected = false;
			});
		},
		sendMessage(event) {
			event.preventDefault()
			if (this.isConnected) {
				let now = new Date()
				let hour = now.getHours()
				let min = now.getMinutes().toString().padStart(2, '0');
				this.time = hour + "h" + min
				this.client.publish(this.topic, `${this.username}:${this.inputMessage}:${this.time}`)
			} else {
				console.error('not send message')
			}
		},
		scrollToBottom() {
			this.$nextTick(() => {
				const chatContainer = document.querySelector('.card-body');
				chatContainer.scrollTop = chatContainer.scrollHeight;
			});
		},
		/*addUser(user) {
			console.log("adduser")
			console.log(user)
			this.connectedUsers.push(user);
			this.updateConnectedUsers();
			console.log(this.connectedUsers)
		},
		updateConnectedUsers() {
			const message = JSON.stringify(this.connectedUsers);
			this.client.publish('utilisateurs/connectes', message);
		},*/
	},
	mounted() {
		this.connection();
		// this.addUser(this.username)
		this.client.subscribe('#');
		this.client.on('message', (topic, message) => {
			// if(topic === 'utilisateurs/connectés') {
			// 	console.log(topic)
			// 	console.log(message)
			// 	//this.addUser(message.toString())
			// 	this.connectedUsers = message.toString();
			// }
			if(topic === 'my-topic') {
				console.log(topic)
				console.log(message)
				console.log(`Received message on topic ${topic}: ${message.toString()}`);
				// Mettez à jour la liste des messages avec le nouveau message reçu
				this.messages.push(message.toString());
				setTimeout(() => {
					this.scrollToBottom();
					}, 100);
				this.inputMessage = "";
			}
		});
			console.log(this.connectedUsers)
		// this.client.subscribe('my-topic');
		// this.client.on('message', (topic, message) => {
		// 	console.log(topic)
		// 	console.log(message)
		// 	console.log(`Received message on topic ${topic}: ${message.toString()}`);
		// 	// Mettez à jour la liste des messages avec le nouveau message reçu
		// 	this.messages.push(message.toString());
		// 	setTimeout(() => {
		// 		this.scrollToBottom();
		// 		}, 100);
		// 	this.inputMessage = "";
		// });
	},
})
</script>
<style scoped>
.container {
	margin-top: 5rem;
	margin-left: 0;
	margin-right: 0;
}

.subContainer {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

li {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.containerUserConnected {
	width: 100%;
	display: flex;
	justify-content: flex-end;
}

.containerUser {
	width: 100%;
	display: flex;
	justify-content: flex-start;
}

.userConnected {
	width: auto;
	padding: 0.6rem;
	background-color: #5255A1;
	border-radius: 20px;
	color: white;
}

.user {
	width: auto;
	padding: 0.6rem;
	background-color: #34E563;
	border-radius: 20px;
	color: white;
}

.usernameP {
	margin-top: auto;
	margin-bottom: auto;
	width: 100%;
}

.textContentConnected {
	display: flex;
	justify-content: flex-end;
}

.textContent {
	display: flex;
	justify-content: flex-start;
}

.borderText {
	border: 1px solid #CFDAD2;
	border-radius: 10px;
	padding: 0.5rem;
	margin-top: 5px;
	background-color: #CFDAD2;
	max-width: 300px;
}

.bold {
	font-weight: 700;
}

.senButtonDiv {
	display: flex;
	justify-content: flex-end;
	padding: 1rem;
}

.time {
	font-size: 11px;
}
</style>