import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/useRedux';
import {pokemonUpdateList} from '../slices/pokemonSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PokemonListSelected} from '../interfaces/PokemonListSelected';
import {Card} from '@rneui/themed';
import {useTailwind} from 'tailwind-rn';

const PokemonListAddedScreen = () => {
  const tw = useTailwind();

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

  const Item = ({name, moves, species}: PokemonListSelected) => {
    return (
      <Card
        containerStyle={[tw('p-5 rounded-lg'), {backgroundColor: '#59C1CC'}]}
        key={`pokemon-added-${name}`}>
        <View>
          <View style={tw('flex-row justify-between')}>
            <View>
              <Text style={[tw('text-2xl font-bold'), {color: 'white'}]}>
                {name}
              </Text>
            </View>
            <View>
              <Text style={[tw('text-2xl font-bold'), {color: 'white'}]}>
                {species}
              </Text>
            </View>
            <View>
              {moves &&
                moves.slice(0, 5).map(e => (
                  <Text
                    key={`pokemon-move-${e.name}`}
                    style={[tw('font-bold')]}>
                    {e.name}
                  </Text>
                ))}
            </View>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={{marginTop: 10}}>
        <View style={[tw('py-5 border-b'), {borderColor: '#59C1CC'}]}>
          <Text
            style={[tw(`text-center text-xl font-bold`), {color: '#59C1CC'}]}>
            List pokemons added
          </Text>
        </View>
      </View>
      {pokemonListSelected && (
        <FlatList
          data={pokemonListSelected}
          keyExtractor={item => `${item?.order}`}
          renderItem={({item}) => <Item {...item} />}
        />
      )}
    </ScrollView>
  );
};

export default PokemonListAddedScreen;
