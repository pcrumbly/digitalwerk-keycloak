import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import "./verify.css"
import arrowRightIcon from "../assets/ArrowRight.png";
import coloredLogo from "../assets/venom-color-logo.png";
import login1 from "../assets/login-img-1.png";
import login2 from "../assets/login-img-2.png";
import warning from "../assets/warn.png";


export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            headerNode={msg("emailVerifyTitle")}
            infoNode={
                <p className="instruction">
                    {msg("emailVerifyInstruction2")}
                    <br />
                    <a href={url.loginAction}>{msg("doClickHere")}</a>
                    &nbsp;
                    {msg("emailVerifyInstruction3")}
                </p>
            }
        >
            <div className="form-container">
                <div className="forgot-container">
                    <div id="kc-reset-password-form" className={kcClsx("kcFormClass")}>
                        <a className="backToLogin" href={url.loginUrl}>
                            <img className="arrow" src={arrowRightIcon} />
                            Back to login
                        </a>
                        <div style={{color: '#FFFFFF', fontSize: "30px", marginTop: "1rem"}} >Thank you for registering</div>
                        <div className="warn" >
                           <img src={warning} style={{marginRight: "10px"}} /> You need to verify your email address to activate your account.
                        </div>
                        <div style={{color: '#CECCD5', fontSize: "16px", margin: "1rem 0 1rem 0"}} >
                            An email with instructions to verify your email address has been sent to your address at {user && user.email || ""}
                        </div>
                        <div style={{marginTop: "4rem", fontSize: "16px", backgroundColor: "#4D4D4D", padding: "10px 6px", display: 'flex', justifyContent: "center", color: "#FAFAFA", flexDirection: "column", textAlign: "center"}}>
                            <p>Haven’t received a verification code in your email?</p>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <a style={{marginRight: "5px"}} href={url.loginAction}>Click here</a> <p>to resend the email.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="logo-container">
                    <img className="logo" src="https://241932339.fs1.hubspotusercontent-na2.net/hubfs/241932339/DigitalWERX.png" />
                </div>
            </div>
        </Template>
    );
}
