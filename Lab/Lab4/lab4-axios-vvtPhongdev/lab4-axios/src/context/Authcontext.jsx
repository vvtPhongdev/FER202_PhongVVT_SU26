import { createContext, useState, useEffect, useContext } from 'react';
import { authApi } from '../api/Userapi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('current_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const login = async (username, password) => {
        setLoading(true); setError('');
        try {
            const { account, user } = await authApi.login(username, password);
            const session = { ...user, role: account.role };
            setCurrentUser(session);
            localStorage.setItem('current_user', JSON.stringify(session));
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ currentUser, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };
export const useAuth = () => useContext(AuthContext);