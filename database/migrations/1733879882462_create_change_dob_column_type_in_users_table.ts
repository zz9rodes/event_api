import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('dob').alter()
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.timestamp('dob').alter()
    })  }
}