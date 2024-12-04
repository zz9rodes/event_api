import File from "#models/file";
import ApiResponse from "../../utils/ApiResponse.js";
export default class FileService {

    async create(payload: any) {
        try {
            const file = new File()

            file.fill({ ...payload,slug: crypto.randomUUID()})
            await file.save()

            return  ApiResponse.success(201,file)
        } catch (error) {
            return ApiResponse.error(500,error?.message)
        }

    }

    async delete(fileSlug: string) {
        try {
            const file = await File.findBy('slug',fileSlug);
            if (!file) {
                return ApiResponse.error(501,"file not found")
            }
             await  file.delete()
             return ApiResponse.success(200,null)
        } catch (error) {
            return ApiResponse.error(500,error.message || 'An error occurred during delete')
        }
    }
}