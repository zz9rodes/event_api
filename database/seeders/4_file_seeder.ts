import { BaseSeeder } from '@adonisjs/lucid/seeders'
import File from '#models/file'

export default class extends BaseSeeder {
  async run() {

    await File.createMany([
      {
        url: 'https://i.pinimg.com/236x/63/fc/01/63fc013bb8b80ec8319de87a85d619b8.jpg',
        title: 'Image 1',
        type: 'img',
        slug: crypto.randomUUID(), // Génère un UUID
      },
      {
        url: 'https://i.pinimg.com/736x/47/a0/3e/47a03e352e0c51faff8af41566e40c70.jpg',
        title: 'Image 2',
        type: 'img',
        slug: crypto.randomUUID(), // Génère un UUID
      },
      {
        url: 'https://i.pinimg.com/236x/d9/19/c3/d919c3b417bca4a6a1da65441a40ba6c.jpg',
        title: 'Image 3',
        type: 'img',
        slug: crypto.randomUUID(), // Génère un UUID
      },
      {
        url: 'https://i.pinimg.com/236x/b3/28/3e/b3283e761d55fcb34e5a279959408f52.jpg',
        title: 'Image 4',
        type: 'img',
        slug: crypto.randomUUID(), // Génère un UUID
      },
    ])
  }
}