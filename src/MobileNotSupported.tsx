import coloredLogo from "../src/login/assets/venom-color-logo.png";

export const MobileNotSupported = () => {
  const pageStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#ffffff',
    color: '#FAFAFA',
    fontFamily: "'Nunito Sans', sans-serif",
    textAlign: 'center',
    padding: '0 20px'
  };

  const textStyle: React.CSSProperties = {
    fontSize: '28px',
    marginBottom: '2rem',
    fontWeight: 700,
    color: '#000000',
    letterSpacing: '0.5px'
  };

  const logoStyle: React.CSSProperties = {
    width: '80%',
    marginTop: '2rem'
  };

  return (
    <div style={pageStyle}>
      <div style={textStyle}>Mobile Support is Coming Soon.
        <br />
        <br />
        Thank you for visiting <a href="https://digitalwerx.org/">DigitalWERX!</a>
      </div>
      <img 
        src="https://241932339.fs1.hubspotusercontent-na2.net/hubfs/241932339/DigitalWERX.png" 
        style={logoStyle} 
        alt="DigitalWERX Logo" 
      />
    </div>
  )
}