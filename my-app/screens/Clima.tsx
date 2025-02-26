import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

type Pronostico = {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
            text: string;
            icon: string;
        };
        daily_chance_of_rain: number;
    };
};

const getBackgroundColor = (temp: number) => {
    if (temp < 20) return '#2E86C1'; // Azul
    if (temp >= 21 && temp <= 30) return '#F4C542'; // Amarillo
    return '#F39C12'; // Naranja
};

const getDayOfWeek = (date: string) => {
    const day = new Date(date).toLocaleString('es-ES', { weekday: 'long' });
    return day.charAt(0).toUpperCase() + day.slice(1);
};

const WeatherPronostico = () => {
    const [pronosticoData, setPronosticoData] = useState<Pronostico[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const apiKey = '5f0592004c0d4d17b83180243252502';
                    const apiURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=5&aqi=no&alerts=no`;
        
                    const response = await axios.get<{ forecast: { forecastday: Pronostico[] } }>(apiURL);
                    
                    setPronosticoData(response.data.forecast.forecastday);
                    setCargando(false);
                });
            } catch (error) {
                console.log('Error al obtener datos del clima:', error);
            }
        };
        

        fetchData();
    }, []);

    const CargandoScreen = () => {
        return (
            <View style={styles.loadingContainer}>
                <Text style={{ color: '#FFF' }}>Cargando Pronóstico...</Text>
                <ActivityIndicator size="large" color="#FFF" />
            </View>
        );
    };

    const ForecastItem = ({ forecast }: { forecast: Pronostico }) => {
        return (
            <View style={[styles.itemContainer, { backgroundColor: getBackgroundColor(forecast.day.maxtemp_c) }]}>
                <Text style={styles.date}>{forecast.date}</Text>
                <Text style={styles.day}>{getDayOfWeek(forecast.date)}</Text>
                <Image
                    source={{ uri: `https:${forecast.day.condition.icon}` }}
                    style={styles.icon}
                />
                <Text style={styles.condition}>{forecast.day.condition.text}</Text>
                <Text style={styles.temp}>
                    {forecast.day.maxtemp_c}° / {forecast.day.mintemp_c}°
                </Text>
                <Text style={styles.rainChance}>Probabilidad de lluvia: {forecast.day.daily_chance_of_rain}%</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {cargando ? (
                <CargandoScreen />
            ) : (
                <FlatList
                    data={pronosticoData}
                    renderItem={({ item }) => <ForecastItem forecast={item} />}
                    keyExtractor={(item) => item.date}
                    horizontal={false} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                />
            )}
        </View>
    );
};

export default WeatherPronostico;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2C2C2C', 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        paddingVertical: 20,
    },
    itemContainer: {
        borderRadius: 10,
        padding: 15,
        marginVertical: 10, 
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth * 0.85, 
        minHeight: 150, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    date: {
        fontSize: 14,
        color: '#FFF',
        marginBottom: 4,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    day: {
        fontSize: 14,
        color: '#FFF',
        marginBottom: 4,
        textAlign: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        marginVertical: 10,
    },
    condition: {
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
        marginVertical: 2,
    },
    temp: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },
    rainChance: {
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 5,
    },
});
