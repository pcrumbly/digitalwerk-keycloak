import { Suspense, lazy, useEffect, useState } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import "./main.css";
import { MobileNotSupported } from "../MobileNotSupported";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const Login = lazy(() => import("./pages/Login"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const Register = lazy(() => import("./pages/Register"));
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"));
const LoginOtp = lazy(() => import("./pages/LoginOtp"));

const doMakeUserConfirmPassword = true;

/* TODOs:
    - cleanup DRY css, organize files into folders
    - make shared component for side-logo shared across registration, forgot password, etc.
*/

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;
    const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 989px)").matches);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 989px)");
        const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener("change", handleResize);

        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);    

    const { i18n } = useI18n({ kcContext });

    return isMobile ? (
        <MobileNotSupported />
    ) : (
        
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                case "login.ftl": return (
                    <Login
                        {...{ kcContext, i18n, classes }}
                        Template={Template}
                        doUseDefaultCss={true}
                    />
                );
                case "register.ftl": return (
                    <Register
                        {...{ kcContext, i18n, classes }}
                        Template={Template}
                        doUseDefaultCss={true}
                        UserProfileFormFields={UserProfileFormFields}
                        doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                    />
                );
                case "login-reset-password.ftl": return (
                    <LoginResetPassword
                        {...{ kcContext, i18n, classes }}
                        Template={Template}
                        doUseDefaultCss={true}
                    />
                );
                case "login-verify-email.ftl": return (
                    <LoginVerifyEmail
                        {...{ kcContext, i18n, classes }}
                        Template={Template}
                        doUseDefaultCss={true}
                    />
                );

                case "login-otp.ftl": return (
                    <LoginOtp
                        {...{ kcContext, i18n, classes }}
                        Template={Template}
                        doUseDefaultCss={true}
                    />
                );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

//example of removing classes, only for disabling for starting styles from scratch
const classes = {
    kcFormPasswordVisibilityButtonClass: ""
} satisfies { [key in ClassKey]?: string };
