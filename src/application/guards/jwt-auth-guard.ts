import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ServiceResult } from "../response/ServiceResult";
import { HttpStatusCodes } from "../response/HttpStatusCodes";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private readonly _jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest<Request>();
            const token = this.extractTokenFromHeader(request);

            if (!token) throw new ServiceResult(HttpStatusCodes.UNAUTHORIZED, "Token not provided");

            const payload = await this._jwtService.verifyAsync(token);
            request.user = payload;
            return true;
        } catch (error) {
            throw new ServiceResult(HttpStatusCodes.UNAUTHORIZED, "Invalid token or expired");
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
