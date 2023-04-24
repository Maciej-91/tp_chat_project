<template>
	<div>
		<b-button @click="showModal = true">Créer un canal</b-button>

		<b-modal v-model="showModal" title="Créer un nouveau canal de discussion">
			<div>
				<b-form-input v-model="canalName" placeholder="Entrez le nom du canal"></b-form-input>
			</div>
			<div class="selectClass">
				<b-form-select v-model="selectedUsers" :options="users" multiple :select-size="4"></b-form-select>
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
import axios from 'axios';

export default defineComponent({
	name: "NewCanalModal",
	data() {
		return {
			showModal: false,
			canalName: '',
			selectedUsers: [],
			users: [],
		}
	},
	methods: {
		createCanal() {
			const canal = {
				name: this.canalName,
				users: this.selectedUsers
			};
			console.log(canal)
			axios.post('http://localhost:8090/api/publishCanal', {
				topic: this.canalName,
				users: this.users
			})
			.then((response) => {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
			this.showModal = false;
		},
		getAllUsers() {
			let jsonUsers
			axios.get('http://localhost:8090/api/users')
				.then((response) => {
					jsonUsers = response.data
					this.users = jsonUsers.map((item) => JSON.parse(item).username);
					console.log(this.users)
				})
				.catch((error) => {
					console.log(error);
				});
		}
	},
	mounted() {
		this.getAllUsers()
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