import { Injectable } from "@nestjs/common";
import { IKeycloakAuthService } from "../../application/services/keycloak/keycloak.auth.interface";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { ServiceResult } from "../../application/response/ServiceResult";
import { HttpStatusCodes } from "../../application/response/HttpStatusCodes";
import { firstValueFrom } from "rxjs";
import { LoginDTO } from "../../application/models/login.dto";

@Injectable()
export class KeycloakAuthService implements IKeycloakAuthService {

    constructor(
        private readonly _httpService: HttpService,
        private readonly _configService: ConfigService,
    ) { }

    async login(loginDTO: LoginDTO): Promise<ServiceResult> {
        try {
            const url = `${this._configService.get('KEYCLOAK_URL')}/realms/${this._configService.get('KEYCLOAK_REALM')}/protocol/openid-connect/token`;

            const params = new URLSearchParams();
            params.append('client_id', this._configService.get('KEYCLOAK_CLIENT_ID'));
            params.append('grant_type', 'password');
            params.append('username', loginDTO.username);
            params.append('password', loginDTO.password);

            const response = await firstValueFrom(
                this._httpService.post(url, params.toString(), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                }),
            );

            if (response.data.access_token) {
                return new ServiceResult(HttpStatusCodes.OK, 'Login successful', response.data);
            }

            return new ServiceResult(HttpStatusCodes.UNAUTHORIZED, 'Invalid credentials');
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
