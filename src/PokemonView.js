import React from "react";

export const PokemonView = ({ pokemon }) => (
  <ul>
    {pokemon.map(p => (
      <li key={p.name}>{p.name}</li>
    ))}
  </ul>
);
