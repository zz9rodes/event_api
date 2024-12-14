import Company from '#models/companies';
import User from '#models/user';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class extends BaseSeeder {
  async run() {
    // Récupérer tous les utilisateurs
    const users: User[] = await User.all();

    // Vérifiez que vous avez suffisamment d'utilisateurs
    if (users.length < 2) {
      console.log('Pas assez d\'utilisateurs trouvés pour associer aux entreprises.');
      return;
    }

    // Créer et attacher chaque entreprise à un utilisateur
    const techInnovations = await Company.create({
      name: 'Tech Innovations',
      description: 'A leading company in tech innovations.',
      slug: crypto.randomUUID() // Génère un UUID
    });
    techInnovations.related('user').associate(users[0])

    const healthSolutions = await Company.create({
      name: 'Health Solutions',
      description: 'Providing health solutions for better living.',
      slug: crypto.randomUUID()// Génère un UUID
    });
    healthSolutions.related('user').associate(users[0])

    const financeExperts = await Company.create({
      name: 'Finance Experts',
      description: null, // Description peut être nulle
      slug: crypto.randomUUID(), // Génère un UUID
    });
    financeExperts.related('user').associate(users[0])

    const creativeDesigns = await Company.create({
      name: 'Creative Designs',
      description: 'Designing creative solutions for businesses.',
      slug: crypto.randomUUID(), // Génère un UUID
    });
    creativeDesigns.related('user').associate(users[1])

    const greenEnergyCo = await Company.create({
      name: 'Green Energy Co',
      description: 'Focused on renewable energy solutions.',
      slug: crypto.randomUUID()// Génère un UUID
    });
    greenEnergyCo.related('user').associate(users[1])

  }
}