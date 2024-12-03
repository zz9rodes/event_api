import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import File from '#models/file'
import Company from '#models/companies'
import Event from '#models/event'
import { DateTime } from 'luxon'; // Pour manipuler les dates

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    const users = await User.all()
    const files = await File.all()
    const companies = await Company.all()

    const event1 = await Event.create({
      slug: crypto.randomUUID(), // Génère un UUID
      name: 'Tech Conference 2024',
      description: 'A conference showcasing the latest in technology.',
      price: 150,
      places: 100,
      location: {
        lon: '34.0522',
        lat: '-118.2437',
      },
      active: true,
      date_time: DateTime.fromISO('2024-12-10').plus({ days: 10 }).toJSDate(),
      duration: '3h',
      companyId: companies[0].id
    })

    event1.related('susbcribers').attach([users[0].id, users[1].id])
    event1.related('files').attach([files[0].id,files[3].id])



    const event2 = await Event.create({
      slug: crypto.randomUUID(), // Génère un UUID
      name: 'Finance Workshop',
      description: 'A workshop on personal finance management.',
      price: 120,
      places: 50,
      location: {
        lon: '40.7128',
        lat: '-74.0060',
      },
      active: true,
      date_time: DateTime.local().plus({ days: 20 }).toJSDate(), // Une date future
      duration: '2h',
      companyId: companies[0].id
    })

    event2.related('susbcribers').attach([users[2].id, users[1].id])
    event2.related('files').attach([files[2].id,files[1].id])

  }
}