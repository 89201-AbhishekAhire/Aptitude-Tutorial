import React from 'react'

function Footer() {
  return (
    <footer style={{
        backgroundColor:'#333',
        color:'#fff',
        textAlign:'center',
        padding:'10px 0px',
        marginTop:'14px'
    }}>
        <p>&copy; {new Date().getFullYear}Aptitude Tutorial. All rights reserved.</p>
    </footer>
  )
}

export default Footer
