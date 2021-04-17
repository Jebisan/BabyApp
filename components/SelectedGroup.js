import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import {Entypo, FontAwesome, SimpleLineIcons} from '@expo/vector-icons';
import colors from '../constants/colors';
import { convertDate2 } from '../Shared';
import { getMembersDetails } from '../store/actions/find';

const SelectedGroup = props => {
  const [membersDetails, setMembersDetails] = useState([]);

  useEffect(() => {
    if (props.group.members) {
      getMembersDetails(props.group.members).then(data => {
        setMembersDetails(data)
      })  
    } else {
      console.error('No members found in group!')
    }
  }, [])

  return (
    <View style={styles.parentContainer}>
    <View style={styles.contentContainer}>
      <View style={styles.leftContainer}>
        <Image source={{uri: props.group.photoUrl}} style={styles.groupImage} resizeMode="cover"></Image>
      </View>
      <View style={styles.centerContainer}>
      <View style={styles.verticalContainer}>
        <Text style={styles.title} >{props.group.name}</Text>
        <View style={styles.factsContainer}>
          <FontAwesome style={{right: 2}} name='group' size={10} color={colors.darkGrey} />
          <Text style={styles.smallText}>{props.group.groupType === 1 ?'Fædre' : 'Mødre'}</Text>
          <Entypo style={{left: 6, bottom: 1}} name="location-pin" size={12} color={colors.darkGrey} />
          <Text style={{...styles.smallText, left: 5, bottom: 1}}>5,5km</Text>
          <FontAwesome style={{left: 16, bottom: 0}}  name="calendar-o" size={10} color={colors.darkGrey} />
          <Text style={{...styles.smallText, left: 18, bottom: 0}}>{convertDate2(props.group.dueDate)}</Text>
        </View>

        {membersDetails.length > 0 && 
          <View style={styles.membersContainer}>
          {membersDetails.map((member, index) => (
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
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
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
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
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
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.mediumGrey,
    top: 1
  },  
  title: {
    fontFamily: 'roboto-bold',
    fontSize: 15
  },
  verticalContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
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
