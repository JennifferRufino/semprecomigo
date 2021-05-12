import React, { Component, useState, useEffect} from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	Alert,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from 'expo-permissions';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from 'react-native';
//import firebase from '../database/firebase';

function Map({navigation}) {

	const [origin, setOrigin] = useState(null);

	useEffect(()=>{
		(async function(){
			const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
			if (status === 'granted') {
				let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Lowest});
				setOrigin({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.000922,
					longitudeDelta: 0.000421
				})
			} else {
				throw new Error('Location permission not granted');
			}
		})();
	},[]);

    return(
        <View style={styles.mapContainer}>
				<MapView
					style={styles.map}
					initialRegion={origin}
					showsUserLocation={true}
					zoomEnabled={false}
					loadingEnabled={true}
				>
               </MapView>
               <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.push('Login')}
                >
                    <Text style={styles.btnText}>ENTRAR</Text>
                </TouchableOpacity>
                
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    mapContainer: {
		flex: 1,
		width: "100%",
        height: "50%",
		borderRadius: 10,
		overflow: "hidden",
		marginTop: 16,
	},
    map: {
		width: "100%",
		height: "80%",
	},
	btn: {
		color: '#3740FE',
		marginTop: 50,
		textAlign: 'center',
		alignItems:'center',
		borderColor: '#fff',
		paddingTop: 30,
		paddingLeft: 50,
		paddingRight: 50,
		paddingBottom: 30
	},
	btnText: {
		color: '#fff',
		backgroundColor: '#3740FE',
		height: "400%",
		width: "50%",
		borderColor: '#fff',
		textAlign: 'center'
	}
})

export default Map;