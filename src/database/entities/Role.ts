import { ManyToOne, Relation, JoinColumn, Entity } from 'typeorm'
import CoreRole from '../__entities__/CoreRole'
import type Tenant from './Tenant'
import type UserRole from './UserRole'

@Entity({ name: 'roles' })
class Role extends CoreRole {
  @ManyToOne('Tenant', 'roles')
  @JoinColumn({ name: 'tenantId', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_Role_tenantId_Tenant_id' })
  tenant: Relation<Tenant>
}

export default Role;
