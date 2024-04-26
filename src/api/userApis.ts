export const fetchUsers = async () => {
    try {
        const res = await fetch('http://localhost:3000/user')
        return await res.json()
    } catch (err) {
        return console.log(err)
    }
}

/**
 * Updates a user with the specified userId.
 *
 * @param {number} userId - The ID of the user to be updated.
 * @param {Object} userData - An object containing the updated user data.
 * @param {string} userData.firstName - The updated first name of the user.
 * @param {string} userData.lastName - The updated last name of the user.
 * @param {string} userData.email - The updated email of the user.
 * @return {Promise} A Promise that resolves to the updated user data.
 */
export const updateUser = async (userId:number, userData: {firstname: string, lastname: string, email: string, actions:string}): Promise<any> => {
    try {
        const res = await fetch(`http://localhost:3000/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        return await res.json()
    } catch (err) {
        return console.log(err)
    }
}

export const createUser = async (userData: {firstname: string, lastname: string, email: string, actions:string[]}) => {
    try {
        const res = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        return await res.json()
    } catch (err) {
        return console.log(err)
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const res = await fetch(`http://localhost:3000/user/${userId}`, {
            method: 'DELETE'
        })
        return await res.json()
    } catch (err) {
        return console.log(err)
    }
}

export const runAction = async (userData: {userId: string, actions:string}) => {
    try {
        const res = await fetch('http://localhost:3000/action', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        return await res.json()
    } catch (err) {
        return console.log(err)
    }
}