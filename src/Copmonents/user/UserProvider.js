import { useState, useEffect } from "react";
import { Get } from "../../Hooks/axiosApi";
import UserContext from './UserContext';
// //import { getUser } from '../../services/user';


const UserProvider = ({ children, userId }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        
        if (userId) {
            Get(`user/${userId}`).then(user => {
                setUser(user.data)
                localStorage.setItem("userId", user.data.idusers)
            }
            );
        }
   
    }, [userId]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider;