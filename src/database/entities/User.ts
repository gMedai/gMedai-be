import { Entity, JoinTable, ManyToMany, OneToMany, Relation } from 'typeorm';
import CoreUser from '../__entities__/CoreUser';
import type Image from './Image';
import Role from './Role';
import type UserRole from './UserRole';

@Entity({ name: 'users' })
class User extends CoreUser {
  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @OneToMany('Image', 'user')
  images: Relation<Image>;
}

export default User;
