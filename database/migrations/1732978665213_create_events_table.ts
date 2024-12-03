import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.integer('price').notNullable().defaultTo(1000)
      table.integer('places').notNullable().defaultTo(1000)
      table.boolean('active').defaultTo(false).notNullable()
      table.date('date_time').notNullable()
      table.string('duration').notNullable()
      table.json('location')
      table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE').notNullable();
      table.timestamp('created_at')
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}