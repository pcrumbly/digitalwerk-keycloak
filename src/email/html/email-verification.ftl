<#--
  This file has been claimed for ownership from @keycloakify/email-native version 260007.0.0.
  To relinquish ownership and restore this file to its original content, run the following command:
  
  $ npx keycloakify own --path 'email/html/email-verification.ftl' --revert
-->

<#import "template.ftl" as layout>
<@layout.emailLayout>
${kcSanitize(msg("emailVerificationBodyHtml",link, linkExpiration, realmName, linkExpirationFormatter(linkExpiration)))?no_esc}
<img
  alt="VENOM Logo"
  src="${url.resourcesUrl}/venom-email-logo.png"
  width="160px"
  height="38px"
/>
<p style="margin-top: 30px;">
  Security Tip:  Never share your login credentials. Always confirm that links come from trusted sources before clicking.
</p>
</@layout.emailLayout>
