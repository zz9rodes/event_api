import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import type {HasMany, ManyToMany} from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasMany,  manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import  type { UUID } from 'crypto'
import Company from './companies.js'
import Event from './event.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid:UUID

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare avatarUrl: string | null

  @column()
  declare phoneNumber: string | null

  @column()
  declare dob: Date | null

  @column()
  declare location: object | null

  @hasMany(()=>Company)
  declare company: HasMany<typeof Company>

  
  @manyToMany(() => Company,{
    pivotTable: 'admins', // Spécifiez le nom de la table pivot
  })
  declare admins: ManyToMany<typeof Company>

  @manyToMany(() => Event,{
    pivotTable: 'susbcribers', 
  })
  declare susbcribers: ManyToMany<typeof Event>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}