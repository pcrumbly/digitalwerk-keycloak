import { Fragment } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "./reset.css"
import arrowRightIcon from "../assets/ArrowRight.png";
import coloredLogo from "../assets/venom-color-logo.png";
import login1 from "../assets/login-img-1.png";
import login2 from "../assets/login-img-2.png";

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { otpLogin, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <div className="form-container">
                <div className="forgot-container">
                    <form id="kc-otp-login-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                        <a className="backToLogin" href={url.loginUrl}>
                            <img className="arrow" src={arrowRightIcon} />
                            Back to login
                        </a>
                        <div style={{color: '#FFFFFF', fontSize: "30px"}} >OTP Code</div>
                        <div style={{color: '#CECCD5', fontSize: "16px", margin: "1rem 0 1rem 0"}} >
                            Enter the one-time code below:
                        </div>
                        {otpLogin.userOtpCredentials.length > 1 && (
                            <div className={kcClsx("kcFormGroupClass")}>
                                <div className={kcClsx("kcInputWrapperClass")}>
                                    {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                                        <Fragment key={index}>
                                            <input
                                                id={`kc-otp-credential-${index}`}
                                                className={kcClsx("kcLoginOTPListInputClass")}
                                                type="radio"
                                                name="selectedCredentialId"
                                                value={otpCredential.id}
                                                defaultChecked={otpCredential.id === otpLogin.selectedCredentialId}
                                            />
                                            <label htmlFor={`kc-otp-credential-${index}`} className={kcClsx("kcLoginOTPListClass")} tabIndex={index}>
                                                <span className={kcClsx("kcLoginOTPListItemHeaderClass")}>
                                                    <span className={kcClsx("kcLoginOTPListItemIconBodyClass")}>
                                                        <i className={kcClsx("kcLoginOTPListItemIconClass")} aria-hidden="true"></i>
                                                    </span>
                                                    <span className={kcClsx("kcLoginOTPListItemTitleClass")}>{otpCredential.userLabel}</span>
                                                </span>
                                            </label>
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className={kcClsx("kcFormGroupClass")}>
                            <div className={kcClsx("kcLabelWrapperClass")}>
                                <label htmlFor="otp" className={kcClsx("kcLabelClass")}>
                                    {msg("loginOtpOneTime")}
                                </label>
                            </div>
                            <div className={kcClsx("kcInputWrapperClass")}>
                                <input
                                    id="otp"
                                    name="otp"
                                    autoComplete="off"
                                    type="text"
                                    className={kcClsx("kcInputClass")}
                                    autoFocus
                                    aria-invalid={messagesPerField.existsError("totp")}
                                />
                                {messagesPerField.existsError("totp") && (
                                    <span
                                        id="input-error-otp-code"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.get("totp"))
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={kcClsx("kcFormGroupClass")}>
                            <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                                <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                            </div>
                            <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                                {/* <input
                                    className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                /> */}
                                <button
                                    className="loginBtn"
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                >
                                    Sign in
                                    <i style={{marginLeft: '7px'}}><img src={arrowRightIcon}/></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="logo-container">
                    <img className="logo" src={coloredLogo} />
                    <img src={login2} alt="Top right img" className="top-right-image" />
                    <img src={login1} alt="Bottom Left img" className="bottom-left-image" />
                </div>
            </div>
        </Template>
    );
}
