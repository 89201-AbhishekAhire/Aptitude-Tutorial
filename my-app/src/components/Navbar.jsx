import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/auth.context";

function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const handleLogout = () => {
        logout();
        setUser(null);
        toast.success('Logged out successfully!');
        navigate('/');
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
                <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                <Link to="/topic" style={{ color: 'white', textDecoration: 'none' }}>Topic</Link>
                <Link to="/quiz" style={{ color: 'white', textDecoration: 'none' }}>Quiz</Link>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {user ? (
                    <>
                        <span style={{ fontSize: '14px' }}>
                            Welcome, {user.firstName || 'User'}!
                        </span>
                        <button 
                            onClick={handleLogout}
                            style={{ 
                                background: 'none', 
                                border: '1px solid white', 
                                color: 'white', 
                                padding: '5px 15px', 
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;