import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {usePokemonListPaginateQuery} from '../slices/pokemonApiSlice';
import {useState, useEffect} from 'react';
// import tw from 'tailwind-react-native-classnames';

const PokemonListScreen = () => {
  const [pokemons, setPokemons] = useState<Array<{name: string; url: string}>>(
    [],
  );

  const [offset, setOffset] = useState<number>(0);

  const {data, isLoading} = usePokemonListPaginateQuery({
    limit: 10,
    offset: offset,
  });

  const renderItem = (item: {item: {name: string; url: string}}) => {
    return (
      <View style={styles.itemWrapperStyle}>
        <View style={styles.contentWrapperStyle}>
          <Text style={styles.txtNameStyle}>{`${item.item.name}`}</Text>
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
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
    <>
      <StatusBar backgroundColor="#000" />
      <FlatList
        data={pokemons}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: '#777',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

export default PokemonListScreen;
