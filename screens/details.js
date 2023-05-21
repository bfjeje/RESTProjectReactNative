import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import axios from 'axios';

const Details = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [id, setId] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  useEffect(() => {
    const user = route.params.user;
    setName(user.name);
    setLocation(user.location);
    setId(user.id);
  }, [route.params.user]);

  const editUser = () => {
    axios
      .patch('http://192.168.0.2:3000/users/' + id, {
        name: name,
        location: location,
      })
      .then(() => {
        alert('Usuario Editado!');
        navigation.goBack();
      })
      .catch(error => alert('Error:' + error));
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={txt => setName(txt)}
        style={styles.input}
        placeholder="Name"
      />
      <TextInput
        value={location}
        onChangeText={txt => setLocation(txt)}
        style={styles.input}
        placeholder="Location"
      />
      <TouchableOpacity style={styles.button} onPress={editUser}>
        <Text style={styles.txtButton}>Salvar edição</Text>
      </TouchableOpacity>
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
export default Details;
