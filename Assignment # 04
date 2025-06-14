// App.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Accelerometer } from 'expo-sensors';

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postResponse, setPostResponse] = useState(null);
  const [putResponse, setPutResponse] = useState(null);

  const fetchPlayers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        'https://www.balldontlie.io/api/v1/players?per_page=10'
      );
      const json = await res.json();
      setPlayers(json.data); // API returns data array :contentReference[oaicite:0]{index=0}
    } catch (err) {
      setError('Failed to fetch players');
    }
    setLoading(false);
  };

  const createGame = async () => {
    setLoading(true);
    setError(null);
    try {
      const mock = {
        id: Date.now(),
        status: 'Created',
        message: 'Game created successfully (mock)',
      };
      setTimeout(() => setPostResponse(mock), 500);
    } catch {
      setError('Failed to create game');
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const updatePlayer = async () => {
    setLoading(true);
    setError(null);
    try {
      const mock = {
        id: 1,
        status: 'Updated',
        message: 'Player updated successfully (mock)',
      };
      setTimeout(() => setPutResponse(mock), 500);
    } catch {
      setError('Failed to update player');
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        players,
        loading,
        error,
        postResponse,
        putResponse,
        fetchPlayers,
        createGame,
        updatePlayer,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

const useApi = () => useContext(ApiContext);

const ApiScreen = ({ navigation }) => {
  const {
    players,
    loading,
    error,
    postResponse,
    putResponse,
    fetchPlayers,
    createGame,
    updatePlayer,
  } = useApi();

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>NBA Player Browser</Text>

      <TouchableOpacity style={styles.button} onPress={fetchPlayers}>
        <Text style={styles.buttonText}>🔄 Refresh Players</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={createGame}>
        <Text style={styles.buttonText}>➕ Create Game (Mock)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={updatePlayer}>
        <Text style={styles.buttonText}>✏ Update Player (Mock)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.greenButton]}
        onPress={() => navigation.navigate('Sensor')}
      >
        <Text style={styles.buttonText}>📱 Sensor Demo</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#3d5a80" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {postResponse && (
        <View style={styles.responseBox}>
          <Text style={styles.responseTitle}>POST Result</Text>
          <Text>{JSON.stringify(postResponse, null, 2)}</Text>
        </View>
      )}

      {putResponse && (
        <View style={styles.responseBox}>
          <Text style={styles.responseTitle}>PUT Result</Text>
          <Text>{JSON.stringify(putResponse, null, 2)}</Text>
        </View>
      )}

      {players.length > 0 && (
        <View style={styles.responseBox}>
          <Text style={styles.responseTitle}>Players:</Text>
          {players.map((p) => (
            <Text key={p.id} style={styles.playerText}>
              {p.first_name} {p.last_name} — {p.position || 'N/A'}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const SensorScreen = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    let isMounted = true;
    const sub = Accelerometer.addListener((d) => {
      if (isMounted) setData(d);
    });
    Accelerometer.setUpdateInterval(500);
    return () => {
      isMounted = false;
      sub.remove();
    };
  }, []);

  return (
    <View style={styles.sensorContainer}>
      <Text style={styles.title}>Accelerometer Data</Text>
      <View style={styles.dataRow}>
        <Text style={styles.label}>X:</Text>
        <Text>{data.x.toFixed(3)}</Text>
      </View>
      <View style={styles.dataRow}>
        <Text style={styles.label}>Y:</Text>
        <Text>{data.y.toFixed(3)}</Text>
      </View>
      <View style={styles.dataRow}>
        <Text style={styles.label}>Z:</Text>
        <Text>{data.z.toFixed(3)}</Text>
      </View>
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApiProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="API" component={ApiScreen} />
          <Stack.Screen name="Sensor" component={SensorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  sensorContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#293241',
  },
  button: {
    padding: 14,
    backgroundColor: '#3d5a80',
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  greenButton: {
    backgroundColor: '#98c1d9',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  responseBox: {
    marginTop: 20,
    backgroundColor: '#e0fbfc',
    padding: 12,
    borderRadius: 8,
  },
  responseTitle: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#023e8a',
  },
  playerText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#2b2d42',
  },
  error: {
    color: '#d00000',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    marginVertical: 6,
    padding: 12,
    borderRadius: 8,
  },
  label: {
    fontWeight: '600',
  },
});
