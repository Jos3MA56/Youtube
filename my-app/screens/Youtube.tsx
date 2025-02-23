import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';

export default function YouTubeHome() {
    const videos = [
        { id: '1', titulo: 'Asi es el “PUEBLO MAS POBRE” de Mexico 🇲🇽 (Pobreza Extrema)', canal: 'Yulay', vistas: '5.7 M de vistas', tiempo: 'hace 3 años', thumbnail: require('../assets/yulay.png') },
        { id: '2', titulo: 'Nadie entiende lo que acaba de pasar en PANAMÁ! PANAMÁ va a ser INVADIDA por ESTADOS UNIDOS?', canal: 'Tu COSMOPOLIS', vistas: '3,346 vistas', tiempo: 'hace 2 horas', thumbnail: require('../assets/cosmo.png') },
        { id: '3', titulo: 'El FINAL ALTERNATIVO que MUY POCOS VIERON en Soy Leyenda | Relato y Reflexiones', canal: 'Farid Dieck', vistas: '2.3 M de vistas', tiempo: 'hace 1 mes', thumbnail: require('../assets/Leyenda.png') },
        { id: '4', titulo: 'ROMANTHICA "Te Extraño" video oficial', canal: 'romanthicaoficial', vistas: '3.4 k vistas', tiempo: 'hace 3 dias', thumbnail: require('../assets/roman.png') },
        { id: '5', titulo: 'YO... NO PUEDO , DEBO DIBUJAR', canal: 'ElGab', vistas: '25 k vistas', tiempo: 'hace 5 días', thumbnail: require('../assets/gab.png') },
        { id: '6', titulo: 'EL REY LEPROSO: El Reino de los Cielos', canal: 'ENMINUTOS', vistas: '2.7 M de vistas', tiempo: 'hace 1 año', thumbnail: require('../assets/king.png') },
        { id: '7', titulo: '¡ESTAMOS EN HUELGA! 😡 | CORTITOS 22', canal: 'QueParió!', vistas: '90 k vistas', tiempo: 'hace 4 meses', thumbnail: require('../assets/que.png') },
    ];
    const categorias = ['En vivo', 'Videojuegos', 'Noticias', 'Deportes', 'Aprendizaje', 'Podcasts', 'Libros', 'Música', 'Mises', 'Ciencia ficción', 'Suspenso', 'Series de televisión', 'Metal alternativo', 'Albumes', 'Comedias dramáticas'];

    const [activeTab, setActiveTab] = useState('home');

    return (
        <ScrollView style={estilos.container}>
            {/* Encabezado */}
            <View style={estilos.header}>
                <TouchableOpacity>
                    <Image tintColor={'#fff'} source={{ uri: 'https://img.icons8.com/material-outlined/24/menu--v1.png' }} style={estilos.menuIcon} />
                </TouchableOpacity>
                <Text style={estilos.headerTitulo}>YouTube</Text>
                <View style={estilos.busquedaContainer}>
                    <Image tintColor={'#fff'} source={{ uri: 'https://img.icons8.com/material-outlined/24/search--v1.png' }} style={estilos.busquedaIcon} />
                    <Text style={estilos.busquedaPlaceholder}>Buscar</Text>
                </View>
            </View>

            {/* Categorías */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.categorias}>
                {categorias.map((categoria, index) => (
                    <TouchableOpacity key={index} style={estilos.categoriaButton}>
                        <Text style={estilos.categoriaText}>{categoria}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={estilos.line} />

            {/* Lista de videos */}
            <FlatList
                data={videos}
                numColumns={1}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={estilos.videoContainer}>
                        <Image source={item.thumbnail} style={estilos.thumbnail} resizeMode="cover" />
                        <View style={estilos.videoInfo}>
                            <Text style={estilos.videoTitulo} numberOfLines={2}>{item.titulo}</Text>
                            <Text style={estilos.videocanal} numberOfLines={1}>{item.canal}</Text>
                            <Text style={estilos.videoVistas}>{item.vistas} • {item.tiempo}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Barra de navegación inferior */}
            <View style={estilos.navBar}>
                <TouchableOpacity onPress={() => setActiveTab('home')} style={estilos.navItem}>
                    <Image tintColor={activeTab === 'home' ? '#FF0000' : '#fff'} source={{ uri: 'https://img.icons8.com/material-outlined/24/home.png' }} style={estilos.navIcon} />
                    <Text style={[estilos.navText, activeTab === 'home' && estilos.activeNavText]}>Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('explore')} style={estilos.navItem}>
                    <Image tintColor={activeTab === 'explore' ? '#FF0000' : '#fff'} source={{ uri: 'https://img.icons8.com/material-outlined/24/explore.png' }} style={estilos.navIcon} />
                    <Text style={[estilos.navText, activeTab === 'explore' && estilos.activeNavText]}>Explorar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('library')} style={estilos.navItem}>
                    <Image tintColor={activeTab === 'library' ? '#FF0000' : '#fff'} source={{ uri: 'https://img.icons8.com/material-outlined/24/library.png' }} style={estilos.navIcon} />
                    <Text style={[estilos.navText, activeTab === 'library' && estilos.activeNavText]}>Biblioteca</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0F0F',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#0F0F0F',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    menuIcon: {
        width: 24,
        height: 24,
    },
    headerTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF0000',
    },
    busquedaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0F0F0F',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 2,
        borderColor: '#fff',
    },
    busquedaIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
        color: '#fff',
    },
    busquedaPlaceholder: {
        fontSize: 14,
        color: '#fff',
    },
    categorias: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#0F0F0F',
    },
    categoriaButton: {
        marginRight: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#1F1F1F',
        borderRadius: 20,
        borderColor: '#fff',
        borderWidth: 2,
    },
    categoriaText: {
        fontSize: 14,
        color: '#fff',
    },
    line: {
        height: 1,
        backgroundColor: '#ccc',
        marginTop: 10,
    },
    videoContainer: {
        margin: 10,
        alignItems: 'center',
    },
    thumbnail: {
        width: '100%',
        aspectRatio: 16 / 9, 
        borderRadius: 5,
    },
    videoInfo: {
        marginTop: 10,
        alignItems: 'center', 
    },
    videoTitulo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center', 
    },
    videocanal: {
        fontSize: 12,
        color: '#fff',
        textAlign: 'center', 
        marginTop: 4,
    },
    videoVistas: {
        fontSize: 10,
        color: '#fff',
        textAlign: 'center', 
        marginTop: 4,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#0F0F0F',
    },
    navItem: {
        alignItems: 'center',
    },
    navIcon: {
        width: 24,
        height: 24,
    },
    navText: {
        fontSize: 12,
        color: '#fff',
        marginTop: 5,
    },
    activeNavText: {
        color: '#FF0000', 
    },
});