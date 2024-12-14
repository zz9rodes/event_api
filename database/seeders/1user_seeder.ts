import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { DateTime } from 'luxon';


export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'user1@example.com',
        uuid:crypto.randomUUID(),
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        avatarUrl: null,
        phoneNumber: '1234567890',
        dob: DateTime.fromISO('1990-01-01').toJSDate(),
        location: {
          long: '34.0522',
          lat: '-118.2437',
        },
      },
      {
        email: 'user2@example.com',
        uuid:crypto.randomUUID(),
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
        avatarUrl: 'http://example.com/avatar.jpg',
        phoneNumber: '0987654321',
        dob: DateTime.fromISO('1990-01-01').toJSDate(),
        location: {
          long: '40.7128',
          lat: '-74.0060',
        },
      },
      {
        email: 'user3@example.com',
        uuid:crypto.randomUUID(),
        password: 'password123',
        firstName: 'Alice',
        lastName: 'Johnson',
        avatarUrl: null,
        phoneNumber: null,
        dob: DateTime.fromISO('1990-01-01').toJSDate(),
        location: {
          long: '51.5074',
          lat: '-0.1278',
        },
      },
    ]);
  }
}