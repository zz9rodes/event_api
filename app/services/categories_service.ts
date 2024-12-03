import Category from "#models/categories";
import ApiResponse from "../../utils/ApiResponse.js";
export default class CategoryService {

    async create(payload: any) {
        try {
            const categorie = new Category()

            categorie.fill({ ...payload, slug: crypto.randomUUID() })
            await categorie.save()

            return ApiResponse.success(categorie)
        } catch (error) {
            return ApiResponse.error(error?.message)
        }

    }

    async get() {
        try{
            const categories= await Category.query().select('slug', 'name', 'is_active')

            return  ApiResponse.success(categories)
        }
        catch(error){
            return ApiResponse.error(error?.message)
        }
       
    }

    async update(categoryId: string, payload: any) {
        try {
            const category = await Category.findBy('slug', categoryId);
            if (!category) {
                return ApiResponse.error("Category not found")
            }
             await category.merge({ ...payload }).save()
             return ApiResponse.success(category)
        } catch (error) {
            return ApiResponse.error(error.message || 'An error occurred during update' )

        }
    }
    async delete(categoryId: string) {
        try {
            const category = await Category.findBy('slug', categoryId);
            if (!category) {
                return ApiResponse.error("Category not found")
            }
             await  category.delete()

             return ApiResponse.success(null)
        } catch (error) {
            return ApiResponse.error(error.message || 'An error occurred during update' )
        }
    }
}