import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import {Entypo, FontAwesome, SimpleLineIcons} from '@expo/vector-icons';
import colors from '../constants/colors';
import { convertDate2 } from '../Shared';
import Fire from '../Fire'
import { useDispatch, useSelector } from 'react-redux';
import {setMembers} from '../store/actions/allGroups'
import { Button } from 'react-native';

const SelectedGroup = props => {

  const dispatch = useDispatch();


  useEffect(() => {
    if (!props.group.members) {
      console.log('Fetching members..')
      dispatch(setMembers(props.group.key))
    } else {
    }
  }, [props.group.key])


  return (
    <View style={styles.parentContainer}>
      <View style={styles.leftContainer}>
        <Image source={require('../assets/mother.jpg')} style={styles.groupImage} resizeMode="cover"></Image>
      </View>
      <View style={styles.centerContainer}>
      <View style={styles.verticalContainer}>
        <Text style={styles.title} >{props.group.name}</Text>
        <View style={styles.factsContainer}>
          <FontAwesome style={{right: 2}} name='group' size={10} color={colors.darkGrey} />
          <Text style={styles.smallText}>{props.group.groupType === 1 ?'Fædre' : 'Mødre'}</Text>
          <Entypo style={{left: 1}} name="location-pin" size={12} color={colors.darkGrey} />
          <Text style={styles.smallText}>5,5km</Text>
          <FontAwesome style={{right: 3, top: 1}}  name="calendar-o" size={10} color={colors.darkGrey} />
          <Text style={styles.smallText}>{convertDate2(props.group.dueDate)}</Text>
        </View>

        {props.group.members && 
          <View style={styles.membersContainer}>
          {props.group.members.map((member, index) => (
            <Image key={index} source={{uri: member.photoUrl}} style={styles.memberImage} resizeMode="cover"></Image>
            ))}
            <View style={styles.memberImage}>
              <Text style={styles.availableSpotsText}>{props.group.maxSize-props.group.members.length}</Text>
            </View>
        </View>
        }

      </View>
      </View>
      <View style={styles.rightContainer}>
      <View style={styles.verticalContainer} >
        <SimpleLineIcons name="arrow-right" size={16} color={colors.darkGrey} />
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: 'white',
    width: 350,
    height: 85,
    borderRadius: 20,
    padding: 5,
    shadowRadius: 10,
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  leftContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  centerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: 220,
    paddingTop: 8
  },
  rightContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 3
  },
  groupImage: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },  
  title: {
    fontFamily: 'roboto-regular',
    fontSize: 16
  },
  verticalContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  smallText: {
    fontFamily: 'roboto-regular',
    fontSize: 10,
    color: colors.darkGrey,
    width: 45,
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
    marginTop: 7
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

export default SelectedGroup;
