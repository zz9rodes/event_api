import { BaseSeeder } from '@adonisjs/lucid/seeders';
 // Si tu utilises la bibliothèque uuid
import Category from '#models/categories';

export default class extends BaseSeeder {
  async run() {
    const categories = [
      {
        name: 'Technology',
        is_active: true,
        slug: crypto.randomUUID(), // Génère un UUID
      },
      {
        name: 'Health',
        is_active: true,
        slug: crypto.randomUUID(), // Génère un UUID
      },
      {
        name: 'Finance',
        is_active: false,
        slug: crypto.randomUUID(), // Génère un UUID
      },
    ];

    // Insérer les catégories dans la base de données
    await Category.createMany(categories);
  }
}