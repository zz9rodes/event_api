import { DateTime } from 'luxon'
import type {ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column,manyToMany } from '@adonisjs/lucid/orm'
import Event from './event.js'
import type { UUID } from 'crypto'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name:string

  @column()
  declare isActive:boolean

  @column()
  declare slug:UUID

  @manyToMany(() => Event,{
    pivotTable: 'events_categories', 
  })
  declare categories: ManyToMany<typeof Event>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}