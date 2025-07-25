import { Link } from "react-router-dom";

function Navbar() {
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
                {/* <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link> */}
                <Link to="/topic" style={{ color: 'white', textDecoration: 'none' }}>Topic</Link>
                <Link to="/quiz" style={{ color: 'white', textDecoration: 'none' }}>Quiz</Link>

            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>

                <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>

            </div>
        </nav>
    );
}

export default Navbar;