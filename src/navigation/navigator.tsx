import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PokemonSearchScreen from '../modules/screens/PokemonSearchScreen';
import PokemonListAddedScreen from '../modules/screens/PokemonListAddedScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  SearchScreen: 'search',
  ListScreen: 'clipboard-outline',
  AddedScreen: 'layers',
};

const List = () => {
  return (
    <View style={{flex: 1}}>
      <Text>List componnent</Text>
    </View>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            const icon = TAB_ICONS[route.name as keyof typeof TAB_ICONS];
            return <Ionicons name={icon} size={size} color={color} />;
          },
          tabBarLabel: '',
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
        <Tab.Screen name="SearchScreen" component={PokemonSearchScreen} />
        <Tab.Screen name="ListScreen" component={List} />
        <Tab.Screen name="AddedScreen" component={PokemonListAddedScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
