import React, {JSX} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator.tsx';

export default function App(): JSX.Element {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    );
}
