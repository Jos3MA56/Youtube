import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface EntradaHistorial {
  id: string;
  cuenta: string;
  porcentaje: number;
  propina: string;
  total: string;
}

const CalculadoraPropinas = () => {
  const [montoCuenta, setMontoCuenta] = useState('');
  const [porcentajePropina, setPorcentajePropina] = useState(15);
  const [usarPropinaPersonalizada, setUsarPropinaPersonalizada] = useState(false);
  const [montoPropina, setMontoPropina] = useState('0.00');
  const [montoTotal, setMontoTotal] = useState('0.00');
  const [historial, setHistorial] = useState<EntradaHistorial[]>([]);

  useEffect(() => {
    calcularPropina();
  }, [montoCuenta, porcentajePropina]);

  const calcularPropina = () => {
    const cuenta = parseFloat(montoCuenta);
    if (isNaN(cuenta) || cuenta <= 0) {
      setMontoPropina('0.00');
      setMontoTotal('0.00');
      return;
    }

    const propina = cuenta * (porcentajePropina / 100);
    const total = cuenta + propina;

    setMontoPropina(propina.toFixed(2));
    setMontoTotal(total.toFixed(2));

    // Agregar al historial
    const nuevaEntrada: EntradaHistorial = {
      id: Date.now().toString(),
      cuenta: cuenta.toFixed(2),
      porcentaje: porcentajePropina,
      propina: propina.toFixed(2),
      total: total.toFixed(2),
    };
    setHistorial((prev) => [nuevaEntrada, ...prev]);
  };

  const manejarPropinaPredefinida = (porcentaje: number) => {
    setUsarPropinaPersonalizada(false);
    setPorcentajePropina(porcentaje);
  };

  const manejarPropinaPersonalizada = (texto: string) => {
    const porcentaje = parseFloat(texto) || 0;
    setUsarPropinaPersonalizada(true);
    setPorcentajePropina(porcentaje);
  };

  return (
    <View style={estilos.contenedorPrincipal}>
      <View style={estilos.contenedor}>
        <Text style={estilos.titulo}>Calculadora de Propinas</Text>

        <TextInput
          style={estilos.entrada}
          placeholder="Ingresa el monto de la cuenta"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={montoCuenta}
          onChangeText={setMontoCuenta}
        />

        <Text style={estilos.subtitulo}>Selecciona un porcentaje de propina:</Text>
        <View style={estilos.botonesPropina}>
          {[10, 15, 20].map((porcentaje) => (
            <TouchableOpacity
              key={porcentaje}
              style={[
                estilos.botonPropina,
                !usarPropinaPersonalizada && porcentajePropina === porcentaje && estilos.botonSeleccionado,
              ]}
              onPress={() => manejarPropinaPredefinida(porcentaje)}
            >
              <Text style={estilos.textoBoton}>{porcentaje}%</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={estilos.entrada}
          placeholder="Porcentaje personalizado"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={usarPropinaPersonalizada ? porcentajePropina.toString() : ''}
          onChangeText={manejarPropinaPersonalizada}
        />

        <View style={estilos.resultados}>
          <Text style={estilos.textoResultado}>Propina: ${montoPropina}</Text>
          <Text style={estilos.textoResultado}>Total a pagar: ${montoTotal}</Text>
        </View>

        <Text style={estilos.subtitulo}>Historial de cálculos:</Text>
        <FlatList
          data={historial}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={estilos.itemHistorial}>
              <Text style={estilos.textoHistorial}>Cuenta: ${item.cuenta}</Text>
              <Text style={estilos.textoHistorial}>Propina: {item.porcentaje}%</Text>
              <Text style={estilos.textoHistorial}>Monto de propina: ${item.propina}</Text>
              <Text style={estilos.textoHistorial}>Total pagado: ${item.total}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  contenedor: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFD700',
    textAlign: 'center',
  },
  entrada: {
    height: 50,
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#1E1E1E',
    color: '#FFF',
    fontSize: 16,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#FFD700',
  },
  botonesPropina: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botonPropina: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonSeleccionado: {
    backgroundColor: '#FFD700',
  },
  textoBoton: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  resultados: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    elevation: 2,
  },
  textoResultado: {
    fontSize: 18,
    color: '#FFD700',
    marginVertical: 5,
  },
  itemHistorial: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    elevation: 1,
  },
  textoHistorial: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default CalculadoraPropinas;