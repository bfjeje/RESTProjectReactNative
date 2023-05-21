import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import axios from 'axios';

const Home = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  // useEffect(() => {
  //
  // }, []);

  const saveUser = () => {
    try {
      console.log('test');
      axios
        .get('http://10.0.2.2:3000/users')
        .then(req => console.log(req.data))
        .catch(err => console.log(err.response));
    } catch (e) {
      console.log(e.response);
    }
    // alert('Nome: ' + name + '-' + location);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CRUD USUARIOS</Text>
      <TextInput
        onChangeText={txt => setName(txt)}
        style={styles.input}
        placeholder="Nome de Usuario"
      />
      <TextInput
        onChangeText={txt => setLocation(txt)}
        style={styles.input}
        placeholder="Localidade"
      />
      <TouchableOpacity style={styles.button} onPress={saveUser}>
        <Text style={styles.txtButton}>Cadastrar</Text>
      </TouchableOpacity>
      <FlatList data={null} renderItem={() => <Text>Usuario</Text>} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#545454',
    marginVertical: 10,
    padding: 5,
    height: 45,
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtButton: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Home;
