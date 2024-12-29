import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Card, Avatar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Ganti dengan URL backend Anda
const API_URL = "http://192.168.56.1:3000";

// Komponen Wrapper dengan Gradasi Latar Belakang
const GradientBackground = ({ children }) => (
  <LinearGradient
    colors={['#0f2027', '#203a43', '#2c5364']}
    style={styles.background}
  >
    {children}
  </LinearGradient>
);

// Layar Register
const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Registration successful!');
        navigation.navigate('Login');
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'Registration failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to server.');
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          label="Username"
          mode="outlined"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          Register
        </Button>

        {/* Tambahkan menu Login */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.text}>Already have an account? </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Login')}
            style={styles.loginLinkButton}
          >
            Login
          </Button>
        </View>
      </View>
    </GradientBackground>
  );
};


// Layar Login
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', 'Login successful!');
        // Menavigasi ke MainTab dengan username sebagai parameter
        navigation.replace('Main', { username: data.username });
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'Login failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to server.');
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button mode="contained" onPress={handleLogin} style={styles.button}>
          Login
        </Button>

        {/* Link ke Register jika belum memiliki akun */}
        <View style={styles.registerLinkContainer}>
          <Text style={styles.text}>Don't have an account? </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Register')}
            style={styles.registerLinkButton}
          >
            Register
          </Button>
        </View>
      </View>
    </GradientBackground>
  );
};



// Layar Home
const HomeScreen = () => (
  <GradientBackground>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Space</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Discover the Universe</Text>
          <Text style={styles.cardText}>
            "The universe is under no obligation to make sense to you." – Neil deGrasse Tyson
          </Text>
        </Card.Content>
      </Card>

      <Text style={styles.subtitle}>Popular Topics:</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>🌌 Milky Way Galaxy</Text>
        <Text style={styles.listItem}>🚀 Space Exploration</Text>
        <Text style={styles.listItem}>🔭 Astronomy Basics</Text>
        <Text style={styles.listItem}>🌍 Earth from Space</Text>
      </View>
    </ScrollView>
  </GradientBackground>
);


// Layar Explore
const ExploreScreen = () => (
  <GradientBackground>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Explore the Universe</Text>
      <View style={styles.planetContainer}>
        <View style={styles.planetCard}>
          <MaterialCommunityIcons name="earth" size={50} color="#fff" />
          <Text style={styles.planetText}>Earth</Text>
        </View>
        <View style={styles.planetCard}>
          <MaterialCommunityIcons name="planet" size={50} color="#fff" />
          <Text style={styles.planetText}>Mars</Text>
        </View>
        <View style={styles.planetCard}>
          <MaterialCommunityIcons name="moon" size={50} color="#fff" />
          <Text style={styles.planetText}>Moon</Text>
        </View>
      </View>
      <Text style={styles.text}>
        Explore different celestial bodies and learn about their unique features.
      </Text>
    </ScrollView>
  </GradientBackground>
);


// Layar Profile
const ProfileScreen = ({ username }) => (
  <GradientBackground>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Avatar.Text size={100} label={username[0]} style={styles.avatar} />
      <Text style={styles.text}>Welcome, {username}!</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Your Space Journey</Text>
          <Text style={styles.cardText}>
            "You are the navigator of your own universe."
          </Text>
        </Card.Content>
      </Card>

      <Text style={styles.subtitle}>Settings:</Text>
      <View style={styles.list}>
        <Text style={styles.listItem}>🔒 Change Password</Text>
        <Text style={styles.listItem}>✉️ Update Email</Text>
        <Text style={styles.listItem}>🚪 Log Out</Text>
      </View>
    </ScrollView>
  </GradientBackground>
);



// Main Tab Navigator
const MainTab = ({ route }) => {
  const { username } = route.params; // Dapatkan username yang dikirimkan dari login

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1c1c1c' },
        tabBarActiveTintColor: '#fff',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Profile">
        {() => <ProfileScreen route={route} username={username} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};


// Main App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// Gaya
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#203a43',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardText: {
    color: '#ddd',
    marginTop: 5,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginLinkButton: {
    marginLeft: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: '#203a43',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  list: {
    marginTop: 10,
  },
  listItem: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 5,
  },
  planetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  planetCard: {
    alignItems: 'center',
  },
  planetText: {
    color: '#fff',
    marginTop: 5,
  },
});
