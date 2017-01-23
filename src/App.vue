<template>
  <div id="app">
    <div class="pokedex">
      <pokedex></pokedex>
    </div>
    <div class="selected">
      <selected v-if="selectedPokemon" :selectedPokemon="selectedPokemon">
      </selected>
    </div>
    <button v-on:click="fetchPokemon">Fetch</button>
    {{ fetching }}
 </div>
</template>

<script>
import Pokedex from './components/Pokedex'
import Selected from './components/Selected'

export default {
  name: 'app',
  components: {
    Pokedex,
    Selected,
  },
  computed: {
    fetching() {
      return this.$store.state.pokeData.fetching;
    },
    selectedPokemon() {
      return this.$store.state.pokeData.selectedPokemon;

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

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.pokedex {
  width: 60%;
  display: inline-block;
}
.selected {
  width: 40%;
  float: right;
}
</style>
