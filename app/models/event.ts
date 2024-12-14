import { DateTime } from 'luxon'
import type { BelongsTo,ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column ,manyToMany} from '@adonisjs/lucid/orm'
import Company from './companies.js'
import User from './user.js'
import File from './file.js'
import Category from './categories.js'

export default class Event extends BaseModel {
  @column({ isPrimary: true,serializeAs:null })
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
  declare pricing: string

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
  declare address:string
  
  @column()
  declare location:object 

  @column()
  declare companyId: number; // Définir companyId comme une colonne

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>;

  @manyToMany(() => File,{
    pivotTable: 'events_files', 
  })
  declare files: ManyToMany<typeof File> //realtion entre ManyToMany entre files et events

  @manyToMany(() => User,{
    pivotTable: 'susbcribers', 
  })
  declare susbcribers: ManyToMany<typeof User>

  
  @manyToMany(() => Category,{
    pivotTable: 'events_categories', 
  })
  declare categories: ManyToMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}