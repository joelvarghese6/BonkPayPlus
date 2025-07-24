import { Ionicons } from '@expo/vector-icons';
//import * as Haptics from 'expo-haptics';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { ScanQrCode } from 'lucide-react-native'
import { router } from 'expo-router';

export const SpecialTabButton = () => {
	const handlePress = () => {
		//Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		router.push('/dashboard/custom');
	};

	return (
		<TouchableOpacity onPress={handlePress} style={styles.button} activeOpacity={0.85}>
			<ScanQrCode size={30} color="#fff" />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		top: -20,
		left: '50%',
		transform: [{ translateX: -20 }],
		backgroundColor: '#4F46E5',
		borderRadius: 10,
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'
	}
});