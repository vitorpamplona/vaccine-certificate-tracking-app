import React, {Component} from 'react';
import { StyleSheet, View, Image, Button, TouchableOpacity } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Moment from 'moment';

export default class CouponCard extends Component {

	showQR = (card) => {
    this.props.navigation.navigate({name: 'QRShow', params: {
        qr: card.rawQR, 
        title: "Coupon: " + this.cert().number, 
        detail: "Phase " + this.cert().phase + " in " + this.cert().city,
        signedBy: "Signed by " + card.pub_key.toLowerCase() + " on " + Moment(card.cert.issuanceDate).format('MMM DD, YYYY')
      }
    });
  }

	cert = () => {
		return this.props.detail.cert ? this.props.detail.cert : this.props.detail;
	}

	render() {
		return (
			<TouchableOpacity onPress={() => this.showQR(this.props.detail)}>
				<View style={[styles.card, {backgroundColor:this.props.colors.primary}]}>
					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - Coupon</Text>
						<FontAwesome5 style={styles.icon} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
					</View>
					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.time}>ID: {this.cert().number}</Text>	
					</View>
					
					<View style={{flexDirection:'row', justifyContent:'space-between'}}>
						<Text style={styles.notes}>Coupons: {this.cert().total}</Text>
					</View>

					<View style={{flexDirection:'row', justifyContent:'space-between'}}>
						<Text style={styles.notes}>Phase {this.cert().phase} in {this.cert().city}</Text>
					</View>
					
					<View style={{flexDirection:'row', justifyContent:'space-between'}}>
						<Text style={styles.notes}>
								Accepting only: {this.cert().indicator}
						</Text>
					</View>

					<Divider style={{ backgroundColor: '#dfe6e9', marginVertical:15}} />
					
					<View style={{flexDirection:'row', alignItems: 'center'}}>
						<FontAwesome5 style={styles.icon} name={'check-circle'} solid/>
						<Text style={styles.notes}>Signed by {this.props.detail.pub_key.toLowerCase()}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	card:{
		borderWidth:0,
		borderRadius:12.4,
		padding: 15
	},
	icon:{
		backgroundColor:"#00000000",
		color:'#fff',
		paddingRight: 8,
		fontSize:18
	},
	time:{
		fontSize:38,
		color:'#fff'
	},
	notes: {
		fontSize: 18,
		color:'#fff', 
	}
});