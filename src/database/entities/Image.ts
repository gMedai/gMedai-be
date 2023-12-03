import { ManyToOne, Relation, JoinColumn, OneToMany, Entity } from 'typeorm'
import CoreImage from '../__entities__/CoreImage'
import type Diagnosis from './Diagnosis'
import type User from './User'

@Entity({ name: 'images' })
class Image extends CoreImage {
  @ManyToOne('User', 'images')
  @JoinColumn({ name: 'userId', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_Image_userId_User_id' })
  user: Relation<User>

  @OneToMany('Diagnosis', 'image')
  diagnoses: Relation<Diagnosis>
}

export default Image;
