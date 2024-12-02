import { DateTime } from 'luxon'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import Event from './event.js'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare cover: string

  @column()
  declare userId: BelongsTo<typeof User>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relation Companies => User(Owner)
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Relations Companies => User(admin)
  @manyToMany(() => User,{
    pivotTable: 'admins', 
  })
  declare admins: ManyToMany<typeof User>


  // Realtion  Companies => Events(event create inside a companies)
  @hasMany(() => Event)
  declare events: HasMany<typeof Event>
}