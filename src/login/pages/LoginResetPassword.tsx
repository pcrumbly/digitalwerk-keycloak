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

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
            headerNode={msg("emailForgotTitle")}
        >
            <div className="form-container">
                <div className="forgot-container">
                    <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                        <a className="backToLogin" href={url.loginUrl}>
                            <img className="arrow" src={arrowRightIcon} />
                            Back to login
                        </a>
                        <div style={{color: '#FFFFFF', fontSize: "30px"}} >Forgot Password</div>
                        <div style={{color: '#CECCD5', fontSize: "16px", margin: "1rem 0 1rem 0"}} >
                            Enter the 
                            <span style={{margin: "0 4px 0 4px"}}>
                                {!realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                    ? msg("usernameOrEmail")
                                    : msg("email")
                                }
                            </span>
                            associated with your account. If the account exists, you will receive a link to reset your password.
                        </div>
                        <div className={kcClsx("kcFormGroupClass")}>
                            <div className={kcClsx("kcLabelWrapperClass")}>
                                <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                    {!realm.loginWithEmailAllowed
                                        ? msg("username")
                                        : !realm.registrationEmailAsUsername
                                        ? msg("usernameOrEmail")
                                        : msg("email")}
                                </label>
                            </div>
                            <div className={kcClsx("kcInputWrapperClass")}>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className={kcClsx("kcInputClass")}
                                    autoFocus
                                    defaultValue={auth.attemptedUsername ?? ""}
                                    aria-invalid={messagesPerField.existsError("username")}
                                />
                                {messagesPerField.existsError("username") && (
                                    <span
                                        id="input-error-username"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.get("username"))
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                            {/* <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                                <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                    <span>
                                        <a href={url.loginUrl}>{msg("backToLogin")}</a>
                                    </span>
                                </div>
                            </div> */}

                            <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                                {/* <input
                                    className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                    type="submit"
                                    value={msgStr("doSubmit")}
                                /> */}
                                <button
                                    className="resetBtn"
                                    type="submit"
                                    value={msgStr("doSubmit")}
                                >
                                    Send Reset Link
                                </button>
                                <div className="cancelBtn">
                                    <span>
                                        <a style={{color: "#FAFAFA"}} href={url.loginUrl}>Cancel</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="logo-container">
                    <img className="logo" src="https://241932339.fs1.hubspotusercontent-na2.net/hubfs/241932339/DigitalWERX.png" />
                </div>
            </div>
        </Template>
    );
}
