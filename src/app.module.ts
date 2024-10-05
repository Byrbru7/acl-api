import { Module } from "@nestjs/common";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { KeycloakModule } from "./infrastructure/keycloak/keycloak.module";
import { JwtModule } from "@nestjs/jwt";
import "dotenv/config";
import { controllers } from "./infrastructure/controllers/_index";
import { KeycloakUserService } from "./infrastructure/keycloak/keycloak.user.service";
import { KeycloakAuthService } from "./infrastructure/keycloak/keycloak.auth.service";
import { TYPES } from "./types";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' }
    }),
    DatabaseModule,
    KeycloakModule,
    HttpModule,
    ConfigModule,
  ],
  controllers: [...controllers],
  providers: [
    {
      provide: TYPES.IKeycloakUserService,
      useClass: KeycloakUserService,
    },
    {
      provide: TYPES.IKeycloakAuthService,
      useClass: KeycloakAuthService,
    }
  ],
})
export class AppModule { }
