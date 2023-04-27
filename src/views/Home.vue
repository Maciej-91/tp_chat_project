<template>
  <div class="home">
    <NavBar />
    <div>
      <DiscussionCanals />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import DiscussionCanals from '@/components/DiscussionCanals.vue'
export default {
  name: 'Home',
  components: {
    NavBar,
    DiscussionCanals
  }
}
</script>
