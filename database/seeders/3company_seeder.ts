import Company from '#models/companies'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    const users= await User.all()
    
    await Company.createMany([
      {
        name: 'Tech Innovations',
        description: 'A leading company in tech innovations.',
        slug: crypto.randomUUID(), // Génère un UUID
        userId:users[0].id
      },
      {
        name: 'Health Solutions',
        description: 'Providing health solutions for better living.',
        slug: crypto.randomUUID(), // Génère un UUID
        userId:users[0].id
      },
      {
        name: 'Finance Experts',
        description: "null", // Description peut être nulle
        slug: crypto.randomUUID(), // Génère un UUID
        userId:users[0].id
      },
      {
        name: 'Creative Designs',
        description: 'Designing creative solutions for businesses.',
        slug: crypto.randomUUID(), // Génère un UUID
        userId:users[1].id
      },
      {
        name: 'Green Energy Co',
        description: 'Focused on renewable energy solutions.',
        slug: crypto.randomUUID(), // Génère un UUID
        userId:users[1].id
      },
    ])
  }
}