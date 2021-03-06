import { createStackNavigator } from 'react-navigation';

import { 
    Address,
} from '../screens';

import { colors } from '../styles';


export default createStackNavigator(
    {
        Address: {
            screen: Address,
        },
    },
    {
        navigationOptions: {
            headerTransparent: true,
            headerTitleStyle: {
                color: '#FFF', 
            },
            headerTintColor: colors.dark
        }
    }
);


