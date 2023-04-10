<template>
  <div class="home">
    <NavBar />
    <GeneralChat />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import GeneralChat from '@/components/GeneralChat.vue'
export default {
  name: 'Home',
  components: {
    NavBar,
    GeneralChat
  }
}
</script>
