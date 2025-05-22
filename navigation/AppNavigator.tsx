// AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DirectoryListScreen from '../screens/DirectoryListScreen';
import MessageListScreen from '../screens/MessageListScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Directories" component={DirectoryListScreen} />
            <Stack.Screen name="Messages" component={MessageListScreen} />
        </Stack.Navigator>
    );
}
