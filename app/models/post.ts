import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column,belongsTo } from '@adonisjs/lucid/orm'
import Event from './event.js'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug:string

  @column()
  declare title:string

  @column()
  declare description:string

  @column()
  declare eventId: BelongsTo<typeof Event>

  @belongsTo(() => Event)
  declare user: BelongsTo<typeof Event>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}