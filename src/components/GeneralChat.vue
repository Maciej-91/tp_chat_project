<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card">
					<div class="card-header">Chat général</div>
					<div class="card-body">
						<ul class="list-unstyled">
							<li>
								<div class="media">
									<img src="https://via.placeholder.com/50" class="mr-3 rounded-circle" alt="...">
									<div class="media-body">
										<h5 class="mt-0 mb-1">Utilisateur 1</h5>
										<p>Bonjour à tous !</p>
										<small>11:20 AM</small>
									</div>
								</div>
							</li>
							<li>
								<div class="media">
									<img src="https://via.placeholder.com/50" class="mr-3 rounded-circle" alt="...">
									<div class="media-body">
										<h5 class="mt-0 mb-1">Utilisateur 2</h5>
										<p>Bonjour Utilisateur 1 !</p>
										<small>11:21 AM</small>
									</div>
								</div>
							</li>
							<li>
								<div class="media">
									<img src="https://via.placeholder.com/50" class="mr-3 rounded-circle" alt="...">
									<div class="media-body">
										<h5 class="mt-0 mb-1">Utilisateur 3</h5>
										<p>Bonjour à tous !</p>
										<small>11:23 AM</small>
									</div>
								</div>
							</li>
						</ul>
						<form>
							<div class="form-group">
								<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Saisissez votre message"></textarea>
							</div>
							<button type="submit" class="btn btn-primary">Envoyer</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
  export default defineComponent ({
    name: "GenrralChat",
	});
</script>
<style scoped>
.container {
	margin-top: 5rem;
}
</style>