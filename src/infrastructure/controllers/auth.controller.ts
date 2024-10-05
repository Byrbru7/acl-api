import { Body, Controller, HttpException, HttpStatus, Inject, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { IKeycloakAuthService } from "../../application/services/keycloak/keycloak.auth.interface";
import { TYPES } from "../../types";
import { LoginDTO } from "../../application/models/login.dto";
import { ServiceResult } from "../../application/response/ServiceResult";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
    private readonly _keycloakAuthService: IKeycloakAuthService;

    constructor(
        @Inject(TYPES.IKeycloakAuthService) KeycloakAuthService: IKeycloakAuthService,
    ) {
        this._keycloakAuthService = KeycloakAuthService;
    }

    @Post('login')
    @ApiResponse({ status: 200, description: "User logged successfully" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    async login(@Body() loginDTO: LoginDTO): Promise<ServiceResult> {
        try {
            const serviceResult = await this._keycloakAuthService.login(loginDTO);
            return serviceResult;
        } catch (error) {
            let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
            throw err;
        }
    }
}
