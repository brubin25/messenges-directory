import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

interface Props {
    index: number;
    message: string;
    onPress?: () => void;
    onLongPress?: () => void;
}

export default function MessageItem({ index, message, onPress, onLongPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
            <View style={styles.item}>
                <Text style={styles.messageText}>
                    {index + 1}. {message}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    messageText: {
        fontSize: 16,
        color: '#000',
    },
});
