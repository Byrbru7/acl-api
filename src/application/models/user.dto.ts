import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsEmail } from "class-validator";

export class UserDTO {

    @ApiProperty({ description: "Nombre de usuario" })
    @IsString()
    username: string;

    @ApiProperty({ description: "Indica si esta habilitada o no la cuenta" })
    @IsBoolean()
    enabled: boolean;

    @ApiProperty({ description: "Email del usuario" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "Nombre" })
    @IsString()
    firstName: string;

    @ApiProperty({ description: "Apellido" })
    @IsString()
    lastName: string;

    @ApiProperty({ description: "Contraseña" })
    @IsString()
    password: string;
}
