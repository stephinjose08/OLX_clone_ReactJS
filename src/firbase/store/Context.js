import { Children, createContext, useState } from "react";



export const Context =createContext(null)

export const AuthContext=createContext(null);


export default function Contextuser({children}){
    const [user,setUser]=useState(null)
    return(
    <AuthContext.Provider value={{user,setUser}}>
        {children}

    </AuthContext.Provider>
    )
        
    

}
