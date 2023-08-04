import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
    const [userInfo, setUserInfo] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "930703131960-fq2da70dmg96cnsrrn3hnp9qiutdu099.apps.googleusercontent.com",
        webClientId: "930703131960-efo9amqv0qf88526p51m8ft34nebedha.apps.googleusercontent.com"
    });

    React.useEffect(() => {
        handleSignInWIthGoogle();
    }, [response]);

    async function handleSignInWIthGoogle() {
        const user = await AsyncStorage.getItem("@user");
        if (!user) {
            if (response?.type === "success") {
                await getUserInfo(response.authentication.accessToken);
            }
        }
        else {
            setUserInfo(JSON.parse(user));
        }
    }

    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
        } catch (error) { }
    }

    const logoutUser = () => {
        AsyncStorage.removeItem("@user");
    }
    return (
        <View style={styles.container}>
            <Image
                source={require('./../../assets/logo.png')}
                style={{ width: 200, height: 200 }}
            />
            <Text style={styles.appname}>{"FireBeats"}</Text>
            <Text>{"Our Artificial Intelligence algorithms track your health tracker to track your health."}</Text>
            <Text>{JSON.stringify(userInfo, null, 2)}</Text>

            <Text> Login With </Text>
            <Pressable style={styles.button} onPress={() => promptAsync()}>
                <Text style={styles.text}>{"Sign in with Google"}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => logoutUser()}>
                <Text style={styles.text}>{"Delete Local Storage"}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate("Home", {name: 'Abhay Garg'})}>
                <Text style={styles.text}>{"Go to Home Page"}</Text>
            </Pressable>
            <StatusBar style="auto" />
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: '4',
        elevation: 3,
        backgroundColor: 'black',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        marginBottom: 10
    },
    appname: {
        fontSize: 24,
        color: 'red',
    }
});
