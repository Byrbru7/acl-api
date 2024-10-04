import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import KeycloakConnect from "keycloak-connect";

export const keycloakConfig = (configService: ConfigService) => {
    return new KeycloakConnect({}, {
        'realm': configService.get('KEYCLOAK_REALM'),
        'auth-server-url': configService.get('KEYCLOAK_URL'),
        'ssl-required': 'external',
        'resource': configService.get('KEYCLOAK_CLIENT_ID'),
        'confidential-port': 0,
        'bearer-only': true
    });
};

@Module({
    providers: [
        {
            provide: 'KEYCLOAK_INSTANCE',
            useFactory: keycloakConfig,
            inject: [ConfigService],
        },
    ],
    exports: ['KEYCLOAK_INSTANCE']
})
export class KeycloakModule { }
