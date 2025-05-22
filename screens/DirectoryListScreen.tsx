import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image,
    Alert,
    ImageBackground
} from 'react-native';
import DirectoryItem from '../components/DirectoryItem';
import { directories as mockDirectories } from '../data/mockData';

const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const itemSpacing = 8;
const itemHeight = 140;
const itemWidth = (screenWidth - itemSpacing * (numColumns + 1)) / numColumns;

const imageMap: { [key: string]: any } = {
    family: require('../assets/images/family.png'),
    friends: require('../assets/images/friends.png'),
    home: require('../assets/images/home.png'),
    love: require('../assets/images/love.png'),
    school: require('../assets/images/school.png'),
    you: require('../assets/images/you.png'),
    default: require('../assets/images/default.png'),
};

const getImage = (name: string) => {
    return imageMap[name.toLowerCase()] || imageMap.default;
};

export default function DirectoryListScreen({ navigation }: any) {
    const [directories, setDirectories] = useState(mockDirectories);
    const [search, setSearch] = useState('');

    const filtered = directories.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAdd = () => {
        Alert.prompt('New Directory', 'Enter directory name:', (text) => {
            if (!text?.trim()) return;
            const id = Date.now().toString();
            const newDir = {
                id,
                name: text.trim(),
                image: getImage('default'),
                unread: 5,
                messages: [
                    'Welcome to your new directory!',
                    'Feel free to add more messages.',
                    'This is an example message.',
                    'Directory setup complete.',
                    'Happy messaging!'
                ],
            };
            setDirectories((prev) => [...prev, newDir]);
        });
    };

    const handleDirectoryPress = (id: string) => {
        const dir = directories.find(d => d.id === id);
        if (dir) {
            navigation.navigate('Messages', {
                directoryId: dir.id,
                name: dir.name,
                directories,
                setDirectories
            });
        }
    };

    const handleDirectoryLongPress = (id: string) => {
        Alert.alert(
            'Directory Options',
            'Choose an action:',
            [
                {
                    text: 'Edit',
                    onPress: () => {
                        const dir = directories.find(d => d.id === id);
                        if (!dir) return;
                        Alert.prompt('Edit Directory Name', undefined, (newName) => {
                            if (!newName?.trim()) return;
                            setDirectories(prev =>
                                prev.map(d => d.id === id ? { ...d, name: newName.trim() } : d)
                            );
                        });
                    }
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        setDirectories(prev => prev.filter(d => d.id !== id));
                    },
                    style: 'destructive'
                },
                { text: 'Cancel', style: 'cancel' }
            ]
        );
    };

    return (
        <ImageBackground source={require('../assets/images/blue-paper-texture.png')} style={styles.background}>
            <View style={styles.container}>
                <TextInput
                    placeholder="Search directory..."
                    style={styles.search}
                    value={search}
                    onChangeText={setSearch}
                />
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id}
                    numColumns={numColumns}
                    columnWrapperStyle={styles.row}
                    renderItem={({ item }) => (
                        <View style={styles.gridItem}>
                            <DirectoryItem
                                directory={item}
                                onPress={() => handleDirectoryPress(item.id)}
                                onLongPress={() => handleDirectoryLongPress(item.id)}
                            />
                        </View>
                    )}
                />
                <TouchableOpacity style={styles.fab} onPress={handleAdd}>
                    <Image source={require('../assets/images/add.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: { flex: 1, padding: 10 },
    search: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: itemSpacing,
    },
    gridItem: {
        width: itemWidth,
        height: itemHeight,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#007AFF',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    icon: {
        width: 30,
        height: 30,
    },
});
