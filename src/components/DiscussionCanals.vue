<template>
	<div class="col-md-3">
		<div class="card">
			<div class="card-header">Mes canaux de discussion</div>
			<div class="card-body">
				<ul class="list-unstyled">
					<li v-for="(topic, index) in topicListCanal" v-bind:key="index">
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
		<NewCanalModal />
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import NewCanalModal from '../components/NewCanalModal.vue'

export default defineComponent({
	name: "DiscussionCanals",
	props: ["topicList"],
	components: {
		NewCanalModal
	},
	data() {
		return {
			showModal: false,
			topicListCanal: []
		}
	},
	methods: {
	},
	watch: {
		topicList(newTopic, oldTopic) {
			if (newTopic !== oldTopic) {
				this.topicListCanal.push(newTopic)
			}
		},
	}
})
</script>
<style scoped>
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