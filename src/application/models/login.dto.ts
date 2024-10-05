import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDTO {

    @ApiProperty({ description: "Nombre de usuario" })
    @IsString()
    username: string;

    @ApiProperty({ description: "Contraseña" })
    @IsString()
    password: string;
}
