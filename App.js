import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function App() {
  const [nomeProduto, setNomeProduto] = useState("")
  const [precoProduto, setPrecoProduto] = useState()

  return (
    <View style={styles.container}>
      <Text>CADASTRO</Text>
      <StatusBar style="auto" />
      <TextInput
        placeholder='Digite o nome do produto'
        style={styles.input}
        value={nomeProduto}
        onChangeText={(value) => setNomeProduto(value)}
      />

      <TextInputMask
        type='money'
        placeholder='Digite o preço do produto'
        style={styles.input}
        value={precoProduto}

        onChangeText={(value) => setPrecoProduto(value)}
      />

      <TouchableOpacity style={styles.btn}>
        <Text>Salvar</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    height: 50,
    width: 300,
    borderRadius: 15,
    marginTop: 10
  },
  btn: {
    borderWidth: 1,
    width: 300,
    height: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10
  }
});

