import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'
import { Order } from '../src/Order'
import { Orderable } from '../src/Orderable'

@Entity()
@Orderable()
export class TestEntity extends BaseEntity {
  @PrimaryColumn('varchar')
  id: string = ''

  @Column('varchar')
  @Order({ priority: 1 })
  name: string = ''
}
