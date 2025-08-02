import React from 'react'


function getFullYear() {
  return new Date().getFullYear();
}

function Footer() {
  return (
    <footer style={{
        backgroundColor:'#333',
        color:'#fff',
        textAlign:'center',
        padding:'10px 0px',
        marginTop:'14px'
    }}>
        <p>&copy; {getFullYear()}Aptitude Tutorial. All rights reserved.</p>
    </footer>
  )
}

export default Footer
