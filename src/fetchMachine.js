import { Machine, assign } from "xstate";

export const fetchMachine = Machine({
  initial: "doingNothing",
  context: { pokemon: [], errorMsg: "" },
  states: {
    doingNothing: {
      on: { GET_DATA: "fetching" }
    },
    fetching: {
      invoke: {
        src: () => slowlyFetchPokemon,
        onDone: {
          target: "fetchSuccess",
          actions: assign({
            pokemon: (context, event) => event.data.results
          })
        },
        onError: {
          target: "fetchFailed",
          actions: assign({
            errorMsg: (context, event) => event.data.message
          })
        }
      }
    },
    fetchSuccess: {},
    fetchFailed: {
      on: { TRY_AGAIN: "fetching" }
    }
  }
});

const slowlyFetchPokemon = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    }, 3000);
  });
