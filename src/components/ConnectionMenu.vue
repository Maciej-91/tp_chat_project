<template>
    <div id="a">
      <div id="nav">
        <router-link to="/">Connection</router-link> |
        <router-link to="/registry">Créer un compte</router-link>
      </div>
    </div>
  </template>

<script>
import { defineComponent } from 'vue'
  export default defineComponent ({
    name: "ConnectionMenu",
	});
</script>
  
  <style lang="scss">
  #a {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  #nav {
    padding: 30px;
  
    a {
      font-weight: bold;
      color: #2c3e50;
  
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  </style>
  