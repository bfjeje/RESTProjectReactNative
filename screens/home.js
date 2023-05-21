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
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('http://192.168.0.2:3000/users')
      .then(req => setUsers(req.data))
      .catch(err => console.log(err));
  }, []);
  const saveUser = () => {
    axios
      .post('http://192.168.0.2:3000/users', {name: name, location: location})
      .then(data => {
        // console.log(JSON.stringify(data.data));
        const temp = [...users, data.data];
        setUsers(temp);
        alert('Usuario salvo com sucesso');
      })
      .catch(error => {
        alert('Error: ' + error);
      });
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
      <FlatList
        data={users}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
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
