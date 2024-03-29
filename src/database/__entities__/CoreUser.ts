/**
 * AUTO-GENERATED CODE - DO NOT MODIFY
 *
 * This file, 'CoreUser.ts', is generated automatically from the source database schema (DBML).
 * It defines the database table structure and is meant to be kept consistent with the database schema.
 * Any changes to the table structure should be made in the original DBML source and then regenerated.
 *
 * Generated on: 12/03/2023, 01:32:21 AM GMT+7
 * Author: loctvl842 - loclepnvx@gmail.com
 *
 * To define TypeORM-specific configurations or relationships for the 'Movie' entity, please refer to 'Movie.ts'.
 */

import { PrimaryColumn, Column } from 'typeorm'

abstract class CoreUser {
  @PrimaryColumn({ name: 'id', type: 'uuid', generated: 'uuid' })
  id: string

  @Column({ name: 'username', type: 'varchar', nullable: true })
  username: string
}

export default CoreUser;