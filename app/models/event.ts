import { DateTime, DateTimeMaybeValid } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Company from './companies.js'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string

  @column()
  declare name:string

  @column()
  declare active: boolean

  @column()
  declare price: number

  @column()
  declare places: number
  
  @column()
  declare description:string

  @column()
  declare date_time:Date

  @column()
  declare duration:string

  @column()
  declare palce:string 
  
  @column()
  declare location:object 

  @column()
  declare companyId: number; // Définir companyId comme une colonne

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}