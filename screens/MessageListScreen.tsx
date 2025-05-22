import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ImageBackground,
    Alert,
    TouchableOpacity,
    Image
} from 'react-native';
import MessageItem from '../components/MessageItem';

export default function MessageListScreen({ route }: any) {
    const { directoryId, name, directories: initialDirectories, setDirectories } = route?.params || {};
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        if (!directoryId || !initialDirectories) return;
        const dir = initialDirectories.find((d: any) => d.id === directoryId);
        setMessages(dir?.messages || []);
    }, [directoryId, initialDirectories]);

    const updateDirectoryMessages = (newMessages: string[]) => {
        setMessages(newMessages);
        const updatedDirs = initialDirectories.map((d: any) =>
            d.id === directoryId ? { ...d, messages: newMessages } : d
        );
        setDirectories(updatedDirs);
    };

    const handleEdit = (index: number) => {
        Alert.prompt(
            'Edit Message',
            'Update your message:',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: (text) => {
                        if (text !== undefined) {
                            const updated = [...messages];
                            updated[index] = text;
                            updateDirectoryMessages(updated);
                        }
                    }
                }
            ],
            'plain-text',
            messages[index]
        );
    };

    const handleDelete = (index: number) => {
        Alert.alert('Delete Message', 'Are you sure you want to delete this message?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    const updated = messages.filter((_, i) => i !== index);
                    updateDirectoryMessages(updated);
                }
            }
        ]);
    };

    const handleMove = (index: number) => {
        const messageToMove = messages[index];
        const otherDirs = initialDirectories.filter((d: any) => d.id !== directoryId);

        Alert.alert(
            'Move Message',
            'Select target directory:',
            otherDirs.map((d: any) => ({
                text: d.name,
                onPress: () => {
                    const updatedDirs = initialDirectories.map((dir: any) => {
                        if (dir.id === directoryId) {
                            return {
                              ...dir,
                              messages: dir.messages.filter(
                                (_: any, i: number) => i !== index,
                              ),
                            };
                        } else if (dir.id === d.id) {
                            return {
                                ...dir,
                                messages: [...dir.messages, messageToMove],
                            };
                        }
                        return dir;
                    });

                    setDirectories(updatedDirs);

                    // Refresh current directory's messages after move
                    const updatedCurrent = updatedDirs.find((d: any) => d.id === directoryId);
                    setMessages(updatedCurrent?.messages || []);
                }
            }))
        );
    };

    const handleAdd = () => {
        Alert.prompt(
            'New Message',
            'Enter your message:',
            (text) => {
                if (!text?.trim()) return;
                const updated = [...messages, text.trim()];
                updateDirectoryMessages(updated);
            },
            'plain-text'
        );
    };

    const handleLongPress = (index: number) => {
        Alert.alert(
            'Message Options',
            '',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Edit', onPress: () => handleEdit(index) },
                { text: 'Move', onPress: () => handleMove(index) },
                { text: 'Delete', onPress: () => handleDelete(index), style: 'destructive' }
            ]
        );
    };

    return (
        <ImageBackground
            source={require('../assets/images/blue-paper-texture.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.header}>Messages from {name}</Text>
                <FlatList
                    data={messages}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <MessageItem
                            index={index}
                            message={item}
                            onPress={() => handleEdit(index)}
                            onLongPress={() => handleLongPress(index)}
                        />
                    )}
                />
                <TouchableOpacity style={styles.fab} onPress={handleAdd}>
                    <Image source={require('../assets/images/add.png')} style={{ width: 28, height: 28 }} />
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
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#000',
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
});
