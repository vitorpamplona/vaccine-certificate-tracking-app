import React, {Component} from 'react';
import { StyleSheet, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Moment from 'moment';

import { CardStyles as styles } from '../themes/CardStyles' 

// This map is autogenerated from CDC data using the script in
//   universal-verifier-app/scripts/generate_vaccine_map.sh
// See comments in that script to update.
const VACCINE_CODES = {
	02        	: "ORIMUNE",
	03        	: "M-M-R II",
	05        	: "ATTENUVAX",
	06        	: "MERUVAX II",
	07        	: "MUMPSVAX",
	08        	: "ENGERIX B-PEDS",
	08        	: "RECOMBIVAX-PEDS",
	09        	: "TDVAX",
	09        	: "Td, adsorbed ",
	09        	: "Td, adsorbed",
	10        	: "IPOL",
	18        	: "Imovax",
	18        	: "RabAvert",
	19        	: "MYCOBAX",
	19        	: "TICE BCG",
	20        	: "ACEL-IMUNE",
	20        	: "CERTIVA",
	20        	: "INFANRIX",
	20        	: "TRIPEDIA",
	21        	: "VARIVAX",
	22        	: "TETRAMUNE",
	24        	: "BIOTHRAX",
	25        	: "VIVOTIF BERNA",
	25        	: "Vivotif",
	28        	: "DT(GENERIC)",
	32        	: "MENOMUNE",
	33        	: "PNEUMOVAX 23",
	35        	: "TETANUS TOXOID (GENERIC)",
	37        	: "YF-VAX",
	38        	: "BIAVAX II",
	39        	: "JE-VAX",
	40        	: "IMOVAX ID",
	43        	: "ENGERIX-B-ADULT",
	43        	: "RECOMBIVAX-ADULT",
	44        	: "RECOMBIVAX-DIALYSIS",
	46        	: "PROHIBIT",
	47        	: "HIBTITER",
	48        	: "ACTHIB",
	48        	: "HIBERIX",
	48        	: "OMNIHIB",
	49        	: "PEDVAXHIB",
	50        	: "TRIHIBIT",
	51        	: "COMVAX",
	52        	: "HAVRIX-ADULT",
	52        	: "VAQTA-ADULT",
	53        	: "TYPHOID-AKD",
	56        	: "DENGVAXIA",
	62        	: "GARDASIL",
	75        	: "ACAM2000",
	75        	: "ACAM2000",
	75        	: "DRYVAX",
	83        	: "HAVRIX-PEDS",
	83        	: "VAQTA-PEDS",
	94        	: "PROQUAD",
	100       	: "PREVNAR 7",
	100       	: "PREVNAR 7",
	101       	: "TYPHIM VI",
	104       	: "TWINRIX",
	106       	: "DAPTACEL",
	110       	: "PEDIARIX",
	111       	: "FLUMIST",
	113       	: "DECAVAC",
	113       	: "Tenivac",
	114       	: "MENACTRA",
	115       	: "ADACEL",
	115       	: "BOOSTRIX",
	116       	: "ROTATEQ",
	118       	: "CERVARIX",
	119       	: "ROTARIX",
	120       	: "PENTACEL",
	121       	: "ZOSTAVAX",
	125       	: "Novel Influenza-H1N1-09, nasal",
	126       	: "Novel influenza-H1N1-09, preservative-free",
	126       	: "Novel influenza-H1N1-09, preservative-free",
	126       	: "Novel influenza-H1N1-09, preservative-free",
	127       	: "Novel influenza-H1N1-09",
	127       	: "Novel influenza-H1N1-09",
	127       	: "Novel influenza-H1N1-09",
	130       	: "KINRIX",
	130       	: "Quadracel",
	133       	: "PREVNAR 13",
	133       	: "PREVNAR 13",
	134       	: "IXIARO",
	134       	: "IXIARO",
	134       	: "Ixiaro",
	135       	: "FLUZONE-HIGH DOSE",
	136       	: "MENVEO",
	136       	: "Menveo",
	140       	: "AGRIFLU",
	140       	: "Afluria, preservative free",
	140       	: "Afluria, preservative free",
	140       	: "FLUARIX",
	140       	: "FLUVIRIN-PRESERVATIVE FREE",
	140       	: "FLUZONE-PRESERVATIVE FREE",
	140       	: "Flulaval, preservative free",
	140       	: "Fluvirin preservative free",
	141       	: "AFLURIA",
	141       	: "Afluria",
	141       	: "FLULAVAL",
	141       	: "FLUVIRIN",
	141       	: "FLUZONE",
	141       	: "Fluvirin",
	143       	: "Adenovirus types 4 and 7",
	143       	: "Adenovirus types 4 and 7",
	144       	: "Fluzone, intradermal",
	146       	: "VAXELIS",
	148       	: "MENHIBRIX",
	149       	: "Flumist quadrivalent",
	150       	: "Afluria quadrivalent preservative free",
	150       	: "Fluarix, quadrivalent, preservative free",
	150       	: "Flulaval, quadrivalent, preservative free",
	150       	: "Fluzone, quadrivalent, preservative free",
	153       	: "Flucelvax",
	155       	: "Flublok",
	158       	: "Afluria, quadrivalent",
	158       	: "Flulaval quadrivalent",
	158       	: "Fluzone, Quadrivalent",
	160       	: "Influenza A (H5N1) -2013",
	160       	: "Influenza A monovalent (H5N1), ADJUVANTED-2013",
	161       	: "Afluria quadrivalent, preservative free, pediatric",
	161       	: "Fluzone Quadrivalent, pediatric",
	162       	: "Trumenba",
	163       	: "Bexsero",
	163       	: "Bexsero",
	165       	: "Gardasil 9",
	166       	: "Fluzone Quad Intradermal",
	168       	: "Fluad",
	168       	: "Fluad",
	171       	: "flucelvax, quadrivalent, preservative free",
	174       	: "VAXCHORA",
	175       	: "IMOVAX",
	176       	: "RABAVERT",
	176       	: "RABAVERT",
	183       	: "Stamaril",
	185       	: "Flublok quadrivalent",
	185       	: "Flublok quadrivalent",
	186       	: "Flucelvax, quadrivalent, with preservative",
	187       	: "SHINGRIX",
	189       	: "HEPLISAV-B",
	197       	: "FLUZONE High-Dose Quadrivalent",
	200       	: "FLUZONE Quadrivalent Southern Hemisphere, Pediatric",
	201       	: "FLUZONE Quadrivalent Southern Hemisphere",
	202       	: "FLUZONE Quadrivalent Southern Hemisphere",
	203       	: "MenQuadfi",
	204       	: "ERVEBO (Ebola Zaire Vaccine, Live)",
	205       	: "FLUAD Quadrivalent",
	206       	: "JYNNEOS",
	207       	: "Moderna COVID-19 Vaccine",
	208       	: "Pfizer-BioNTech COVID-19 Vaccine",
	210       	: "AstraZeneca COVID-19 Vaccine",
	211       	: "Novavax COVID-19 Vaccine",
	212       	: "Janssen (J&J) COVID-19 Vaccine",
	801       	: "AS03 adjuvant"
}


export default class SHCCard extends Component {

	patientRecords = () => {
		return this.props.detail.cert.vc.credentialSubject.fhirBundle.entry.filter(entry => entry.resource.resourceType === "Patient");
	}

	otherRecords = () => {
		return this.props.detail.cert.vc.credentialSubject.fhirBundle.entry.filter(entry => entry.resource.resourceType !== "Patient");
	}

	patientName = () => {
		let pat = this.patientRecords();
		return pat[0].resource.name[0].given.join(' ') + " " + pat[0].resource.name[0].family
	}

	patientDob = () => {
		let pat = this.patientRecords();
		return new Date(pat[0].resource.birthDate);
	}

	issuerName = (card) => {
		if (card.pub_key.toLowerCase() === "https://myvaccinerecord.cdph.ca.gov/creds") 
			return "State of California"
		return card.pub_key.toLowerCase();
	}

	issuedAt = (card) => {
		return Moment(new Date(parseInt(card.cert.nbf)*1000)).format('MMM DD, YYYY');
	}

	showQR = (card) => {
    this.props.navigation.navigate({name: 'QRShow', params: {
        qr: card.rawQR, 
        title: this.patientName(), 
        detail: "DoB: " + Moment(this.patientDob()).format('MMM DD, YYYY'),
        signedBy: this.issuerName(card) + " on " + this.issuedAt(card)
      }
    });
  }

	renderCard = () => {
		return (
			<View style={[styles.card, {backgroundColor:this.props.colors.primary}]}>
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - Vaccine Record</Text>
					<FontAwesome5 style={styles.button} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.title}>{this.patientName()}</Text>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>DoB: {Moment(this.patientDob()).format('MMM DD, YYYY')}</Text>
				</View>
				
				<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />

				<FlatList 
					data={this.otherRecords()} 
					keyExtractor={item => item.fullUrl} 
					renderItem={({item}) => {
						return (	
							<View style={styles.groupLine}>
								<View style={styles.row}>
									<Text style={styles.notes}>{item.resource.resourceType} at {item.resource.occurrenceDateTime}</Text>
								</View>
								
								<View style={styles.row}>
									<Text style={styles.notes}>
											Vaccine: {VACCINE_CODES[item.resource.vaccineCode.coding[0].code]}, Lot #{item.resource.lotNumber}
									</Text>
								</View>
							</View>
						)
					}} />
					
				<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />
				
				<View style={{flexDirection:'row', alignItems: 'center'}}>
					<FontAwesome5 style={styles.icon} name={'check-circle'} solid/>
					<Text style={styles.notes}>{this.issuerName(this.props.detail)} on {this.issuedAt(this.props.detail)}</Text>
				</View>
			</View>
		);
	}


	render() {
		return this.props.pressable ? 
		( <TouchableOpacity onPress={() => this.showQR(this.props.detail)}>
				{this.renderCard()}
			</TouchableOpacity>
		) : this.renderCard();
	}
}
