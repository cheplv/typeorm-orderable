import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'
import { Order, Orderable } from './index'

@Entity()
@Orderable()
export class TestEntity extends BaseEntity {
  @PrimaryColumn('varchar')
  id: string = ''

  @Column('varchar')
  @Order({ priority: 1 })
  name: string = ''
}
