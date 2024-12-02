import File from "#models/file";
export default class FileService {

    async create(payload: any) {
        try {
            const file = new File()

            file.fill({ ...payload,slug: crypto.randomUUID()})
            return await file.save()
        } catch (error) {
            return error
        }

    }

    async delete(fileSlug: string) {
        try {
            const file = await File.findBy('slug',fileSlug);
            if (!file) {
                return { error: 'file not found' };
            }
            return await  file.delete()
        } catch (error) {
            return { error: error.message || 'An error occurred during delete' };
        }
    }
}