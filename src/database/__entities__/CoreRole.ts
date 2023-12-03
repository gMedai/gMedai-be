/**
 * AUTO-GENERATED CODE - DO NOT MODIFY
 *
 * This file, 'CoreRole.ts', is generated automatically from the source database schema (DBML).
 * It defines the database table structure and is meant to be kept consistent with the database schema.
 * Any changes to the table structure should be made in the original DBML source and then regenerated.
 *
 * Generated on: 12/02/2023, 10:23:08 PM GMT+7
 * Author: loctvl842 - loclepnvx@gmail.com
 *
 * To define TypeORM-specific configurations or relationships for the 'Movie' entity, please refer to 'Movie.ts'.
 */

import { PrimaryColumn, Column } from 'typeorm'

abstract class CoreRole {
  @PrimaryColumn({ name: 'id', type: 'uuid', generated: 'uuid' })
  id: string

  @Column({ name: 'name', type: 'varchar', nullable: true })
  name: string

  @Column({ name: 'tenantId', type: 'uuid', nullable: true })
  tenantId: string
}

export default CoreRole;