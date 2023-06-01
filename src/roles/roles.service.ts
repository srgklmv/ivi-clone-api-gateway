import { Body, Inject, Injectable, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RolesService {
  constructor(@Inject('ToRolesMs') private rolesRmqProxy: ClientProxy) {}

  async createRole(dto: RoleDto) {
    console.log('API Gateway - Roles Service - createRole at', new Date());

    return this.rolesRmqProxy.send({ cmd: 'createRole' }, { dto: dto });
  }

  async getRoleById(id: number) {
    console.log('API Gateway - Roles Service - getRoleById at', new Date());

    return this.rolesRmqProxy.send({ cmd: 'getRoleById' }, { id: id });
  }

  async getAllRoles() {
    console.log('API Gateway - Roles Service - getAllRoles at', new Date());

    return this.rolesRmqProxy.send({ cmd: 'getAllRoles' }, {});
  }

  async updateRole(id: number, dto: RoleDto) {
    console.log('API Gateway - Roles Service - updateRole at', new Date());

    return this.rolesRmqProxy.send({ cmd: 'updateRole' }, { id, dto });
  }

  async deleteRoleByValue(value: string) {
    console.log(
      'API Gateway - Roles Service - deleteRoleByValue at',
      new Date(),
    );

    return this.rolesRmqProxy.send({ cmd: 'deleteRoleByValue' }, { value });
  }

  async addUserRoles(userId: number, dto: { roles: string[] }) {
    console.log('API Gateway - Roles Service - addUserRoles at', new Date());

    return this.rolesRmqProxy.send(
      { cmd: 'addUserRoles' },
      { userId, roles: dto.roles },
    );
  }

  async getUserRoles(userId: number) {
    console.log('API Gateway - Roles Service - getUserRoles at', new Date());

    return this.rolesRmqProxy.send({ cmd: 'getUserRoles' }, { userId });
  }

  deleteUserRoles(userId: number) {
    console.log('API Gateway - Roles Service - deleteUserRoles at', new Date());

    return this.rolesRmqProxy.send({ cmd: 'deleteUserRoles' }, { userId });
  }
}
