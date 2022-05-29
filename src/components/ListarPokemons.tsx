import { FC, useEffect } from "react";
import ListarPokemonsItem from "./ListarPokemonsItem";
import { buscarPokemons } from "../queries/pokemon.queries";
import { Pokemon } from "../types/pokemon.types";
import { extractPokemonId } from "../services/pokemon.services";
import { useQuery } from "react-query";
import { connect, ConnectedProps } from "react-redux";
import { selecionarPokemon } from "../actions/pokemonActions";
import { IRootState } from "../store/store";

const mapState = (state: IRootState) => ({
  procurar: state.pokemon.procurar,
});

const mapDispatch = {
  selecionarPokemon,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

/**
 * Visualizar uma lista de pokemons
 *
 * Ex:
 * <pre>
 *     <ListarPokemons />
 *
 * </pre>
 *
 * @author Digital House
 */
const ListarPokemons: FC<PropsFromRedux> = ({
  procurar,
  selecionarPokemon,
}: PropsFromRedux) => {
  // Usamos useQuery para procurar os pokemons com a entrada que vem do redux
  const {
    data: pokemons,
    isLoading,
    refetch,
  } = useQuery("obterPokemons", () => buscarPokemons(procurar));
  useEffect(() => {
    if (procurar) {
      refetch();
    }
  }, [procurar, refetch]);

  const onSelecionarPokemon = (pokemon: Pokemon) => {
    selecionarPokemon(pokemon);
  };

  if (isLoading) return <div>Carregando Pokémon....</div>;
  return (
    <div id="listarCategorias">
      {pokemons &&
        pokemons.map((pokemon: Pokemon) => (
          <ListarPokemonsItem
            pokemon={pokemon}
            selecionarPokemon={onSelecionarPokemon}
            key={extractPokemonId(pokemon.url)}
          />
        ))}
    </div>
  );
};

export default connector(ListarPokemons);
