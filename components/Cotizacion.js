import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Cotizacion = ({cotizacion}) => {
  if (Object.keys(cotizacion).length === 0) return null;

  return (
    <View style={styles.resultado}>
      <Text style={[styles.texto, styles.precio]}>
        <Text style={styles.span}>{cotizacion.PRICE}</Text>
      </Text>
      <Text style={styles.texto}>
        Precio más alto del día:{' '}
        <Text style={styles.span}>{cotizacion.HIGHDAY}</Text>
      </Text>
      <Text style={styles.texto}>
        Precio más bajo de día:{' '}
        <Text style={styles.span}>{cotizacion.LOWDAY}</Text>
      </Text>
      <Text style={styles.texto}>
        Últimas variaciones 24 horas:{' '}
        <Text style={styles.span}>{cotizacion.CHANGEPCT24HOUR} %</Text>
      </Text>
      <Text style={styles.texto}>
        Última actualización:{' '}
        <Text style={styles.span}>{cotizacion.LASTUPDATE}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultado: {
    backgroundColor: '#5e49e2',
    padding: 20,
    marginTop: 20,
  },
  texto: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    marginBottom: 10,
  },
  precio: {
    fontSize: 38,
  },
  span: {
    fontFamily: 'Lato-Black',
  },
});

export default Cotizacion;
