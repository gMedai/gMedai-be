import { OneToMany, Relation, Entity } from 'typeorm'
import CoreUserRole from '../__entities__/CoreUserRole'
import type Role from './Role'
import type User from './User'

// @Entity({ name: 'userRoles' })
class UserRole extends CoreUserRole {
  @OneToMany('User', 'userRoleId')
  usersId: Relation<User>

  @OneToMany('Role', 'userRoleId')
  rolesId: Relation<Role>
}

export default UserRole;
