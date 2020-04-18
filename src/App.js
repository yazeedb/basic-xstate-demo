import React from "react";
import { useMachine } from "@xstate/react";
import "./styles.css";
import { fetchMachine } from "./fetchMachine";
import { PokemonView } from "./PokemonView";

export default function App() {
  const [current, send] = useMachine(fetchMachine);

  switch (current.value) {
    case "doingNothing":
      return (
        <div>
          <h1>Hello there.</h1>
          <button onClick={() => send("GET_DATA")}>
            Click here to fetch Pokemon
          </button>
        </div>
      );

    case "fetching":
      return <h1>Fetching Pokemon now...</h1>;

    case "fetchSuccess":
      return (
        <div>
          <h1>I got them!</h1>
          <PokemonView pokemon={current.context.pokemon} />
        </div>
      );

    case "fetchFailed":
      return (
        <div>
          <h1 className="error">Uh-oh, error! {current.context.errorMsg}</h1>
          <button onClick={() => send("TRY_AGAIN")}>
            Click here to try again
          </button>
        </div>
      );

    default:
      // This should never happen.
      return null;
  }
}
