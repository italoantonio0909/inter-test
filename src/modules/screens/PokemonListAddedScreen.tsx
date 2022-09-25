import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import {useEffect} from 'react';
import {PokemonListSelected} from '../interfaces/PokemonListSelected';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {pokemonUpdateList} from '../slices/pokemonSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <Text style={tw`text-center py-5 text-xl`}>Pokemon added</Text>
      {pokemonListSelected && (
        <FlatList
          data={pokemonListSelected}
          keyExtractor={item => `pokemon-reference-${item?.order}`}
          renderItem={({item: {name, order, species, moves}}) => (
            <TouchableOpacity
              style={tw`flex-row justify-between items-center px-10`}>
              <View>
                <Text>{name}</Text>
                <Text>{order}</Text>
              </View>
              <View>
                {moves && moves.slice(0, 5).map(e => <Text>{e.name}</Text>)}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default PokemonListAddedScreen;
