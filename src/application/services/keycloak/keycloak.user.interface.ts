import { UserDTO } from "../../../application/models/user.dto";
import { ServiceResult } from "../../../application/response/ServiceResult";

export interface IKeycloakUserService {
    createUser(user: UserDTO): Promise<ServiceResult>;
}
