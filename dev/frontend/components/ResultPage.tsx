import * as React from 'react';
import {gql} from "apollo-boost";
import {ChildDataProps, graphql} from "react-apollo";

// UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';

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
    search: [],
    loading: boolean,
    error: boolean
}

type Props = {
    data: DataProps
}

type ResultProps = Props & ChildDataProps;

class ResultPageComp extends React.Component<ResultProps> {
    render() {
        const {loading, products} = this.props.data;
        if (loading) {
            return <div style={{display:'flex','align-items':'center'}}>
                <CircularProgress color="secondary" size={24} />
                <Typography style={{paddingLeft: "10px;"}}>Loading...</Typography>;
            </div>
        }

        if (!products) return null;
        return <Grid direction="column" container spacing={8}> {
            products.map(item => {
                return <Grid item>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{item.displayName}</Typography>
                            <Typography color={"textSecondary"} variant="subtitle2">Artikel-Nummer: {item.articleNumber}</Typography>
                            <Grid container>
                                {item.assets.map(asset => {
                                    const style = {
                                        background:'url(https://picscdn.redblue.de/doi/'+asset.doi+'/fee_325_225_png) no-repeat center/contain',
                                        width:'105px',
                                        height:'105px',
                                        margin: '2px',
                                        border: '5px solid transparent'
                                    };

                                    return <Grid item style={{background:"url(/img/psbg.png) repeat", border: "5px solid #fff"}}>
                                        <div style={style} />
                                    </Grid>
                                })}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            })
        }
        </Grid>
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
    },
    search @client,
    loading @client,
    error @client
}
`;

export const ResultPage = graphql<any, ResultProps>(GET_PRODUCTS_QUERY)(ResultPageComp);
