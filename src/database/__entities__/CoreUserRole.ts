/**
 * AUTO-GENERATED CODE - DO NOT MODIFY
 *
 * This file, 'CoreUserRole.ts', is generated automatically from the source database schema (DBML).
 * It defines the database table structure and is meant to be kept consistent with the database schema.
 * Any changes to the table structure should be made in the original DBML source and then regenerated.
 *
 * Generated on: 12/02/2023, 10:10:20 PM GMT+7
 * Author: loctvl842 - loclepnvx@gmail.com
 *
 * To define TypeORM-specific configurations or relationships for the 'Movie' entity, please refer to 'Movie.ts'.
 */

import { Column } from 'typeorm'

abstract class CoreUserRole {
  @Column({ name: 'userId', type: 'uuid', nullable: true })
  userId: string

  @Column({ name: 'roleId', type: 'uuid', nullable: true })
  roleId: string
}

export default CoreUserRole;