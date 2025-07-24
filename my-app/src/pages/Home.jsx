import AptiPNG from '../images/AptiPNG.png';
function Home()
{
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
                <p style={{fontSize:'22px', lineHeight:'1.8'}}>
                    Aptitude is not just a skill — it's a powerful tool that enhances problem-solving,
                    logical reasoning, and critical thinking. Whether you're preparing for competitive exams
                    or aiming to improve your decision-making, aptitude builds the foundation for success.
                </p>
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