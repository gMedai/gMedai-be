import { ManyToOne, Relation, JoinColumn, Entity } from 'typeorm'
import CoreDiagnosis from '../__entities__/CoreDiagnosis'
import type Image from './Image'

@Entity({ name: 'diagnoses' })
class Diagnosis extends CoreDiagnosis {
  @ManyToOne('Image', 'diagnosesImageId')
  @JoinColumn({ name: 'imageId', referencedColumnName: 'id', foreignKeyConstraintName: 'FK_Diagnosis_imageId_Image_id' })
  imageImageId: Relation<Image>
}

export default Diagnosis;
