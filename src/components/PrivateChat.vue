<template>
	<div class="container">
		<div class="subContainer">
			<div class="col-md-8" style="margin-left: 25%;">
				<div class="card">
					<div class="card-header">Bienvenue dans le Chat {{ this.$props.concernedTopic }} <span class="bold">{{
						this.username }}</span></div>
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
import store from '../store'
import mqttService from '@/services/MqttService';

export default defineComponent({
	name: "PrivateChat",
	props: ["concernedTopic"],
	data() {
		return {
			client: null,
			messages: [],
			inputMessage: ""
		}
	},
	computed: {
		username() {
			return store.getters.username
		}
	},
	methods: {
		sendMessage(event) {
			event.preventDefault()
			const client = mqttService.getClient();
			let now = new Date()
			let hour = now.getHours()
			let min = now.getMinutes().toString().padStart(2, '0');
			this.time = hour + "h" + min
			client.publish(this.concernedTopic, `${this.username}:${this.inputMessage}:${this.time}`)
			this.inputMessage = "";
		},
	},
	mounted() {
		const client = mqttService.getClient();
		client.subscribe(this.concernedTopic);
		client.on('message', (topic, message) => {
			this.messages.push(message.toString());
		})
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