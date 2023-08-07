import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
// import * as Googlee from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [userInfo, setUserInfo] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "930703131960-fq2da70dmg96cnsrrn3hnp9qiutdu099.apps.googleusercontent.com",
        webClientId: "930703131960-efo9amqv0qf88526p51m8ft34nebedha.apps.googleusercontent.com",
        expoClientId: "930703131960-bjcusthd6gem4k8hgc31i8g20phcrkq1.apps.googleusercontent.com"
    });

    React.useEffect(() => {
        handleSignInWIthGoogle();
    }, [response]);

    async function handleSignInWIthGoogle() {
        const user = await AsyncStorage.getItem("@user");
        if (!user) {
            if (response?.type === "success") {
                await getUserInfo(response.authentication.accessToken);
                console.log('1.1- user: ', user)
                console.log('1.1- userInfo: ', userInfo)
            }
        }
        else {
            // setUserInfo(JSON.parse(user));
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
            navigation.navigate("Home", { name: user.name, id: user.id })
        } catch (error) { }
    }

    const logoutUser = () => {
        console.log("deleted", userInfo)
        AsyncStorage.removeItem("@user");
        setUserInfo('');
        const tempUser = AsyncStorage.getItem("@user");
    }

    // const handleSignOut = async () => {
    //     try {
    //       // Configure the Google Sign-In parameters
    //       const config = {
    //         androidClientId: "930703131960-fq2da70dmg96cnsrrn3hnp9qiutdu099.apps.googleusercontent.com",
    //         webClientId: "930703131960-efo9amqv0qf88526p51m8ft34nebedha.apps.googleusercontent.com",
    //         expoClientId: "930703131960-bjcusthd6gem4k8hgc31i8g20phcrkq1.apps.googleusercontent.com",
    //         scopes: ['profile', 'email'],
    //       };

    //       // Sign out of Google
    //       await Googlee.logOutAsync({
    //         ...config,
    //       });
    //       console.log('User signed out successfully');
    //     } catch (error) {
    //       console.error('Error signing out:', error);
    //     }
    //   };
    return (
        <View style={styles.container}>
            <Image
                source={require('./../../assets/logo.png')}
                style={{ width: 200, height: 200 }}
            />
            <Text style={styles.appname}>{"FireBeats"}</Text>
            <Text style={{ fontSize: 18, marginTop: 20, alignSelf: 'center', justifyContent: 'center', width: '100%' }}>{"Our Artificial Intelligence algorithms track your health tracker to track your health."}</Text>

            <Text style={{ fontSize: 18, marginTop: 30, marginBottom: 50, textDecorationLine: 'underline' }}> Login With </Text>
            {(!userInfo || userInfo === '') ?
                (<Pressable style={styles.button} onPress={() => promptAsync()}>
                    <Image source={require('./../../assets/google-fit.png')}
                        style={{ width: 30, height: 30, marginRight: 10 }} />
                    <Text style={{
                        fontSize: 16,
                        lineHeight: 28,
                        fontWeight: 'bold',
                        letterSpacing: 0.25,
                        color: 'white'
                    }}>{"Sign in with Google Fit"}</Text>
                </Pressable>)
                :
                (
                    <View>
                        <Text>{'Welcome back '}</Text>
                        <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>{userInfo.name + '!'}</Text>
                        <Pressable style={styles.button} onPress={() => {
                            console.log("inside", userInfo)
                            navigation.navigate("Home", { name: userInfo.name, id: userInfo.id })
                        }}>
                            <Text style={styles.text}>{"Navigate To Home Page"}</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={() => logoutUser()}>
                            <Text style={styles.text}>{"Sign Out"}</Text>
                        </Pressable>

                    </View>
                )
            }


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
        // alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        marginBottom: 10,
        flexDirection: 'row'
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
        fontSize: 48,
        fontWeight: 'bold',
        color: 'red',
    }
});
