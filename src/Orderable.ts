import { getMetadataArgsStorage } from 'typeorm'
import { metaMapping, metaColumns } from './MetaStore'

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

        if (currentIndex < 0) return

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
  }
}
