import { SpecialTabButton } from "@/components/SpecialTabButton";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "#007AFF", tabBarInactiveTintColor: "#1A1A1A" }}>
            <Tabs.Screen name="home" options={{ 
                headerShown: false,
                tabBarLabel: "Home", 
                tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> 
            }} />
            <Tabs.Screen name="second" options={{ 
                title: "Grow & Earn",
                tabBarLabel: "Grow", 
                tabBarIcon: ({ color, size }) => <Ionicons name="leaf" size={size} color={color} /> 
            }} />
            <Tabs.Screen
                name="custom"
                options={{
                    title: "Scan QR",
                    tabBarButton: SpecialTabButton,
                    tabBarStyle: {
                        display: "none"
                    }
                }}
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        console.log("tabPress");
                    }
                }}
            />
            <Tabs.Screen name="third" options={{ 
                title: "Transaction History",
                tabBarLabel: "History", 
                tabBarIcon: ({ color, size }) => <Ionicons name="time" size={size} color={color} /> 
            }} />
            <Tabs.Screen name="fourth" options={{ 
                title: "My Profile",
                tabBarLabel: "Profile", 
                tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> 
            }} />
        </Tabs>
    );
}