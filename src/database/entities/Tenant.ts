import { OneToMany, Relation, Entity } from 'typeorm'
import CoreTenant from '../__entities__/CoreTenant'
import type Role from './Role'

@Entity({ name: 'tenants' })
class Tenant extends CoreTenant {
  @OneToMany('Role', 'tenant')
  roles: Relation<Role>
}

export default Tenant;
