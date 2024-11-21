# TypeORM Decorators to provide field ordering in development and generation of migrations

![GitHub](https://img.shields.io/github/license/cheplv/typeorm-orderable?style=flat-square)

## Usage

1. Run `npm i typeorm-orderable`
2. Add decorators to your classes

With TypeORM your models look like this:

```typescript
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { Orderable, Order } from "typeorm-orderable"
import { instanceToPlain, Exclude } from 'class-transformer';
import { createId } from '@paralleldrive/cuid2';

@Orderable()
export class EntityHelper extends BaseEntity {
  @Column()
  @Order({ priority: -1 })
  _id: string = createId();

  @Exclude()
  __entity?: string;

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  getEntityName() {
    return this.__entity;
  }


  @CreateDateColumn()
  @Order({ priority: 100 })
  createdAt: Date;

  @UpdateDateColumn()
  @Order({ priority: 101 })
  updatedAt?: Date;

  @DeleteDateColumn()
  @Order({ priority: 102 })
  @Exclude()
  deletedAt?: Date;
}

@Entity('examples')
@Orderable()
export class Example extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number
}
```

4. Your fields sequence in table 'example' will look like

_id, id, first_name, last_name, age, created_at, updated_at, deleted_at

5. optionally @Order directive supports "before" and "after" options with name of column in option property

## To be done

- Define guidelines for testing

## License

This project is licensed under the [MIT](https://github.com/cheplv/typeorm-orderable/blob/master/LICENSE).