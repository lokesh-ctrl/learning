export const getFormattedUser = (user: any) => {
	if (user) {
		return {
			...user,
			full_name: user.first_name + ' ' + user.last_name
		}
	}
}