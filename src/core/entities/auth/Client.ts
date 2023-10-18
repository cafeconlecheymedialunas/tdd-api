import { ValidationException } from '../../errors';
import { MESSAGES } from '../../types/validationRules';
import { Email } from './Email';
import { SerialId } from './SerialId';
import { Name } from './Name';
import { Password } from './Password';
import { Role as RoleEntity } from './Role';
import { isNotEmpty, hasCorrectMaxLength, hasCorrectMinLength, isEmail, isStrongPassword } from './validaciones';
/**
 * Represents a User. The 'roles' property should store an array of Roles IDs.
 */
export class Client {
    private id?: number;
    private name!: string;
    private roles!: RoleEntity[];

    constructor(user: {
        id?: number;
        name: string;
        roles: RoleEntity[];
    }) {
        if (user.id) {
            this.setId(user.id);
        }
        this.setName(user.name);

        this.setRoles(user.roles);
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getRoles() {
        return this.roles;
    }

    public setId(value: number) {
        const id = new SerialId(value)
        this.id = id.getValue();
    }

    public setName(value: string) {
        const name = new Name(value)
        this.name = name.getValue();
    }

    public setRoles(roles: RoleEntity[]) {
        this.roles = roles;
    }
}
