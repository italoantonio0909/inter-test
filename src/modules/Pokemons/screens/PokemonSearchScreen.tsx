import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {useState} from 'react';
import {Input} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../../../hooks/useRedux';
import {pokemonAddList} from '../slices/pokemonSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {usePokemonSearchBynameQuery} from '../slices/pokemonApiSlice';
import {PokemonListSelected} from '../interfaces/PokemonListSelected';
import {Image} from 'react-native-elements/dist/image/Image';
import {Card} from '@rneui/themed';
import {Move, Species} from '../interfaces/PokemonResponse';
import {useTailwind} from 'tailwind-rn';

const PokemonSearchScreen = () => {
  const dispatch = useAppDispatch();

  const tw = useTailwind();

  const [pokemonName, setPokemonName] = useState<string>('');

  const {pokemonListSelected} = useAppSelector(state => state.pokemon);

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

  const Item = ({
    name,
    order,
    moves,
    species,
  }: {
    name: string;
    order: number;
    moves: Array<Move>;
    species: Species;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          const movesName = moves?.map(e => ({name: e.move.name}));
          pokemonAddListAction({
            name,
            moves: movesName,
            species: species.name,
            order,
          });
        }}>
        <Card containerStyle={tw('p-5 rounded-lg')}>
          <View>
            <View style={tw('flex-row justify-between')}>
              <View>
                <Text style={[tw('text-2xl font-bold'), {color: 'black'}]}>
                  # {order}
                </Text>
                <Text style={[tw('text-center text-xl'), {color: 'black'}]}>
                  {name}
                </Text>
              </View>
              <View style={tw('flex-row items-center justify-end')}>
                <Ionicons
                  style={tw('mb-5 ml-auto')}
                  name="add"
                  size={50}
                  color="#59C1CC"
                />
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView nestedScrollEnabled={true} style={{backgroundColor: '#59C1CC'}}>
      <Image
        style={tw('w-full h-64')}
        source={{
          uri: 'https://i.pinimg.com/originals/34/c1/e5/34c1e5d371d64a581b1902ec5c4509f4.png',
        }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Input
        placeholder="Search pokemon name..."
        autoCompleteType
        containerStyle={tw('bg-white pt-5 pb-0 px-10')}
        autoCapitalize="none"
        value={pokemonName}
        onChangeText={e => setPokemonName(e.trim())}
      />

      {data && (
        <FlatList
          data={[data!]}
          keyExtractor={item => `pokemon-reference-${item?.id}`}
          renderItem={({item}) => (
            <Item
              name={item.name}
              moves={item.moves}
              order={item.order}
              species={item.species}
            />
          )}
        />
      )}
    </ScrollView>
  );
};

export default PokemonSearchScreen;
