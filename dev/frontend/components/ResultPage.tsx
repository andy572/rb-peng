import * as React from 'react';
import gql from "graphql-tag";
import {ApolloConsumer, graphql} from "react-apollo";
import {ResultProps} from "./PropDefs";

// UI
import {Typography} from './core/Typography';
//import {CircularProgress} from '@material-ui/core';
import {ResultSelectionView} from "./ResultSelectionView";
//import {ResultSizeSelectionView} from "./ResultSizeSelectionView";
import {ProductView} from "./ProductView";
import {FlexContainer} from "./core/FlexContainer";
import {Card} from "./core/Card";

const styles = {
    error: {
        backgroundColor: '#FFEBEE',
        border: '1px solid #EF9A9A'
    },
    font: {
        color: '#D32F2F'
    }
};

/*
<FlexContainer direction={"row"} alignItems={"center"}>
                            <ResultSizeSelectionView data={null} client={client} imageSize={this.props.data.imageSize}/>
                        </FlexContainer>
* */

// <CircularProgress color="secondary" size={24} />

class ResultPageComp extends React.Component<ResultProps> {
    render() {
        const {loading, products, search} = this.props.data;

        if (loading) {
            return <Card className={"rb-flex rb-flex-grow"}>

                <Typography>Loading...</Typography>
            </Card>
        }

        if (!products || products.length === 0) {
            if (search.length == 0) {
                return <FlexContainer direction="column" className={"rb-page-content"}>
                    <Typography variant={"h2"}>Assets finden</Typography>
                    <Typography variant={"subtitle2"}>Bitte bis zu XXX Artikelnummern in das Suchfeld eingeben</Typography>
                </FlexContainer>
            } else {
                return <FlexContainer direction="column" className={"rb-page-content"}>
                    <Typography variant={"h2"}>Assets finden</Typography>
                    <Card style={styles.error}><Typography variant={"h5"}>Es konnten keine Produkte gefunden werden</Typography></Card>
                </FlexContainer>
            }
        }

        // TODO display error: article number(s) where not found

        let assetCount = 0;
        products.forEach((product) => {
            assetCount += product.assets.length;
        });

        const productWord = products.length == 1 ? "Produkt" : "Produkten";
        return <ApolloConsumer>
            {client => (
                <FlexContainer direction="column" style={{overflow:'auto'}} className={"rb-page-content"}>
                    <Typography variant={"h2"}>{assetCount} Assets in {products.length} {productWord} gefunden</Typography>
                    <FlexContainer direction={"row"} alignItems={"center"}>
                        <ResultSelectionView client={client}/>
                    </FlexContainer>
                    {
                        products.map(item => {
                            return <ProductView product={item} products={products}/>
                        })
                    }
                </FlexContainer>
            )}
        </ApolloConsumer>
    }
}

const GET_PRODUCTS_QUERY = gql`
query ProductList {
    products @client {
        displayName, 
        articleNumber,
        assets {
            doi,
            id,
            mediaType,
            extension,
            extension,
            checked
        }
    },
    search @client,
    loading @client,
    error @client,
    imageSize @client
}
`;

export const ResultPage = graphql<any, ResultProps>(GET_PRODUCTS_QUERY)(ResultPageComp);
