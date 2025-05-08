ARG UPSTREAM_REGISTRY=registry1.dso.mil/ironbank/opensource/keycloak
ARG BASE_IMAGE=keycloak
ARG BASE_VERSION=25.0.6

FROM $UPSTREAM_REGISTRY/$BASE_IMAGE:$BASE_VERSION AS builder

WORKDIR /opt/keycloak
RUN /opt/keycloak/bin/kc.sh build

# Copy the theme JAR file into the appropriate location
COPY ./dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar /opt/keycloak/providers/keycloak-theme.jar

FROM $UPSTREAM_REGISTRY/$BASE_IMAGE:$BASE_VERSION

COPY --from=builder /opt/keycloak/ /opt/keycloak/
