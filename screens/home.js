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
import {useNavigation} from '@react-navigation/native';
// PUT cria um novo usuario se o ID nao for achado, e alem disso sobrescreve
// toda a entrada desse usuario, caso a gente passar só 1 atributo. O PATCH só
// reemplaza esse atributo, e mantem os outros
const Home = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    axios
      .get('http://192.168.0.2:3000/users')
      .then(req => setUsers(req.data))
      .catch(err => console.log(err));
  };
  const saveUser = () => {
    axios
      .post('http://192.168.0.2:3000/users', {name: name, location: location})
      .then(() => {
        // console.log(JSON.stringify(data.data));
        // const temp = [...users, data.data];
        // setUsers(temp);
        // setName('');
        // setLocation('');
        getUsers();
        alert('Usuario salvo com sucesso');
      })
      .catch(error => {
        alert('Error: ' + error);
      });
  };

  const deleteUser = id => {
    axios
      .delete('http://192.168.0.2:3000/users/' + id)
      .then(() => {
        // const temp = users.filter(item => {
        //   return item.id !== id;
        // });
        // setUsers(temp);
        getUsers();
        alert('Deletado com sucesso!');
      })
      .catch(error => alert('Error: ' + error));
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
        keyExtractor={(item, index) => item.id.toString()}
        data={users}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', {user: item})}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
            <Text onPress={() => deleteUser(item.id)} style={{color: 'red'}}>
              Apagar
            </Text>
          </View>
        )}
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
