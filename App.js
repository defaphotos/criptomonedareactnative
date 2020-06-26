import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import axios from 'axios';

const App = () => {
  const [moneda, guadarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false);
  const [cotizacion, guardarCotizacion] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizar = async () => {
      if (consultarAPI) {
        guardarCargando(true);
        const lista = await axios.get(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`,
        );

        setTimeout(() => {
          guardarCotizacion(lista.data.DISPLAY[criptomoneda][moneda]);
          guardarConsultarAPI(false);
          guardarCargando(false);
        }, 2000);
      }
    };
    cotizar();
  }, [moneda, criptomoneda, consultarAPI]);

  const componente = cargando ? (
    <View style={{marginTop: 40}}>
      <ActivityIndicator size="large" color="#5e49e2" />
    </View>
  ) : (
    <Cotizacion cotizacion={cotizacion} />
  );

  return (
    <ScrollView>
      <Header />
      <Image
        style={styles.image}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          guadarMoneda={guadarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
          guardarConsultarAPI={guardarConsultarAPI}
        />
      </View>
      {componente}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '95%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
