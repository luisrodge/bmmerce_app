import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from "react-native-modal";
import { Button, Input, Icon } from 'react-native-elements';
import { fonts, colors } from '../../styles';
import { moderateScale } from '../../utils/scaling';
import SearchAddress from './SearchAddress';

const PostModal = props => {
    return (
        <View>
            <Modal 
                isVisible={props.showModal}
                style={styles.bottomModal}
                swipeDirection='down'
                onBackButtonPress={props.hideModal}
                onBackdropPress={props.hideModal}
                onSwipe={props.hideModal}
            >
                <View style={styles.modalContent}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps='always'
                    >
                    <Input 
                        underlineColorAndroid='transparent'
                        placeholder="Title"
                        containerStyle={{marginBottom: 20, width: '100%'}}
                        inputStyle={{fontFamily: fonts.robotoCondensed, paddingHorizontal: 0, color: colors.dark, fontSize: moderateScale(18, 2.5), height: '100%', borderWidth: 0}}
                        inputContainerStyle={{borderColor: "#CCC", borderBottomWidth: 1}}
                        onChangeText={(title) => props.handleInput('title', title)}
                        value={props.values.title}
                    />
                    <Input 
                        placeholder="Price"
                        underlineColorAndroid='transparent'
                        containerStyle={{marginBottom: 20, width: '100%'}}
                        inputStyle={{fontFamily: fonts.robotoCondensed, color: colors.dark, paddingHorizontal: 0, fontSize: moderateScale(18, 2.5), height: '100%'}}
                        inputContainerStyle={{borderColor: "#CCC", borderBottomWidth: 1}}
                        onChangeText={(price) => props.handleInput('price', price)}
                        value={props.values.price}
                        keyboardType="numeric"
                    /> 
                    <SearchAddress 
                        onPress = {(address, latitude, longitude) => 
                            props.handleSetAddress(address, latitude, longitude)
                        }
                    />
                    <Button 
                        title="Post & Continue"
                        titleStyle={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(18, 2.5), fontWeight: 'normal'}}
                        onPress={props.createListing}
                        buttonStyle={{marginTop: 40, backgroundColor: colors.green, paddingVertical: 4, elevation: 0}} 
                        disabled={props.values.images.length == 0 || !props.values.title || !props.values.price || !props.values.address}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={props.skip}
                    >
                        <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(15, 1.7), color: '#7B8285', textAlign: 'center', paddingTop: 17}}>
                            Or Skip
                        </Text>
                    </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#FFF',
        paddingHorizontal: 22,
        paddingTop: 30,
        paddingBottom: 13,
        // justifyContent: "center",
        // alignItems: "center",
        borderColor: "rgba(0, 0, 0, 0.1)",
        elevation: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomWidth: 2,
        borderColor: colors.green
    },
});

export default PostModal;