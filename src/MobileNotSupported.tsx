import coloredLogo from "../src/login/assets/venom-color-logo.png";

export const MobileNotSupported = () => {

  return (
    <div className="mobileNotSupported">
      <div>Mobile is not currently supported.</div>
      <img src={coloredLogo} style={{width: "50%", marginTop: "2rem"}} />
    </div>
  )
}