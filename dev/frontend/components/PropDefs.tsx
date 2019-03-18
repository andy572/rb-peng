
export type ProductAsset = {
    doi: string,
    id: string,
    checked: boolean
}

export type Product = {
    articleNumber: number,
    catalogEntryId: number,
    displayName: string,
    longDescription: string,
    onlineStatus: boolean,
    rating: number,
    salesPrice: number,
    shipping: number,
    shortDescription: string,
    assets: ProductAsset[]
}

export interface DataProps {
    data: {
        products: Product[],
        search: string[],
        loading: boolean,
        error: boolean
    }
}