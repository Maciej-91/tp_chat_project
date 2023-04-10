<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="info">
			<b-navbar-brand href="#">Chat général</b-navbar-brand>
	
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
	
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item href="#">Mes Chats</b-nav-item>
				</b-navbar-nav>
				
				<b-navbar-nav class="ml-auto" right style="margin-left: auto;">
					<b-nav-item @click="deconnection" class="pr-0">Déconnexion</b-nav-item>
				</b-navbar-nav>

			</b-collapse>
		</b-navbar>
	</div>
</template>
    
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { defineComponent } from 'vue'
export default defineComponent ({
	name: 'NavBar',
	methods : {
		deconnection() {
			this.$router.push('/');
		}
	}
});
</script>
<style>
nav {
	padding: 0.5rem !important;
}
</style>
    