import { DateTime } from 'luxon'
import type {ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Event from './event.js'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string
  
  @column()
  declare url: string
  
  @column()
  declare title: string

  @column()
  declare type: string

  @manyToMany(() => Event,{
    pivotTable: 'events_files', 
  })
  declare events: ManyToMany<typeof Event> //realtion entre ManyToMany entre files et events

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}