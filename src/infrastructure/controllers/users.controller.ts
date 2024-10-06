import { Body, Controller, HttpException, HttpStatus, Inject, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDTO } from "../../application/models/user.dto";
import { ServiceResult } from "../../application/response/ServiceResult";
import { IKeycloakUserService } from "../../application/services/keycloak/keycloak.user.interface";
import { TYPES } from "../../types";

@Controller("users")
@ApiTags("Users")
export class UsersController {
    private readonly _keycloakUserService: IKeycloakUserService;

    constructor(
        @Inject(TYPES.IKeycloakUserService) KeycloakUserService: IKeycloakUserService,
    ) {
        this._keycloakUserService = KeycloakUserService;
    }

    @Post('create')
    @ApiResponse({ status: 201, description: "User created successfully" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    async createUser(@Body() userDTO: UserDTO): Promise<ServiceResult> {
        try {
            const serviceResult = await this._keycloakUserService.createUser(userDTO);
            return serviceResult;
        } catch (error) {
            let err = new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            if (error instanceof ServiceResult) err = new HttpException(error.message, error.statusCode);
            throw err;
        }
    }
}
