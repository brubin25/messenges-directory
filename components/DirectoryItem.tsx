import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Directory } from '../data/mockData';

export default function DirectoryItem({
                                          directory,
                                          onPress,
                                          onLongPress,
                                      }: {
    directory: Directory;
    onPress: () => void;
    onLongPress: () => void;
}) {
    return (
        <TouchableOpacity style={styles.item} onPress={onPress} onLongPress={onLongPress}>
            <Image source={directory.image} style={styles.avatar} />
            <Text style={styles.name}>{directory.name}</Text>
            {directory.unread > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{directory.unread}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        position: 'relative',
    },
    avatar: {
        width: 64,
        height: 64,
        resizeMode: 'contain',
        marginBottom: 6,
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
