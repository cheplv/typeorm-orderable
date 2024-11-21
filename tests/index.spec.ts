import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'
import { Order, Orderable } from '../src/index'
import { TestEntity } from '../src/test-entity'

import { describe, expect, it } from 'vitest'

describe('Order', () => {
  it('should return function', () => {
    const orderFn = Order({ priority: 1 })
    expect(orderFn).toBeTypeOf('function')
    const result = orderFn({ name: 'John' }, 'name')
    expect(result).toBe(undefined)
  })
})

describe('Orderable', () => {
  it('should return function', () => {
    const orderableFn = Orderable()
    expect(orderableFn).toBeTypeOf('function')
  })

  it('should create table', () => {
    const orderableFn = Orderable()
    expect(orderableFn).toBeTypeOf('function')
    const testEntity = new TestEntity()
    orderableFn(testEntity.constructor)
  })
})
