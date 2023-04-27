<template>
	<div>
		<b-button @click="showModal = true">Créer un canal</b-button>

		<b-modal v-model="showModal" title="Créer un nouveau canal de discussion">
			<div>
				<b-form-input v-model="canalName" placeholder="Entrez le nom du canal"></b-form-input>
			</div>
			<div class="selectClass">
				<b-form-select v-model="selectedUsers" :options="connectedUsers" multiple :select-size="4"></b-form-select>
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
import mqttService from '@/services/MqttService';
export default defineComponent({
	name: "NewCanalModal",
	data() {
		return {
			client: null,
			showModal: false,
			canalName: '',
			selectedUsers: [],
			users: [],
		}
	},
	computed: {
		username() {
			return store.getters.username
		},
		connectedUsers() {
			const connectedUsers = store.getters.connectedUsers[0];
			return connectedUsers.filter(username => username !== this.username);
		}

	},
	methods: {
		createCanal() {
			if(this.canalName === '' || this.selectedUsers.length === 0) {
				return
			} else {
				const client = mqttService.getClient();
				const privateTopic = `${this.canalName}/${this.username}/${this.selectedUsers.join('/')}`
				client.publish('private', privateTopic)
				this.showModal = false;
				this.$emit('newTopic', privateTopic)
				this.canalName = ""
			}
		},
	},
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