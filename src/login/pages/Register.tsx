import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "./register.css"
import arrowRightIcon from "../assets/ArrowRight.png";
import coloredLogo from "../assets/venom-color-logo.png";
import login1 from "../assets/login-img-1.png";
import login2 from "../assets/login-img-2.png";


type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { messageHeader, url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } =
        kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={messageHeader !== undefined ? advancedMsg(messageHeader) : msg("registerTitle")}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields
        >
            <div className="form-container">
                <div className="register-container">
                    <form id="kc-register-form" className={kcClsx("kcFormClass")} action={url.registrationAction} method="post">
                        <a className="backToLogin" href={url.loginUrl}>
                            <img className="arrow" src={arrowRightIcon} />
                            Back to login
                        </a>
                        <div style={{color: '#FFFFFF', fontSize: "30px"}} >Register for an Account</div>
                        <UserProfileFormFields
                            kcContext={kcContext}
                            i18n={i18n}
                            kcClsx={kcClsx}
                            onIsFormSubmittableValueChange={setIsFormSubmittable}
                            doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                        />
                        {termsAcceptanceRequired && (
                            <TermsAcceptance
                                i18n={i18n}
                                kcClsx={kcClsx}
                                messagesPerField={messagesPerField}
                                areTermsAccepted={areTermsAccepted}
                                onAreTermsAcceptedValueChange={setAreTermsAccepted}
                            />
                        )}
                        {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                            <div className="form-group">
                                <div className={kcClsx("kcInputWrapperClass")}>
                                    <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction}></div>
                                </div>
                            </div>
                        )}
                        <div className={kcClsx("kcFormGroupClass")}>
                            {/* <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                                <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                    <span>
                                        <a href={url.loginUrl}>{msg("backToLogin")}</a>
                                    </span>
                                </div>
                            </div> */}

                            {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                                <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                                    <button
                                        className={clsx(
                                            kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"),
                                            "g-recaptcha"
                                        )}
                                        data-sitekey={recaptchaSiteKey}
                                        data-callback={() => {
                                            (document.getElementById("kc-register-form") as HTMLFormElement).submit();
                                        }}
                                        data-action={recaptchaAction}
                                        type="submit"
                                    >
                                        {msg("doRegister")}
                                    </button>
                                </div>
                            ) : (
                                <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                                    {/* <input
                                        disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                                        className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                        type="submit"
                                        value={msgStr("doRegister")}
                                    /> */}
                                    <button
                                        disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                                        className="resetBtn"
                                        type="submit"
                                        value={msgStr("doRegister")}
                                    >
                                        Submit
                                    </button>
                                    <div className="cancelBtn">
                                        <span>
                                            <a style={{color: "#FAFAFA"}} href={url.loginUrl}>Cancel</a>
                                        </span>
                                    </div>
                                </div>
                            )}
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

function TermsAcceptance(props: {
    i18n: I18n;
    kcClsx: KcClsx;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const { i18n, kcClsx, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

    const { msg } = i18n;

    return (
        <>
            <div className="form-group">
                <div className={kcClsx("kcInputWrapperClass")}>
                    {msg("termsTitle")}
                    <div id="kc-registration-terms-text">{msg("termsText")}</div>
                </div>
            </div>
            <div className="form-group">
                <div className={kcClsx("kcLabelWrapperClass")}>
                    <input
                        type="checkbox"
                        id="termsAccepted"
                        name="termsAccepted"
                        className={kcClsx("kcCheckboxInputClass")}
                        checked={areTermsAccepted}
                        onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                        aria-invalid={messagesPerField.existsError("termsAccepted")}
                    />
                    <label htmlFor="termsAccepted" className={kcClsx("kcLabelClass")}>
                        {msg("acceptTerms")}
                    </label>
                </div>
                {messagesPerField.existsError("termsAccepted") && (
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <span
                            id="input-error-terms-accepted"
                            className={kcClsx("kcInputErrorMessageClass")}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("termsAccepted"))
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
