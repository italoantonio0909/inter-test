import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {useState} from 'react';
import {Input} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../../../hooks/useRedux';
import {pokemonAddList} from '../slices/pokemonSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {usePokemonSearchBynameQuery} from '../slices/pokemonApiSlice';
import {PokemonListSelected} from '../interfaces/PokemonListSelected';

const PokemonSearchScreen = () => {
  const dispatch = useAppDispatch();

  const [pokemonName, setPokemonName] = useState<string>('');

  const {PokemonListSelected} = useAppSelector(state => state.pokemon);

  const {data, isFetching} = usePokemonSearchBynameQuery(
    {
      name: pokemonName,
    },
    {skip: pokemonName.length === 0 || pokemonName.length < 3},
  );

  const pokemonAddListAction = async (data: PokemonListSelected) => {
    dispatch(pokemonAddList(data));

    await saveStoragePokemons(data);

    Alert.alert('Pokemon added to list collection.');
  };

  const saveStoragePokemons = async (data: PokemonListSelected) => {
    // await AsyncStorage.removeItem('@storage_pokemons');
    try {
      const pokemons = await AsyncStorage.getItem('@storage_pokemons');

      if (pokemons != null) {
        const pokemonsList: Array<PokemonListSelected> = JSON.parse(pokemons);
        const ids = pokemonsList.map(e => e.order);
        if (!ids.includes(data.order)) {
          const pokemonListUpdated = pokemonsList.concat(data);
          await updateItemStorage(pokemonListUpdated);
        }
      } else {
        await saveItemStorage(data);
      }
    } catch (e) {}
  };

  const saveItemStorage = async (data: PokemonListSelected) => {
    try {
      await AsyncStorage.setItem('@storage_pokemons', JSON.stringify([data]));
    } catch (e) {}
  };

  const updateItemStorage = async (data: Array<PokemonListSelected>) => {
    try {
      await AsyncStorage.setItem('@storage_pokemons', JSON.stringify(data));
    } catch (e) {}
  };

  return (
    <SafeAreaView style={tw`bg-black flex-grow`}>
      <Text style={tw`text-center py-5 text-xl`}>Pokemon Search</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <Input
            placeholder="Pokemon name"
            autoCompleteType
            autoCapitalize="none"
            value={pokemonName}
            onChangeText={e => setPokemonName(e)}
          />
        </View>
      </View>
      {data && (
        <FlatList
          data={[data!]}
          keyExtractor={item => `pokemon-reference-${item?.id}`}
          renderItem={({item: {name, order, species, moves}}) => (
            <TouchableOpacity
              onPress={() => {
                const movesName = moves?.map(e => ({name: e.move.name}));
                pokemonAddListAction({
                  name,
                  moves: movesName,
                  species: species.name,
                  order,
                });
              }}
              style={tw`flex-row justify-between items-center px-10`}>
              <View>
                <Text>{name}</Text>
                <Text>{order}</Text>
              </View>
              <View>
                <Ionicons name="add" size={30} />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const inputStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 10,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});

export default PokemonSearchScreen;
