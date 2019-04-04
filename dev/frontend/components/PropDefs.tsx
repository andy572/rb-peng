import {ChildDataProps} from "react-apollo";
import {RefObject} from "react";

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

export type TypographyProps = {
    variant?: "caption" | "subtitle1" | "subtitle2" | "body" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    color?: "textSecondary" | "textPrimary" | "default",
    style?: object,
    align?: "left" | "right" | "center",
    className?: string
}

export type CheckboxProps = {
    inputRef?:RefObject<HTMLInputElement>,
    label?:string,
    onChange?:()=>{},
    checked?:boolean,
    style?: object,
}