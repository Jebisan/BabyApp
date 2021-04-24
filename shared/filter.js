export const filterGroups = (filter, groups) => {
    const selectedGroupTypes = filter.groupTypes.filter(element => element.selected)
	const selectedExperiences = filter.experiences.filter(element => element.selected)
	const selectedMargin = filter.margin

	const selectedGroups = []
	groups.forEach(group => {
		selectedGroupTypes.forEach(selectedGroupType => {
			if(selectedGroupType.type === group.groupType) {
				selectedGroups.push(group);
			}
		});
	})

	const selectedGroups2 = []

	selectedGroups.forEach(group => {
		selectedExperiences.forEach(selectedExperience => {
			if(selectedExperience.type === group.experience) {
				selectedGroups2.push(group)
			}
		})
	})

	const selectedGroups3 = []

	selectedGroups2.forEach(group => {
		if (group.margin <= selectedMargin) {
			selectedGroups3.push(group)
		}
	})

    return selectedGroups3
}