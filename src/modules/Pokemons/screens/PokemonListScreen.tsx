import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from 'react-native';
import {usePokemonListPaginateQuery} from '../slices/pokemonApiSlice';
import {useState, useEffect} from 'react';
import {Card} from '@rneui/themed';
import {useTailwind} from 'tailwind-rn';

const PokemonListScreen = () => {
  const tw = useTailwind();

  const [pokemons, setPokemons] = useState<Array<{name: string; url: string}>>(
    [],
  );

  const [offset, setOffset] = useState<number>(0);

  const {data, isLoading} = usePokemonListPaginateQuery({
    limit: 10,
    offset: offset,
  });

  const renderItem = (item: {item: {name: string; url: string}}) => {
    const {
      item: {name, url},
    } = item;
    return (
      <Card
        key={`pokemon-${name}-${url}`}
        containerStyle={[
          tw('p-5 rounded-lg'),
          {backgroundColor: '#59C1CC', flexDirection: 'row'},
        ]}>
        <View>
          <View style={tw('flex-row justify-between')}>
            <View>
              <Text style={[tw('text-2xl font-bold'), {color: 'white'}]}>
                {name}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={{marginVertical: 16, alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setOffset(offset + 10);
  };

  useEffect(() => {
    if (data) {
      setPokemons([...pokemons, ...data?.results!]);
    }
  }, [data]);

  return (
    <ScrollView nestedScrollEnabled={true} style={{backgroundColor: 'white'}}>
      <View style={{marginTop: 10}}>
        <View style={[tw('py-5 border-b'), {borderColor: '#59C1CC'}]}>
          <Text
            style={[tw(`text-center text-xl font-bold`), {color: '#59C1CC'}]}>
            List pokemons
          </Text>
        </View>
      </View>
      <FlatList
        data={pokemons}
        renderItem={renderItem}
        ListFooterComponent={renderLoader}
        keyExtractor={(_, index) => index.toString()}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </ScrollView>
  );
};

export default PokemonListScreen;
