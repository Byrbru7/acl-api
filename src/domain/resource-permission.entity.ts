import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { Resource } from "./resource.entity";
import { Permission } from "./permission.entity";

@Entity('resource_permission')
export class ResourcePermission {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Resource, (resource) => resource.resourcePermissions)
    resource: Resource;

    @ManyToOne(() => Permission, (permission) => permission.resourcePermissions)
    permission: Permission;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
