import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/useRedux';
import {pokemonUpdateList} from '../slices/pokemonSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PokemonListSelected} from '../interfaces/PokemonListSelected';

const PokemonListAddedScreen = () => {
  const dispatch = useAppDispatch();

  const {pokemonListSelected} = useAppSelector(state => state.pokemon);

  useEffect(() => {
    const checkIfPokemonListIsEmpty = async () => {
      if (pokemonListSelected.length === 0) {
        const value = await AsyncStorage.getItem('@storage_pokemons');

        if (value !== null) {
          const pokemons: Array<PokemonListSelected> = JSON.parse(value);
          dispatch(pokemonUpdateList(pokemons));
        }
      }
    };

    checkIfPokemonListIsEmpty();
  }, []);

  return (
    <SafeAreaView style={tw`bg-black`}>
      <Text style={tw`text-center py-5 text-xl`}>Pokemon added</Text>
      {pokemonListSelected && (
        <FlatList
          data={pokemonListSelected}
          keyExtractor={item => `${item?.order}`}
          renderItem={({item: {name, order, species, moves}}) => (
            <TouchableOpacity
              key={`pokemon-added-${name}`}
              style={tw`flex-row justify-between items-center px-10`}>
              <View>
                <Text>{name}</Text>
                <Text>{order}</Text>
              </View>
              <View>
                {moves &&
                  moves
                    .slice(0, 5)
                    .map(e => (
                      <Text key={`pokemon-added-moves-${name}`}>{e.name}</Text>
                    ))}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default PokemonListAddedScreen;
