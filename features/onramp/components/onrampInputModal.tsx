import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef, useMemo, useState } from "react";
import { Button, Text, View, StyleSheet, TextInput, Linking, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";

interface OnrampInputModalProps {
    ref: React.RefObject<BottomSheet>;
    handleCloseOnrampInputModal: () => void;
}

export const OnrampInputModal = forwardRef<BottomSheet, OnrampInputModalProps>((props, ref) => {

    const snapPoints = useMemo(() => ['80%'], []);
    const [amount, setAmount] = useState('');

    const handleOpenGoogle = () => {
        setAmount('');
        Linking.openURL('https://walker.com');
    };

    const isButtonDisabled = parseFloat(amount) <= 0.1;

    return (
        <BottomSheet ref={ref} index={-1} snapPoints={snapPoints}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerSpacer} />
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={props.handleCloseOnrampInputModal}
                        >
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.title}>Enter Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="0"
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity 
                            style={[
                                styles.continueButton,
                                isButtonDisabled && styles.continueButtonDisabled
                            ]}
                            onPress={handleOpenGoogle}
                            disabled={isButtonDisabled}
                        >
                            <Text style={[
                                styles.continueButtonText,
                                isButtonDisabled && styles.continueButtonTextDisabled
                            ]}>
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </KeyboardAvoidingView>
        </BottomSheet>
    )
})

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerSpacer: {
        flex: 1,
    },
    closeButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    continueButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    continueButtonDisabled: {
        backgroundColor: '#ccc',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    continueButtonTextDisabled: {
        color: '#999',
    },
})