import { OrderOptions } from './OrderOptions'
import { metaColumns } from './MetaStore'

export function Order(options: OrderOptions): PropertyDecorator {
  return (target: object, propertyName: string | symbol): void => {
    metaColumns.push({ target, propertyName, options })
  }
}
