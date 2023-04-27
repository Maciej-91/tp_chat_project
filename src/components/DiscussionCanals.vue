<template>
	<div class="containerDiscussionCanals">
		<GeneralChat @newTopic="handleTopics" v-show="showGeneralChat" @topic-clicked="showPrivateChat = true"/>
		<PrivateChat v-show="showPrivateChat" @back-to-general-chat="showGeneralChat = true" :concernedTopic="concernedTopic"/>
		<div class="col-md-2" style="margin-top: 5rem;">
		<div class="card">
			<div class="card-header">Mes canaux de discussion</div>
			<div class="card-body">
				<ul class="list-unstyled">
					<li @click="switchToGeneralChat()">
						Chat général
					</li>
					<li v-for="(topic, index) in topics" v-bind:key="index" @click="switchToPrivateChat(topic)">
						{{ topic }}
					</li>
				</ul>
			</div>
		</div>
		<div style="margin-top: 15px">
			<form>
				<div class="senButtonDiv">
					<!-- <button type="submit" class="btn btn-primary" @click.prevent="openModal">Créer un canal</button> -->
				</div>
			</form>
		</div>
		<NewCanalModal @newTopic="handlePrivateTopic" />
	</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import NewCanalModal from '../components/NewCanalModal.vue'
import GeneralChat from '../components/GeneralChat.vue'
import PrivateChat from '../components/PrivateChat.vue'
import mqtt from 'mqtt';
import store from '../store'

export default defineComponent({
	name: "DiscussionCanals",
	props: ["topicList"],
	components: {
		NewCanalModal,
		GeneralChat,
		PrivateChat
	},
	data() {
		return {
			showModal: false,
			topics: [],
			showGeneralChat: true,
			showPrivateChat: false,
			concernedTopic: "",
			client: null
		}
	},
	computed: {
		username() {
			return store.getters.username
		},
	},
	methods: {
		listenNewTopic() {
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
			/*this.client.on('connect', () => {
				this.client.subscribe('private') // Abonnez-vous à tous les topics en utilisant le caractère # qui représente tous les niveaux de topic
			})
			this.client.on('message', (topic) => {
				const usersInTopicList = topic.split("/")
				console.log(this.username)
				console.log(usersInTopicList)
				console.log(usersInTopicList.includes(this.username))
				if(usersInTopicList.includes(this.username)) {
					console.log(`${this.username} is in the topic list.`)
				}
				if (!this.topics.includes(topic)) {
					this.topics.push(topic.split("/")[0])
				}
			})*/
		},
		switchToPrivateChat(topic) {
			console.log(topic)
			this.concernedTopic = topic
			// Hide the general chat and show the private chat for the selected topic
			this.showGeneralChat = false;
			this.showPrivateChat = true;
		},
		switchToGeneralChat() {
			// Hide the private chat and show the general chat
			this.showPrivateChat = false;
			this.showGeneralChat = true;
		},
		handleTopics(data) {
			console.log(data)
			console.log(data.length)
			if(!this.topics.includes(data) && data.length > 0) {
				console.log("in if")
				this.topics.push(data)
			}
		},
		handlePrivateTopic(data) {
			console.log(typeof data)
			console.log("handleprivate")
			const usersInTopicList = data.toString().split("/")
			if(usersInTopicList.includes(this.username)) {
				console.log(`${this.username} is in the topic list.`)
				if (!this.topics.includes(usersInTopicList[0])) {
					this.topics.push(usersInTopicList[0])
				}
			}
		}
	},
	mounted() {
		// console.log("DiscussionCanals mounte")
		// // this.listenNewTopic()
		// this.client.subscribe('private');
		// this.client.on('message', (topic, message) => {
		// 	console.log(message)
		// 	console.log(topic)
		// })
	},
	/*watch: {
		topics(newTopic, oldTopic) {
			console.log("watch topic")
			if (newTopic !== oldTopic) {
				this.topics.push(newTopic)
			}
		},
	}*/
})
</script>
<style scoped>
.containerDiscussionCanals {
	display: flex;
	margin-top: 5rem;
}
.card-body {
	overflow: auto;
	height: 300px;
	padding: 0;
}
li {
	padding: 0.5rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.175);
	background-color: #34E563;
	border-radius: 0px 0px 5px 5px;
}
</style>