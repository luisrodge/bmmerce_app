import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { colors, fonts } from '../../styles';
import { moderateScale } from '../../utils/scaling';
import FastImage from 'react-native-fast-image';

const Preview = props => {
    return (
        <View style={styles.container}>
            <FastImage
              style={styles.image}
              source={{ uri: props.image, priority: FastImage.priority.normal }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.touchStyles}
                    onPress={props.onRetake}
                >
                    <Text style={{color: "#FFF", fontSize: moderateScale(16, 1.7), fontFamily: fonts.robotoCondensed}}>
                        Retake
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.touchStyles}
                    onPress={props.onContinue}
                >
                    <Text style={{color: "#FFF", fontSize: moderateScale(18, 1.7), color: colors.green, fontFamily: fonts.robotoCondensed}}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    image: {
        flex: 1,
        backgroundColor: '#000'
    },
    touchStyles: {
        flex: 1, 
        alignSelf: 'stretch', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    footer: {
        backgroundColor: '#000',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Preview;