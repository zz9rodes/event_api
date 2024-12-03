import { DateTime } from 'luxon'
import type { BelongsTo,ManyToMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column,belongsTo ,manyToMany} from '@adonisjs/lucid/orm'
import Event from './event.js'
import File from './file.js'

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
  declare event: BelongsTo<typeof Event>

  @manyToMany(()=>File,{
    pivotTable: 'posts_files', 
  })
  declare files:ManyToMany<typeof File>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}