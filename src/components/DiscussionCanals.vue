<template>
	<div class="containerDiscussionCanals">
		<PrivateChat v-if="currentChat !== 'general' && currentChat !== null" :concernedTopic="concernedTopic" />
		<GeneralChat v-else/>
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
import mqttService from '@/services/MqttService';
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
			client: null,
			currentChat: "general"
		}
	},
	computed: {
		username() {
			return store.getters.username
		},
	},
	methods: {
		listenNewTopic() {
			const client = mqttService.getClient();
			client.on('connect', () => {
				client.subscribe('private')
			})
			client.on('message', (topic) => {
				if (!this.topics.includes(topic)) {
					this.topics.push(topic.split("/")[0])
				}
			})
		},
		switchToPrivateChat(topic) {
			this.currentChat = topic;
			this.concernedTopic = topic
		},
		switchToGeneralChat() {
			this.currentChat = "general";
		},
		handleTopics(data) {
			if (!this.topics.includes(data) && data.length > 0) {
				this.topics.push(data)
			}
		},
		handlePrivateTopic(data) {
			const usersInTopicList = data.toString().split("/")
			if (usersInTopicList.includes(this.username)) {
				if (!this.topics.includes(usersInTopicList[0])) {
					this.topics.push(usersInTopicList[0])
				}
			}
		}
	},
	mounted() {
		const client = mqttService.getClient();
		client.subscribe('private');
		client.on('message', (topic, message) => {
			if(topic === 'private') {
			const usersInTopicList = message.toString().split("/")
			if (usersInTopicList.includes(this.username)) {
				if (!this.topics.includes(usersInTopicList[0])) {
					this.topics.push(usersInTopicList[0])
				}
			}
			}
		})
	},
	watch: {
		topics(newTopic, oldTopic) {
			if (newTopic !== oldTopic) {
				this.topics.push(newTopic)
			}
		},
	}
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