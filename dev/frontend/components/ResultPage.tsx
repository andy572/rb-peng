import * as React from 'react';
import {gql} from "apollo-boost";
import {ApolloConsumer, graphql} from "react-apollo";
import {ResultProps} from "./PropDefs";

// UI
import Typography from '@material-ui/core/Typography';
import {CircularProgress} from '@material-ui/core';
import {ResultSelectionView} from "./ResultSelectionView";
import {ResultSizeSelectionView} from "./ResultSizeSelectionView";
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

class ResultPageComp extends React.Component<ResultProps> {
    render() {
        const {loading, products, search} = this.props.data;

        if (loading) {
            return <Card className={"rb-flex rb-flex-grow"}>
                <CircularProgress color="secondary" size={24} />
                <Typography>Loading...</Typography>
            </Card>
        }

        if (!products || products.length === 0) {
            if (search.length == 0) {
                return <Card className={"rb-flex rb-flex-grow"}>
                    <Typography>Geben Sie eine oder mehrere Artikelnummern ein, um zu beginnen</Typography>
                </Card>
            } else {
                return <Card style={styles.error} className={"rb-flex rb-flex-grow"}>
                    <Typography style={styles.font}>Es konnten keine Produkte gefunden werden</Typography>
                </Card>
            }
        }

        // TODO display error: article number(s) where not found

        return <ApolloConsumer>
            {client => (
                <FlexContainer direction="column" style={{overflow:'auto'}}>
                    <FlexContainer direction={"row"} alignItems={"center"}>
                        <ResultSelectionView client={client}/>
                        <FlexContainer direction={"row"} alignItems={"center"}>
                            <ResultSizeSelectionView data={null} client={client} imageSize={this.props.data.imageSize}/>
                        </FlexContainer>
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
            expectedSize,
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
