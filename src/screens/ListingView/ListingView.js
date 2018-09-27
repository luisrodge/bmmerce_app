import React from 'react';
import { 
  StyleSheet, 
  View,
  ScrollView,
  Text
} from 'react-native';
import { format } from 'date-fns';
import { Button, Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { moderateScale } from '../../utils/scaling';

import { colors, fonts } from '../../styles';

export default class ListingView extends React.PureComponent {
  state = {
    loading: true,
    isMapReady: false,
    listing: {}
  }

  componentDidMount() {
    //this.props.getListing(this.props.navigation.state.params.listing.id);
    this.setState({
      listing: this.props.navigation.state.params.listing
    }, () => {
      this.setState({loading: false})
    })
  }

  onMessage = () => {
    this.props.navigation.navigate('Message');
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={{flex: 1}}>
          <View style={{flex:1, backgroundColor: "#FFF"}}>
            <ScrollView showsVerticalScrollIndicator={false} >
              <View style={{ backgroundColor: '#FAFAFA', height: 350}}>
                {this.state.listing.images &&
                  <FastImage
                    style={StyleSheet.absoluteFill}
                    source={{ uri: this.state.listing.images[0]['listing_image']['url'] }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                }
              </View>
              <View style={{backgroundColor: '#FFF', justifyContent: 'center', paddingVertical: 20}}>
                <View style={{backgroundColor: "#FFF", flexDirection: "row", paddingBottom: 12, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: "#F7F7F7"}}>
                  <View style={{flex: 2}}>
                    <Text style={{ fontFamily: fonts.robotoCondensed, fontSize: moderateScale(18, 2.5), color: colors.dark}} numberOfLines={1}>
                      {this.state.listing.title}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{ fontFamily: fonts.robotoCondensed, fontSize: moderateScale(18, 2.5), color: "#1FB200", textAlign: "right"}}>
                      ${parseFloat(this.state.listing.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    </Text>
                  </View>
                </View>
                {this.state.listing.description !== null && this.state.listing.description !== "" &&
                  <View style={{borderBottomWidth: 1, borderBottomColor: "#F7F7F7", paddingVertical: 12}}>
                    <Text style={{fontFamily: fonts.robotoCondensed, color: colors.dark, fontSize: moderateScale(15, 2.5), paddingHorizontal: 12}} numberOfLines={1}>
                      {this.state.listing.description}
                    </Text>
                  </View>
                }
                {this.state.listing.listedBy &&
                  <View style={{flexDirection: 'row', paddingHorizontal: 12, paddingTop: 10}}>
                      <FastImage
                        style={{width: 35, height: 35, borderRadius: 35/2, marginRight: 12}}
                        source={{
                          uri: this.state.listing.listedBy.account.avatar,
                          priority: FastImage.priority.normal
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                      <View>
                        <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(15, 2.5), color: colors.dark, marginVertical: 0}}>
                          Listed by {this.state.listing.listedBy.account.name}
                        </Text>
                        <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(15, 2.5), color: colors.dark, paddingTop: 1}}>
                          In {`${this.state.listing.address}, ${this.state.listing.district}`}
                        </Text>
                        <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(15, 2.5), color: colors.grey, paddingTop: 8}}>
                          {format(this.state.listing.createdAt, 'EEEE, LLLL do yyyy')}
                        </Text>
                      </View>
                  </View>
                }
              </View>
            </ScrollView>
          </View>
          <View>
            <Button
              containerViewStyle={{width: '100%', marginLeft: 0, alignSelf: 'stretch'}}
              buttonStyle={{backgroundColor: colors.green}}
              title='Message' 
              titleStyle={{fontFamily: fonts.robotoCondensed, fontWeight: 'normal', fontSize: moderateScale(18, 2.5)}}
              icon={{name: 'md-text', type: 'ionicon', color: "#FFF", size: 20}}
              //onPress={() => this.setState({modalVisible: true})}
              onPress={
                () => navigate('Engagement', {
                    listingId: this.state.listing.id, 
                    recipientId: this.state.listing.listedBy.account.id,
                    image: this.state.listing.images[0]['listing_image']['url'],
                    price: this.state.listing.price,
                    recipientName: this.state.listing.listedBy.account.name
                  }
                )}
            
            />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    height: 100,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
});
