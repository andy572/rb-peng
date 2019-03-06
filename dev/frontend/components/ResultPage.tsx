import * as React from 'react';
import {gql} from "apollo-boost";
import {ChildDataProps, graphql} from "react-apollo";

type Asset = {
    doi: string,
    id: string
}

type Product = {
    id: number,
    name: string,
    assets: Asset[]
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
        return <div>{
            this.props.data.products.map(item => {
                return <div><p>DisplayName: {item.name}</p><p>Artikel-Nummer: { item.id }</p></div>
            })
        }</div>
    }
}

const GET_PRODUCTS_QUERY = gql`
query ProductList {
    products @client {
        name,
        id,
        assets {
            doi,
            id
        }
    }
}
`;

export const ResultPage = graphql<any, ResultProps>(GET_PRODUCTS_QUERY)(ResultPageComp);