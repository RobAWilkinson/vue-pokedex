// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'
import App from './App.vue'


Vue.use(Vuex);
const API_URL = 'http://pokeapi.co/api/v2/'
const types = {
  REQUEST_POKEDEX_BEGIN: 'requestPokedexBegin',
  REQUEST_POKEDEX_SUCCESS: 'requestPokedexSuccess',
};
const store = new Vuex.Store({
  plugins: [createLogger()],
  state: {
    count: 0,
    pokeData: {
      fetching: false,
    }
  },
  mutations: {
    increment(state) {
      state.count = state.count + 1;
    },
    requestPokedexBegin(state) {
      state.pokeData = {
        ...state.pokeData,
        fetching: true,
      };
    },
    requestPokedexSuccess(state, { pokedex}) {
      state.pokeData = {
        ...state.pokeData,
        fetching: false,
        pokedex,
      }
    }
  },
  actions: {
    getPokemon({commit, state}) {
      commit({type: types.REQUEST_POKEDEX_BEGIN });
      fetch(API_URL + `pokedex/2`)
      .then(resp => resp.json())
      .then(pokedex => {
        const mutation = { type: types.REQUEST_POKEDEX_SUCCESS, pokedex }
        return commit(mutation)
      });
    }
  }
});

// can also use vuex.mapState here, acts as mapStateToProps in redux

// actions are passed in by calling store.commit({type: STRING, ...data })
// this fires the mutation of the same name
// user store.dispatch for async
const Counter = {
  template: `<h1>{{ fetching }}</h1>`,
  computed: {
    fetching() {
      return this.$store.state.pokeData.fetching;
    }
  }
}
const Pokemon = {
  props: [ 'pokemon'],
  template: `
    <div>
      {{ pokemon.pokemon_species.name }}
    </div>
  `,
};
const Pokedex = {
  components: { Pokemon },
  template: `
  <div>
    <h3>Pokedex</h3>
      {{ pokedexEntries.length }}
      <div v-for="pokemon in pokedexEntries" >
        <pokemon :pokemon="pokemon"></pokemon>
      </div>
  </div>
    `,
  computed: {
    pokedexEntries() {
      console.log('HERE', this.$store.state.pokeData);
      if(this.$store.state.pokeData.pokedex) {
        console.log('HERE')
        return this.$store.state.pokeData.pokedex.pokemon_entries;
      } else {
        return []
      }
    }
  }
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // state
  store,
  computed: {
    count() {
      console.log(this.$store);
      return this.$store.count;
    },
  },
  components: {
    App
  },
  // view
  template: `
    <div>
      <app></app>
    </div>
  `,
  // actions
  methods: {
    increment() {
      store.commit({ type: 'increment' });
    },
    fetchPokemon() {
      store.dispatch('getPokemon')
    }
  },
});
