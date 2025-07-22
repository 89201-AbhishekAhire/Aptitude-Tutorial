import { Link } from "react-router-dom";

function Navbar() {
    return(
        <nav className="navbar" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#f8f8f8'
        }}>

            <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/">Home</Link>
                <Link to="/topic">Topic</Link>
                <Link to="/quiz">Quiz</Link>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );
}

export default Navbar;