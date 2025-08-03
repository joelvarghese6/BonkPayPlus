import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBonkRewardModal } from '@/features/rewards/store/BonkRewardModal';


export const BonkRecieved = () => {

    const {  amount, bonkAmount, closeBonkRewardModal } = useBonkRewardModal();
    
    
    const handleClose = () => {
        closeBonkRewardModal();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <View style={styles.iconContainer}>
                    <Ionicons name="checkmark" size={40} color="#007AFF" />
                </View>
                <Text style={styles.text}>{amount} Sol Sent</Text>
                <Text style={styles.subText}>
                    2% reward: {bonkAmount} BONK
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 8,
        zIndex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F0F8FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    subText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
    },
});