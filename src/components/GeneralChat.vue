<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card">
					<div class="card-header">Bienvenue dans le Chat général <span class="bold">{{ this.username }}</span></div>
					<div class="card-body" style="max-height: 500px; overflow: auto;">
						<ul class="list-unstyled">
							<li v-for="(mess, index) in this.messages"  v-bind:key="index">
								<div :class="username.trim() === mess.split(':')[0].trim() ? 'containerUserConnected' : 'containerUser'">
									<div :class="username.trim() === mess.split(':')[0].trim() ? ' userConnected' : 'user'">
										<p class="usernameP">{{mess.split(":")[0]}}</p>
									</div>
								</div>
								<div :class="username.trim() === mess.split(':')[0].trim() ? 'textContentConnected' : 'textContent'">
									<p class="borderText">{{mess.split(":")[1] }}<br><span class="time">{{mess.split(":")[2]}}</span></p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div style="margin-top: 15px">
						<form>
							<div class="form-group">
								<textarea class="form-control" id="textArea" rows="3"
									placeholder="Saisissez votre message" v-model="inputMessage"></textarea>
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
import axios from 'axios';
import store from '../store'

export default defineComponent({
	name: "GeneralChat",
	data() {
		return {
			inputMessage: "",
			messages: [],
			time: ""
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

			let now = new Date()
			let hour = now.getHours()
			let min = now.getMinutes()
			this.time = hour+"h"+min
			axios.post('http://localhost:8090/api/publish', {
				topic: "generalChat",
				message: this.username+" : "+this.inputMessage+" : "+this.time
			})
			.then((response) => {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
			console.log(this.messages)
			this.inputMessage = ""
		},
		getClass(mess) {
			console.log(mess.split(":")[0])
			console.log(this.username)
			return {
				'containerUserConnected': mess.split(":")[0] === this.username,
				'containerUser': mess.split(":")[0] !== this.username,
			};
		},
		scrollToBottom() {
    const chatContainer = document.querySelector('.card-body');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
	},
	mounted() {
    setInterval(() => {
      axios.get('http://localhost:8090/api/generalChat')
        .then(response => {
					// console.log(response)
					// console.log(response.data)
          this.messages = response.data;
					this.scrollToBottom();
        })
        .catch(error => {
          console.error(error);
        });
    }, 1000);
  },
})
</script>
<style scoped>
.container {
	margin-top: 5rem;
}
li {
	display: flex;
	flex-direction: column;
	width: 100%;
}
.containerUserConnected {
	width: 100%;
	display: flex;
	justify-content: end;
}
.containerUser {
	width: 100%;
	display: flex;
	justify-content: start;
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
.textContentConnected{
	display: flex;
	justify-content: end;
}
.textContent{
	display: flex;
	justify-content: start;
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