import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { currentUser, adminUser, isAuthenticated, handleLogout, handleAdminLogout } = useAuth();

    const handleUserLogout = () => {
        handleLogout();
    };

    const handleAdminLogoutClick = () => {
        handleAdminLogout();
    };

    return(
        <nav className="navbar" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#333',
            color:'white',
            position:'sticky',
            top:0,
            zIndex:1000
        }}>

            <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                <Link to="/topic" style={{ color: 'white', textDecoration: 'none' }}>Topic</Link>
                <Link to="/quiz" style={{ color: 'white', textDecoration: 'none' }}>Quiz</Link>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {isAuthenticated ? (
                    <>
                        {currentUser && (
                            <>
                                <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                                    Welcome, {currentUser.name}!
                                </span>
                                <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
                                <button 
                                    onClick={handleUserLogout}
                                    style={{ 
                                        background: 'none', 
                                        border: '1px solid #ff6b6b', 
                                        color: '#ff6b6b', 
                                        padding: '5px 10px', 
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        {adminUser && (
                            <>
                                <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
                                    Admin: {adminUser.name}
                                </span>
                                <Link to="/admin-dashboard" style={{ color: 'white', textDecoration: 'none' }}>Admin Dashboard</Link>
                                <button 
                                    onClick={handleAdminLogoutClick}
                                    style={{ 
                                        background: 'none', 
                                        border: '1px solid #ff6b6b', 
                                        color: '#ff6b6b', 
                                        padding: '5px 10px', 
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
                        <Link to="/admin-login" style={{ color: '#ff6b6b', textDecoration: 'none', fontWeight: 'bold' }}>Admin</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;