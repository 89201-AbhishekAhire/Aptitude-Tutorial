import AptiPNG from '../images/AptiPNG.png';
import { useAuth } from '../context/AuthContext';

function Home() {
    const { currentUser, adminUser, isAuthenticated } = useAuth();

    return(
        <div style={{
            display: 'flex',
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '40px 20px',
            height: '90vh',
            boxSizing: 'border-box'
        }}>
            <div style={{flex:'1 1 400px', paddingRight:'20px'}}>
                <h1 style={{ fontSize: '36px', marginBottom:'20px'}}>Welcome to the Aptitude Zone</h1>
                
                {isAuthenticated && (
                    <div style={{
                        background: currentUser ? '#e8f5e8' : '#ffe8e8',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        border: `2px solid ${currentUser ? '#4CAF50' : '#ff6b6b'}`
                    }}>
                        {currentUser && (
                            <p style={{ margin: 0, color: '#2e7d32', fontWeight: 'bold' }}>
                                👋 Welcome back, {currentUser.name}! Ready to continue your aptitude journey?
                            </p>
                        )}
                        {adminUser && (
                            <p style={{ margin: 0, color: '#d32f2f', fontWeight: 'bold' }}>
                                🔧 Admin Dashboard: {adminUser.name} - Manage your platform
                            </p>
                        )}
                    </div>
                )}
                
                <p style={{fontSize:'22px', lineHeight:'1.8'}}>
                    Aptitude is not just a skill — it's a powerful tool that enhances problem-solving,
                    logical reasoning, and critical thinking. Whether you're preparing for competitive exams
                    or aiming to improve your decision-making, aptitude builds the foundation for success.
                </p>
                
                {!isAuthenticated && (
                    <div style={{ marginTop: '20px' }}>
                        <p style={{ fontSize: '18px', color: '#666', marginBottom: '10px' }}>
                            Get started by creating an account or logging in to access personalized content.
                        </p>
                    </div>
                )}
            </div>
            <div style={{flex:'1 1 400px', textAlign:'center', marginTop:'20px'}}>
                <img src={AptiPNG} 
                alt="Aptitude"
                style={{ maxWidth:'100%', height:'500px', borderRadius: '10px', objectFit:'cover'}}/>
            </div>
           
        </div>
    );
}

export default Home;