import { Module } from "@nestjs/common";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { KeycloakModule } from "./infrastructure/keycloak/keycloak.module";
import { JwtModule } from "@nestjs/jwt";
import "dotenv/config";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' }
    }),
    DatabaseModule,
    KeycloakModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
