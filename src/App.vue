<template>
  <div id="app">
    <pokedex></pokedex>
    <button v-on:click="fetchPokemon">Fetch</button>
    {{ fetching }}

  </div>
</template>

<script>
import Pokedex from './components/Pokedex'

export default {
  name: 'app',
  components: {
    Pokedex,
  },
  computed: {
    fetching() {
      return this.$store.state.pokeData.fetching;
    }
  },
  
  methods: {
    increment() {
      this.$store.commit({ type: 'increment' });
    },
    fetchPokemon() {
      this.$store.dispatch('getPokemon')
    }
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
