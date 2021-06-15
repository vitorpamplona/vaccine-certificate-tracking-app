import React, {useEffect} from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';

import {useTheme} from '../themes/ThemeProvider';
import Moment from 'moment';

import CowinCard from './../components/CowinCard';
import VaccineCard from './../components/VaccineCard';
import CouponCard from './../components/CouponCard';
import StatusCard from './../components/StatusCard';
import PassKeyCard from './../components/PassKeyCard';

const screenWidth = Math.round(Dimensions.get('window').width)-50;

function QRResult({ navigation, route }) {
  const {colors} = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: colors.background }, 
      headerTintColor: colors.text, 
      headerTitleStyle: {
          fontFamily: 'Verdana',
          fontWeight: 'normal',
          fontSize: 18,
      },
    });
  });

  const onPress = () => {
    navigation.navigate({name: 'Home'});
  }; 

  const qr = route.params.result.payload;

  return (
    <SafeAreaView style={styles.container} backgroundColor={colors.background}>
      <View style={styles.card}> 
        { qr.type === "BADGE" && <VaccineCard detail={qr} colors={colors} /> }
        { qr.type === "COUPON" && <CouponCard detail={qr} colors={colors} /> }
        { qr.type === "STATUS" && <StatusCard detail={qr} colors={colors} /> }
        { qr.type === "PASSKEY" && <PassKeyCard detail={qr} colors={colors} /> }
        { qr.type === "COWIN" && <CowinCard detail={qr} colors={colors} /> }
      </View>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: colors.primary}]}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, { color: '#fff'}]}>Close</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const CARD_ROUNDED_CORNERS = 12.4;

const styles = StyleSheet.create({
	container: {
		flex: 1, 
    alignItems: 'center',
		justifyContent: 'center'
  }, 
  card:{
		width: '90%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 16,
    shadowOpacity: 0.58,
    shadowRadius: 16.00,  
	}, 
  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    color: '#fff',
    padding: 15,
    width: '70%', 
    position: 'absolute',
    bottom:20, 
    elevation: 2, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00, 
  },
  buttonText: {
    alignItems: "center",
    fontSize: 16,
		lineHeight: 18, 
    fontWeight: 'bold'
  },
});

export default QRResult;