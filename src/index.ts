import { getMetadataArgsStorage } from 'typeorm'

type OrderOptions = {
  priority?: number
  after?: string
  before?: string
}

type OrderTarget = {
  target: object
  propertyName: string | symbol
  options: OrderOptions
}

const metaColumns: OrderTarget[] = []
const metaMapping: Map<string | Function, OrderTarget[]> = new Map()

export function Order(options: OrderOptions): PropertyDecorator {
  return (target: object, propertyName: string | symbol): void => {
    metaColumns.push({ target, propertyName, options })
  }
}

export function Orderable(): ClassDecorator {
  return (target: Function): void => {
    metaMapping.set(
      target,
      metaColumns.map(item => {
        return {
          ...item,
          target,
        }
      }),
    )

    metaColumns.splice(0, metaColumns.length)

    getMetadataArgsStorage().columns.sort((a, b): number => {
      const aOrder: number =
        metaMapping
          .get(a.target)
          ?.find(item => item.propertyName === a.propertyName)?.options
          .priority ?? 0
      const bOrder: number =
        metaMapping
          .get(b.target)
          ?.find(item => item.propertyName === b.propertyName)?.options
          .priority ?? 0

      return aOrder - bOrder
    })

    metaMapping.get(target)?.forEach(item => {
      if (item.options.before || item.options.after) {
        const currentIndex = getMetadataArgsStorage().columns.findIndex(
          column => {
            if (
              column.target == target &&
              column.propertyName == item.propertyName
            ) {
              return true
            }
            return false
          },
        )

        /*
        console.log(
          "BEFORE/AFTER",
          item.target,
          item.propertyName,
          item.options.before,
          item.options.after
        );
        */

        const currentField = getMetadataArgsStorage().columns.splice(
          currentIndex,
          1,
        )
        const offsetElementName = item.options.after || item.options.before
        const offsetElementShift = item.options.after ? 1 : 0

        const offsetIndex = getMetadataArgsStorage().columns.findIndex(
          column => {
            if (
              column.target == target &&
              column.propertyName == offsetElementName
            ) {
              return true
            }
            return false
          },
        )

        if (offsetIndex > -1) {
          getMetadataArgsStorage().columns.splice(
            offsetIndex + offsetElementShift,
            0,
            currentField[0],
          )
        } else {
          getMetadataArgsStorage().columns.splice(
            currentIndex,
            0,
            currentField[0],
          )
        }
      }
    })

    //console.log("ORDERABLE", target, metaMapping, getMetadataArgsStorage());
  }
}
