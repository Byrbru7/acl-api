import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { UserDTO } from "../../application/models/user.dto";
import { HttpStatusCodes } from "../../application/response/HttpStatusCodes";
import { ServiceResult } from "../../application/response/ServiceResult";
import { IKeycloakUserService } from "../../application/services/keycloak/keycloak.user.interface";

@Injectable()
export class KeycloakUserService implements IKeycloakUserService {

    constructor(
        private readonly _httpService: HttpService,
        private readonly _configService: ConfigService,
    ) { }

    async createUser(user: UserDTO): Promise<ServiceResult> {
        try {
            const token = await this.getAdminToken();

            const url = `${this._configService.get('KEYCLOAK_URL')}/admin/realms/${this._configService.get('KEYCLOAK_REALM')}/users`;

            const userData = {
                username: user.username,
                enabled: user.enabled,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                // emailVerified: true,
                credentials: [
                    {
                        type: 'password',
                        value: user.password,
                        temporary: false,
                    },
                ],
            };

            const response = await firstValueFrom(
                this._httpService.post(url, userData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }),
            );

            if (response.status === 201) {
                const { password, ...userWithoutPassword } = user;
                return new ServiceResult(HttpStatusCodes.CREATED, "User created successfully", userWithoutPassword);
            }

            return new ServiceResult(HttpStatusCodes.CONFLICT, "User creation failed");
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private async getAdminToken(): Promise<string> {
        const url = `${this._configService.get('KEYCLOAK_URL')}/realms/${this._configService.get('KEYCLOAK_REALM')}/protocol/openid-connect/token`;

        const params = new URLSearchParams();
        params.append('client_id', this._configService.get('KEYCLOAK_CLIENT_ID'));
        params.append('client_secret', this._configService.get('KEYCLOAK_CLIENT_SECRET'));
        params.append('grant_type', 'client_credentials');

        const response = await firstValueFrom(
            this._httpService.post(url, params.toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }),
        );

        return response.data.access_token;
    }
}
