import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: null,
    })

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            try {
                //atob Base64를 통해 암호화된 코드를 복호화 하는 함수 
                const payload = JSON.parse(atob(savedToken.split(".")[1]));
                const user = {
                    username: payload.sub,
                    role: payload.role
                };
                setAuth({
                    user,
                    token: savedToken
                });
            } catch (error) {
                console.error("토큰 포멧이 잘못되었습니다.", error);
                localStorage.removeItem('token');
                setAuth({ user: null, token: null });
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);