import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [nomeProduto, setNomeProduto] = useState("")
  const [precoProduto, setPrecoProduto] = useState()
  const [listaProdutos,setListaProduto]=useState([])

  async function Salvar(){
    let produtos = []

    //Carregar os dados  no Async Storage
    if(await AsyncStorage.getItem("PRODUTOS")!=null){
      produtos = JSON.parse(await AsyncStorage.getItem("PRODUTOS"))
    }

    produtos.push({nome:nomeProduto,preco:precoProduto})
    
    //Enviar dados para o Async Storage
    await AsyncStorage.setItem("PRODUTOS",JSON.stringify(produtos))

    //Mostrando alerta para o usuário
    alert("PRODUTO CADASTRADO")

 

  }

  async function BuscarDados(){
    const prod = await AsyncStorage.getItem("PRODUTOS")
    setListaProduto(JSON.parse(prod))
  
  }
  async function DeletarProduto(index){
    const tempDados = listaProdutos
    const dados = tempDados.filter((item,ind)=>{
      return ind!==index
    });

    setListaProduto(dados)

    await AsyncStorage.setItem("PRODUTOS",JSON.stringify(dados))

  }

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

      <TouchableOpacity style={styles.btn} onPress={Salvar}>
        <Text style={{color:"white"}}>Salvar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.btn} onPress={BuscarDados}>
        <Text style={{color:"white"}}>Buscar Dados</Text>
      </TouchableOpacity>

      <FlatList 
        data={listaProdutos}
        renderItem={({item,index})=>{
          return(
            <View style={styles.listarFlat}>
              <View>
                <Text>NOME:{item.nome} - PREÇO:{item.preco}</Text>
                <TouchableOpacity onPress={()=>DeletarProduto(index)}>
                  <Text>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop:30
  },
  input:{
    borderWidth:1,
    height:50,
    width:300,
    borderRadius:15,
    marginTop:10
  },
  btn:{
    borderWidth:1,
    width:300,
    height:50,
    backgroundColor:'blue',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:15,
    marginTop:10
  },
  listarFlat:{
    borderWidth:1,
    width:300,
    height:70,
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center",
    marginVertical:7
  },
  btnExcluir:{
    flexDirection:'column',
    justifyContent:"space-around",
    alignItems:"center",
    borderRadius:12,
    backgroundColor:"red",
    width:100,
    height:20,
    marginTop:5
  }
});
