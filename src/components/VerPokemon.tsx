import { FC, useEffect } from "react";
import { useQuery } from "react-query";
import { getPokemon } from "../queries/pokemon.queries";
import { connect, ConnectedProps } from "react-redux";
import { IRootState } from "../store/store";
import { Pokemon } from "../types/pokemon.types";

type VerPokemonDetalheProps = {
  pokemonSelecionado: Pokemon;
};

const VistaPokemonDetalle: FC<VerPokemonDetalheProps> = ({
  pokemonSelecionado,
}: VerPokemonDetalheProps) => {
  const {
    data: pokemon,
    isLoading,
    refetch,
  } = useQuery("obterPokemon", () => getPokemon(pokemonSelecionado.name));

  useEffect(() => {
    if (pokemonSelecionado) {
      refetch();
    }
  }, [refetch, pokemonSelecionado, pokemonSelecionado?.name]);
  if (isLoading) return <div>Carregando Pokémon...</div>;

  return pokemon ? (
    <div className="verPokemon">
      <h4>Pokemon: {pokemon.name}</h4>
      <h5>#{pokemon.id}</h5>
      <img src={pokemon.sprites.other.home.front_default} alt={pokemon.name} />
    </div>
  ) : null;
};

const mapState = (state: IRootState) => ({
  pokemonSelecionado: state.pokemon.pokemonSelecionado,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const VerPokemon: FC<PropsFromRedux> = ({
  pokemonSelecionado,
}: PropsFromRedux) => {
  if (!pokemonSelecionado) return <></>;
  return <VistaPokemonDetalle pokemonSelecionado={pokemonSelecionado} />;
};

export default connector(VerPokemon);
