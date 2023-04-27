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
								<div :class="username === mess.split(':')[0] ? 'containerUserConnected' : 'containerUser'">
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
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import mqttService from '@/services/MqttService';
import store from '../store'

export default defineComponent({
	name: "GeneralChat",
	data() {
		return {
			inputMessage: "",
			messages: [],
			time: "",
			topicList: [],
			client: null,
			isConnected: false,
			topic: 'my-topic',
		}
	},
	computed: {
		username() {
			return store.getters.username
		},
		connectedUsers() {
			return store.getters.connectedUsers
		},
	},
	methods: {
		sendMessage(event) {
			const client = mqttService.getClient();
			event.preventDefault()
			if (this.inputMessage.trim() === '') {
				return;
			} else {
				let now = new Date()
				let hour = now.getHours()
				let min = now.getMinutes().toString().padStart(2, '0');
				this.time = hour + "h" + min
				client.publish(this.topic, `${this.username}:${this.inputMessage}:${this.time}`)
			}
		},
		scrollToBottom() {
			this.$nextTick(() => {
				const chatContainer = document.querySelector('.card-body');
				chatContainer.scrollTop = chatContainer.scrollHeight;
			});
		},
	},
	mounted() {
		const client = mqttService.getClient();
		client.subscribe('my-topic', { qos: 2 });
		client.on('message', (topic, message) => {
			if (topic === 'my-topic') {
				this.messages.push(message.toString());
				setTimeout(() => {
					this.scrollToBottom();
				}, 100);
				this.inputMessage = "";
			}
		});
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