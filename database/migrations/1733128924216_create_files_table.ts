import { BaseSchema } from '@adonisjs/lucid/schema'
import { title } from 'process'

export default class extends BaseSchema {
  protected tableName = 'files'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('url').notNullable()
      table.string('title').nullable()
      table.string('type').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}