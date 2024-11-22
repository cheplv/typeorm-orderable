import { OrderOptions } from './OrderOptions'

type OrderTarget = {
  target: object
  propertyName: string | symbol
  options: OrderOptions
}

export const metaColumns: OrderTarget[] = []
export const metaMapping: Map<string | Function, OrderTarget[]> = new Map()
