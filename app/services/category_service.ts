import Category from "#models/category";
export default class CategoryService {

    async create(payload: any) {
        try {
            const categorie = new Category()

            categorie.fill({ ...payload, slug: crypto.randomUUID() })
            return await categorie.save()
        } catch (error) {
            return error
        }

    }

    async get() {
        return Category.query().select('slug', 'name', 'is_active')
    }

    async update(categoryId: string, payload: any) {
        try {
            const category = await Category.findBy('slug', categoryId);
            if (!category) {
                return { error: 'Category not found' };
            }
            return await category.merge({ ...payload }).save()
        } catch (error) {
            return { error: error.message || 'An error occurred during update' };
        }
    }
    async delete(categoryId: string) {
        try {
            const category = await Category.findBy('slug', categoryId);
            if (!category) {
                return { error: 'Category not found' };
            }
            return await  category.delete()
        } catch (error) {
            return { error: error.message || 'An error occurred during delete' };
        }
    }
}