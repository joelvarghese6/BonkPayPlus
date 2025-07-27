import { router } from "expo-router";
import { View, Text, Pressable, SafeAreaView } from "react-native";

export const QrOverview = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ position: 'absolute', top: 32, right: 24, zIndex: 10 }}>
                <Pressable
                    onPress={() => router.replace('/dashboard/home')}
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: 20,
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>×</Text>
                </Pressable>
            </View>
            {/* QR Scanner Overlay */}
            <View
                pointerEvents="none"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <View
                    style={{
                        width: 240,
                        height: 240,
                        position: 'relative',
                    }}
                >
                    {/* Top Left Corner */}
                    <View style={{ position: 'absolute', top: 0, left: 0, width: 36, height: 36, borderTopWidth: 4, borderLeftWidth: 4, borderColor: '#fff', borderRadius: 8 }} />
                    {/* Top Right Corner */}
                    <View style={{ position: 'absolute', top: 0, right: 0, width: 36, height: 36, borderTopWidth: 4, borderRightWidth: 4, borderColor: '#fff', borderRadius: 8 }} />
                    {/* Bottom Left Corner */}
                    <View style={{ position: 'absolute', bottom: 0, left: 0, width: 36, height: 36, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: '#fff', borderRadius: 8 }} />
                    {/* Bottom Right Corner */}
                    <View style={{ position: 'absolute', bottom: 0, right: 0, width: 36, height: 36, borderBottomWidth: 4, borderRightWidth: 4, borderColor: '#fff', borderRadius: 8 }} />
                </View>
            </View>
        </SafeAreaView>
    );
}