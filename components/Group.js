import React, {useEffect, useState} from 'react';

import {View, StyleSheet, Text, Image } from 'react-native';
import {Entypo, FontAwesome, Ionicons} from '@expo/vector-icons';
import {convertDate2} from '../shared/generic'
import colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../store/actions/myGroups';

const Group = props => {
  const dispatch = useDispatch()
  const groupData = useSelector(state => state.myGroups).find(group => group.id === props.id)

	useEffect(() => {
    if (props.memberIds) {
      dispatch(getMembers(props.memberIds, props.id));
    } else {
      console.error('No members found in group!')
    }
	}, []);

  return (
    <View style = {styles.parent}>
      <View style = {styles.container}>
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
          <Entypo style={{right: 6, bottom: 1}} name="location-pin" size={12} color={colors.darkGrey} />
          <Text style={{...styles.smallText, right: 5, bottom: 1}}>{props.city}</Text>
          <FontAwesome style={{left: 10, bottom: 0}}  name="calendar-o" size={10} color={colors.darkGrey} />
          <Text style={{...styles.smallText, left: 15, bottom: 1}}>{convertDate2(props.dueDate)}</Text>
      </View>
      {
        <View style={styles.membersContainer}>
        {groupData.members.map((member, index) => (
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
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: 'roboto-medium'
  },
  container: {
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
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0, 
      height: 10
    }
  },
  image: {
    width: 70, 
    height: 70, 
    borderRadius: 14,

  },
  smallText: {
    fontFamily: 'roboto-medium',
    fontSize: 11,
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
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      width: 0, 
      height: 2
    }
  },
  memberImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 27,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 0.3,
    borderColor: colors.mediumGrey,
    marginTop: 3,
    marginHorizontal: -2,
  },
  availableSpotsText: {
    fontFamily: 'roboto-light',
    color: colors.darkGrey,
  }
});

export default Group;
