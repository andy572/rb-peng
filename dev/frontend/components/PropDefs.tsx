import {ChildDataProps} from "react-apollo";

export type ProductAsset = {
    doi: string,
    id: string,
    mediaType: string,
    expectedSize: number,
    extension: string,
    checked: boolean
}

export type Product = {
    articleNumber: number,
    displayName: string,
    assets: ProductAsset[]
}

export type ResultProps = {
    data: {
        products: Product[],
        search: string[],
        loading: boolean,
        error: boolean,
        imageSize: number
    }
} & ChildDataProps;

export type AssetItemViewProps = {
    asset: ProductAsset,
    articleNumber: number
} & ChildDataProps;

export type ImageDialogProps = {
    data: {
        isProductDialogOpen: boolean,
        dialogImage: string,
        imageSize: number
    }
} & ChildDataProps

export type SearchHistoryProps = {
    data: {
        search: string[]
    }
} & ChildDataProps;

export type ClientProp = {
    client: any
} & ChildDataProps;