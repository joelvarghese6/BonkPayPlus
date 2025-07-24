import { SpecialTabButton } from "@/components/SpecialTabButton";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "#ff00c3", tabBarInactiveTintColor: "#727272" }}>
            <Tabs.Screen name="home" options={{ tabBarLabel: "Home", tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }} />
            <Tabs.Screen name="second" options={{ tabBarLabel: "Grow", tabBarIcon: ({ color, size }) => <Ionicons name="leaf" size={size} color={color} /> }} />
            <Tabs.Screen
                name="custom"
                options={{
                    tabBarButton: SpecialTabButton
                }}
                listeners={{
                    tabPress: (e) => {
                        //e.preventDefault();
                        console.log("tabPress");
                    }
                }}
            />
            <Tabs.Screen name="third" options={{ tabBarLabel: "History", tabBarIcon: ({ color, size }) => <Ionicons name="time" size={size} color={color} /> }} />
            <Tabs.Screen name="fourth" options={{ tabBarLabel: "Profile", tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> }} />
        </Tabs>
    );
}