export interface Furniture {
    _id: string,
    name: string,
    description: string,
    categoryId: string,
    brandId: string,
    price: number ,
    quantity: number ,
    modelId: string,
    thumbnailUrl: string,
    _delete: boolean,
    createdAt: Date,
    updatedAt: Date,
}