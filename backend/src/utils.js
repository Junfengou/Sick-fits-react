/*
  The purpose of this helper method is to check whether the user have the permission to perform certain actions

    in the [datamodel.prisma] we have a enum that defined all the permissions
    the data might come in like this

    {
      user: "OG"
      permissions: ["ADMIN", "ITEMUPDATE"]
    }

*/

/*
    function hasPermission([name of the user], [an array of permissions that are needed])
    {
       const matchedPermissions = filter the user permission to see if any of the match the one we're looking for
       if(if they have no permission meaning the array gets pass back is empty)
       {
         throw an error [permission needed] You have: [permission you have]
       }
    }
*/

function hasPermission(user, permissionsNeeded) {
	const matchedPermissions = user.permissions.filter((permissionTheyHave) =>
		permissionsNeeded.includes(permissionTheyHave)
	);
	if (!matchedPermissions.length) {
		throw new Error(`You do not have sufficient permissions

      : ${permissionsNeeded}

      You Have:

      ${user.permissions}
      `);
	}
}

exports.hasPermission = hasPermission;
