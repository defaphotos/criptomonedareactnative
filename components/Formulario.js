import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({
  moneda,
  criptomoneda,
  guadarMoneda,
  guardarCriptomoneda,
  guardarConsultarAPI,
}) => {
  const [criptomonedas, guardarCriptomonedas] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const lista = await axios.get(
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD',
      );
      guardarCriptomonedas(lista.data.Data);
    };
    consultarAPI();
  }, []);

  const cotizarPrecio = async () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
      return;
    }
    guardarConsultarAPI(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Ambos campos son obligatorios', [{text: 'OK'}]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        itemStyle={{height: 120}}
        onValueChange={value => guadarMoneda(value)}
        selectedValue={moneda}>
        <Picker.Item label="- Seleccione -" value="" />
        <Picker.Item label="Dolar de Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        itemStyle={{height: 120}}
        onValueChange={value => guardarCriptomoneda(value)}
        selectedValue={criptomoneda}>
        <Picker.Item label="- Seleccione -" value="" />
        {criptomonedas.map(item => {
          return (
            <Picker.Item
              key={item.CoinInfo.Id}
              label={item.CoinInfo.FullName}
              value={item.CoinInfo.Name}
            />
          );
        })}
      </Picker>
      <TouchableHighlight
        onPress={() => cotizarPrecio()}
        style={styles.btnCotizar}>
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    fontSize: 22,
    marginVertical: 20,
    textTransform: 'uppercase',
  },
  btnCotizar: {
    backgroundColor: '#5e49e2',
    padding: 10,
    marginTop: 20,
  },
  textoCotizar: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Formulario;
