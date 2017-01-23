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
    },
    fetchPokemonandSelectCurrent(state, { pokemon }) {
      console.log(JSON.parse(JSON.stringify(pokemon)));
      state.pokeData = {
          ...state.pokeData,
          pokemon: {
            ...state.pokeData.pokemon,
          },
          selectedPokemon: pokemon
      }
    }
  },
  actions: {
    fetchDetails({commit, state}, pokemon) {
      const url = pokemon.pokemon_species.url
      const number = pokemon.entry_number
      fetch(url)
      .then(resp => resp.json())
      .then(pokemon => {
        const mutation = {
          type: 'fetchPokemonandSelectCurrent',
          pokemon,
        };
        return commit(mutation);
      })

      // fetch(data)



    },
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // state
  store,
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
});
