import { LoginDTO } from "../../../application/models/login.dto";
import { ServiceResult } from "../../../application/response/ServiceResult";

export interface IKeycloakAuthService {
    login(loginDTO: LoginDTO): Promise<ServiceResult>;
}
