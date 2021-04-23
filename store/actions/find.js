import Fire from "../../Fire";
import { convertFirebaseGroupsToArray, convertFirebaseUsersToArray } from "../../shared/firebase";

export const toggleShowMap = () => {
	return async (dispatch, getState) => {
		const showMap = getState().find.showMap;
			dispatch({type: 'TOGGLE_SHOW_MAP', showMap: !showMap})
	}
}

// No Redux functions
export const getUsersByName = async(name) => {
	const data = await Fire.users.orderByChild('nameLower').startAt(name).endAt(name+"\uf8ff").once('value')
	return convertFirebaseUsersToArray(data);
}

export const getGroupsByName = async(name) => {
	const data = await Fire.groups.orderByChild('nameLower').startAt(name).endAt(name+"\uf8ff").once('value')
	return convertFirebaseGroupsToArray(data);
}

export const getUsersByCity = async(city) => {
	const data = await Fire.users.orderByChild('city').equalTo(city).once('value');
	return convertFirebaseUsersToArray(data);
}

export const getGroupsByCity = async(city) => {
	const data = await Fire.groups.orderByChild('city').equalTo(city).once('value');
	return convertFirebaseGroupsToArray(data);
}

export const getMembersDetails = async(listOfIds) => {
	const promises = []
	const memberDetails = []

	listOfIds.forEach(id => {
		promises.push(Fire.users.orderByKey().equalTo(id).once('value'));
	});

	const returnVal = await Promise.all(promises);

	returnVal.forEach(element => {
			const id = Object.keys(element.val())[0]
			const el = element.val()[Object.keys(element.val())];
			memberDetails.push({id: id, ...el});
		});
	
		return memberDetails;
};
