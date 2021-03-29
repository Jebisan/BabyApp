import React, {useEffect} from 'react';

import {View, StyleSheet, Text, Image } from 'react-native';
import {Entypo, FontAwesome, Ionicons} from '@expo/vector-icons';
import {convertDate2} from '../Shared'
import colors from '../constants/colors';
import {setMembers} from '../store/actions/allGroups'
import { useDispatch, useSelector } from 'react-redux';


const Group = props => {
  const dispatch = useDispatch();
  const membersDetails = useSelector(state => state.allGroups.allGroups).find(group => group.key === props.id).membersDetails

  useEffect(() => {
    if (props.membersDetails.length === 0) {
      dispatch(setMembers(props.id))
    }
  }, [props.key])


  return (
    <View style = {styles.parent}>
      <View style = {styles.wishContainer}>

      <View style={styles.horizontalContainer}>
      <View style={styles.verticalContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: props.photoUrl }} />
      </View>
    <View style={styles.icon}>
    <Ionicons name="ios-arrow-forward" size={20} color="lightgrey" />
    </View>
      </View>

      <View style={styles.verticalContainer}>
        <Text style= {styles.titleText}>{props.name}</Text>
        <View style={styles.factsContainer}>
        <FontAwesome style={{right: 2}} name='group' size={10} color={colors.darkGrey} />
        <Text style={styles.smallText}>{props.groupType === 1 ?'Fædre' : 'Mødre'}</Text>
        <Entypo style={{left: 6, bottom: 1}} name="location-pin" size={12} color={colors.darkGrey} />
        <Text style={{...styles.smallText, left: 5, bottom: 1}}>5,5km</Text>
        <FontAwesome style={{left: 16, bottom: 0}}  name="calendar-o" size={10} color={colors.darkGrey} />
        <Text style={{...styles.smallText, left: 18, bottom: 0}}>{convertDate2(props.dueDate)}</Text>
      </View>
      {
        membersDetails && 
        <View style={styles.membersContainer}>
        {membersDetails.map((member, index) => (
          <Image key={index} source={{uri: member.photoUrl}} style={styles.memberImage} resizeMode="cover"></Image>
          ))}
      </View>
      }
      </View>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  } ,
  titleText: {
    fontSize: 20,
    fontWeight: "normal"
  },
  descriptionText: {
    fontSize: 14,
    color: 'grey',
    paddingTop: 3,
    paddingLeft: 1,
    fontStyle:'italic'
  },
  descriptionText2: {
    fontSize: 14,
    color: 'grey',
    paddingTop: 3,
    paddingLeft: 1,
  },
  wishContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    height: 90,
    width: 320,
  },
  horizontalContainer: {
    flexDirection: 'row'
  },
  verticalContainer: {
    flexDirection: 'column',
    padding: 7, 
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 310,
    bottom: 35,
    height: 20,
    width: 20,

  },
  imageContainer: {
  },
  image: {
    width: 70, 
    height: 70, 
    borderRadius: 12
  },
  smallText: {
    fontFamily: 'roboto-regular',
    fontSize: 10,
    color: colors.darkGrey,
  }, 
  factsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    top: 4,
    left: 4
  },
  membersContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 7,
  },
  memberImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.mediumGrey,
    margin: 3
  },
  availableSpotsText: {
    fontFamily: 'roboto-light',
    color: colors.darkGrey,
  }
});

export default Group;
