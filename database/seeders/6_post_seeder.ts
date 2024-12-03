import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Post from '#models/post'; 
import Event from '#models/event'; 
import File from '#models/file';
export default class PostSeeder extends BaseSeeder {
  public async run() {
    // Récupérer des événements et des fichiers existants
    const events = await Event.all();
    const files = await File.all();

    const posts = [
      {
        slug: crypto.randomUUID(),
        title: 'First Post Title',
        description: 'Description for the first post.',
        eventId: events[0]?.id, 
      },
      {
        slug: crypto.randomUUID(),
        title: 'Second Post Title',
        description: 'Description for the second post.',
        eventId: events[1]?.id, 
      },
      {
        slug: crypto.randomUUID(),
        title: 'Third Post Title',
        description: 'Description for the third post.',
        eventId: events[0]?.id, 
      },
    ];

    const createdPosts = await Post.createMany(posts);

    for (const post of createdPosts) {
      if (files.length > 0) {
        await post.related('files').attach([files[0].id, files[1]?.id]); 
      }
    }
  }
}