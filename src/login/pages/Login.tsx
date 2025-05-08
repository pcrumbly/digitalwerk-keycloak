import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import mambaLogo from "../assets/mamba-logo.png";
import passwordIcon from "../assets/Password.png";
import arrowRightIcon from "../assets/ArrowRight.png";
import login1 from "../assets/login-img-1.png";
import login2 from "../assets/login-img-2.png";
import "./login.css"

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const [showAboutModal, setShowAboutModal] = useState(false);

    const handleShowModal = () => setShowAboutModal(prev => !prev);

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <div className="login-container">
            <Template
                kcContext={kcContext}
                i18n={i18n}
                doUseDefaultCss={doUseDefaultCss}
                classes={classes}
                displayMessage={!messagesPerField.existsError("username", "password")}
                headerNode={msg("loginAccountTitle")}
                displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
                infoNode={
                    <div id="kc-registration-container" className="registration">
                        <div className="login-right">
                        <div id="kc-form">
                            <h1>Login</h1>
                            <div id="kc-form-wrapper">
                                {realm.password && (
                                    <form
                                        id="kc-form-login"
                                        onSubmit={() => {
                                            setIsLoginButtonDisabled(true);
                                            return true;
                                        }}
                                        action={url.loginAction}
                                        method="post"
                                    >
                                        {!usernameHidden && (
                                            <div className={kcClsx("kcFormGroupClass")}>
                                                <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                                    {!realm.loginWithEmailAllowed
                                                        ? msg("username")
                                                        : !realm.registrationEmailAsUsername
                                                        ? msg("usernameOrEmail")
                                                        : msg("email")}
                                                </label>
                                                <input
                                                    tabIndex={2}
                                                    id="username"
                                                    className={kcClsx("kcInputClass")}
                                                    name="username"
                                                    defaultValue={login.username ?? ""}
                                                    type="text"
                                                    autoFocus
                                                    autoComplete="username"
                                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                                />
                                                {messagesPerField.existsError("username", "password") && (
                                                    <span
                                                        id="input-error"
                                                        className={kcClsx("kcInputErrorMessageClass")}
                                                        aria-live="polite"
                                                        dangerouslySetInnerHTML={{
                                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        )}

                                        <div className={kcClsx("kcFormGroupClass")}>
                                            <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                                                {msg("password")}
                                            </label>
                                            <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                                <input
                                                    tabIndex={3}
                                                    id="password"
                                                    className={kcClsx("kcInputClass")}
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                                />
                                            </PasswordWrapper>
                                            {usernameHidden && messagesPerField.existsError("username", "password") && (
                                                <span
                                                    id="input-error"
                                                    className={kcClsx("kcInputErrorMessageClass")}
                                                    aria-live="polite"
                                                    dangerouslySetInnerHTML={{
                                                        __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                    }}
                                                />
                                            )}
                                        </div>

                                        <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                            <div id="kc-form-options" style={{color: "#FAFAFA"}}>
                                                {realm.rememberMe && !usernameHidden && (
                                                    <div className="checkbox">
                                                        <label style={{color: "#FAFAFA"}}>
                                                            <input
                                                                tabIndex={5}
                                                                id="rememberMe"
                                                                name="rememberMe"
                                                                type="checkbox"
                                                                defaultChecked={!!login.rememberMe}
                                                            />{" "}
                                                            {msg("rememberMe")}
                                                        </label>
                                                    </div>
                                                )}
                                            </div>
                                            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                                {realm.resetPasswordAllowed && (
                                                    <span>
                                                        <a style={{fontSize: "16px", color: "#DB4F59"}} tabIndex={6} href={url.loginResetCredentialsUrl}>
                                                            {msg("doForgotPassword")}
                                                        </a>
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                            <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                            <button
                                                className="loginBtn"
                                                tabIndex={7}
                                                disabled={isLoginButtonDisabled}
                                                name="login"
                                                id="kc-login"
                                                type="submit"
                                                value={msgStr("doLogIn")}
                                            >
                                                Log in
                                                <i style={{marginLeft: '7px'}}><img src={arrowRightIcon}/></i>
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                        <div id="kc-registration">
                            <span>
                                {msg("noAccount")}{" "}
                                <a style={{marginLeft: '5px'}} className="registerBtn" tabIndex={8} href={url.registrationUrl}>
                                    {/* {msg("doRegister")} */}
                                    Register for an account
                                </a>
                            </span>
                            <div style={{marginTop: '2rem'}}>
                                <a className="about" onClick={handleShowModal}>
                                    About VENOM
                                </a>
                            </div>
                        </div>
                    </div>
                }
                socialProvidersNode={
                    <>
                        {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                            <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                                <hr />
                                <h2>{msg("identity-provider-login-label")}</h2>
                                <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                    {social.providers.map((...[p, , providers]) => (
                                        <li key={p.alias}>
                                            <a
                                                id={`social-${p.alias}`}
                                                className={kcClsx(
                                                    "kcFormSocialAccountListButtonClass",
                                                    providers.length > 3 && "kcFormSocialAccountGridItem"
                                                )}
                                                type="button"
                                                href={p.loginUrl}
                                            >
                                                {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                                                <span
                                                    className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
                                                    dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                                ></span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                }
            >
                <div className="login-container">
                    <div className="gradient-background">
                        <img src={login2} alt="Top right img" className="login-top-right-image" />
                        <img src={login1} alt="Bottom Left img" className="login-bottom-left-image" />
                    </div>
                    <div className="login-logo-container">
                        <img src={mambaLogo} alt="VENOM Logo" className="venom-logo" />
                    </div>
                </div>
                    
                {showAboutModal && (
                    <div className="modal-overlay" onClick={handleShowModal}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div style={{fontSize: '30px', marginLeft: '10px'}}>About VENOM</div>
                            <div className="modal-space">
                                VENOM is an all-in-one, fully managed digital engineering platform that eliminates the hassle of software management,
                                vendor integrations, and hiring specialized talent—so you can focus on driving progress. 
                            </div>
                            <div className="modal-space">
                                Offering secure, customizable environments tailored to your needs, VENOM delivers cutting-edge 
                                tools with powerful collaboration features at a fraction of the cost—saving you up to 95% compared to traditional software.
                            </div>
                            <div className="modal-space">
                                Built to meet the highest compliance standards, including FedRAMP High and Impact Levels 5 and 6, VENOM provides seamless
                                integration with your existing infrastructure,
                                uncompromising security, and freedom from complexity—all in one streamlined solution.
                            </div>
                            <button style={{width: "75px"}} className="registerBtn" onClick={handleShowModal}>Close</button>
                        </div>
                    </div>
                )}
            </Template>
        </div>
    );
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { kcClsx, i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

    return (
        <div className={kcClsx("kcInputGroup")}>
            {children}
            <button
                type="button"
                className="loginIcon"
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i aria-hidden>
                    <img src={passwordIcon} alt="Show/Hide Password" />
                </i>
            </button>
        </div>
    );
}
