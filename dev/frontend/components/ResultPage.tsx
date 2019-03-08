import * as React from 'react';
import {gql} from "apollo-boost";
import {ChildDataProps, graphql} from "react-apollo";

type ProductAsset = {
    doi: string,
    id: string
}

type Product = {
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

type DataProps = {
    products: Product[],
    error: string,
    loading: boolean
}

type Props = {
    data: DataProps
}

type ResultProps = Props & ChildDataProps;

class ResultPageComp extends React.Component<ResultProps> {
    render() {
        console.log( this.props.data);
        return <div>{
            this.props.data.products.map(item => {
                return <div><p>DisplayName: {item.displayName}</p><p>Artikel-Nummer: { item.articleNumber }</p></div>
            })
        }</div>
    }
}

const GET_PRODUCTS_QUERY = gql`
query ProductList {
    products @client {
        displayName, 
        articleNumber,
        catalogEntryId,
        longDescription,
        shortDescription,
        onlineStatus,
        rating,
        salesPrice,
        shipping,
        assets {
            doi,
            id
        }
    }
}
`;

export const ResultPage = graphql<any, ResultProps>(GET_PRODUCTS_QUERY)(ResultPageComp);