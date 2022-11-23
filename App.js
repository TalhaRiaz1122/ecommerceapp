import { StatusBar } from 'expo-status-bar';
import {  Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';

export default function App() {

  const [data, setData] = useState([
    {
      id: 1,
      title: "Fjallraven - mens coat wear forever",
      price: 59.95,
      description: "Your perfect ok then talk to me pack for everyday use and walks in the, your everyday",
      category: "men clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    },
  ]
  )

  useEffect(() => {
    var Arr = JSON.parse(localStorage.getItem('DataArray'))
    if (Arr.length < 1) {
      fetch('https://fakestoreapi.com/products', {
        method: 'GET'
        //Request Type for request
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Success 
          setData(responseJson)
          console.log(responseJson);
          localStorage.setItem('DataArray', JSON.stringify(responseJson));
        })
        .catch((error) => {
          //Error 
          console.error(error);
        });
    } else {
      setData(Arr);
    }

  }, [])

  let bookMarked = (id) => {
    var dat = data.map(val => {
      if (val.id == id) {
        return {
          ...val,
          price: 0
        }
      } else {
        return val;
      }
    })
    setData(dat);

  }
  return (
    <SafeAreaView style={styles.container}>
      {
        data.map(val => {
          if (val.price !== 0) {
            return (
              <View style={styles.card} key={val.id}>
                <View style={styles.icon} >
                  <Entypo name="heart-outlined" size={24} color='black' onPress={() => { bookMarked(val.id) }} />
                </View>
                <Image
                  style={styles.tinyLogo}
                  source={{ uri: val.image }}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>


                  <View >
                    <Text style={{ color: 'grey', marginTop: 10 }}>
                      {val.category}
                    </Text>

                  </View>
                  <View >
                    <Text style={{ color: 'blue', marginTop: 10 }}>
                      {val.price}
                    </Text>

                  </View>
                  <View >
                    <Text style={{ color: 'black', marginTop: 10 }}>
                      BUY NOW
                    </Text>

                  </View>
                </View>
              </View>
            );

          }

        })
      }




    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap', width: '100'
  },
  tinyLogo: {
    width: 130,
    height: 180
  },
  card: {
    width: '45%',
    height: '40%',
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    margin: 10
  }, icon:
  {
    alignSelf: "flex-end",

  }
});
