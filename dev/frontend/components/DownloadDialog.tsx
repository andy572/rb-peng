import * as React from "react";
import {Dialog, DialogContent, DialogTitle} from "./core/Dialog";
import gql from "graphql-tag";
import {ApolloConsumer, graphql} from "react-apollo";
import {DownloadDialogProps} from "./PropDefs";
import {Typography} from "./core/Typography";
import {CloseIcon} from "./core/CloseIcon";
import {Button} from "./core/Button";

type DownloadAsset = {
    doi: string
}

type DownloadProduct = {
    articleNumber: number,
    assets: DownloadAsset[]
}

class DownloadDialogComponent extends React.Component<DownloadDialogProps> {
    state: { downloadState: number, downloadLink: string|null };
    client: any;


    constructor(props) {
        super(props);
        this.state = {downloadState: -1, downloadLink: null};
    }

    render() {
        if (!this.props.data.isDownloadDialogOpen)
            return null;

        return <ApolloConsumer>
            {client => {
                this.client = client;
                 return <Dialog open={true}>
                     <DialogTitle>
                         <Typography variant={"h3"}>
                             Assets herunterladen
                         </Typography>
                         <Button align={"right"} className={"rb-no-padding"} onClick={() => {return this.onClose(client)}}>
                             <CloseIcon/>
                         </Button>
                     </DialogTitle>
                     <DialogContent>
                         { this.showDownloadState() }
                     </DialogContent>
                 </Dialog>
            }}
        </ApolloConsumer>
    }

    showDownloadState() {
        if (this.state.downloadState === 1) {
            return <Typography variant={"subtitle2"}>Bitte warten,<br/>die ausgewählten Assets werden heruntergeladen und verarbeitet...</Typography>;
        }

        if (this.state.downloadState === 2) {
            return <Typography variant={"subtitle2"}>Bitte hier klicken, um die Assets zu speichern</Typography>;
        }

        if (this.state.downloadState === 3) {
            return <Typography variant={"subtitle2"}>Ein Fehler ist aufgetreten, bitte den Vorgang wiederholen</Typography>;
        }

        return null;
    }

    onClose = (client) => {
        client.writeData({data:{isDownloadDialogOpen: false}});
        this.setState({downloadState: -1});
        return true;
    };

    requestDownloadLink = async(products) => {
        return await this.client.query({query: GET_DOWNLOAD_PRODUCTS_QUERY, variables: {products:products}})
            .then(response => {
                console.log( response.json() );
            })
            .catch((e) => {
                console.log( e );
                this.setState({downloadState:3});
            });
    };

    componentDidUpdate = async () => {
        if (this.props.data.isDownloadDialogOpen && this.state.downloadState === -1) {
            if (this.props.data.products && this.props.data.products.length) {
                await this.setState({downloadState:1});

                const filtered_products = this.props.data.products.filter((product) => {
                    let hasSelection = false;
                    product.assets.forEach(asset => {
                        if (asset.checked) {
                            hasSelection = true;
                        }
                    });

                    return hasSelection;
                });

                if (filtered_products.length) {
                    const products:DownloadProduct[] = filtered_products.map(product => {
                        const assets:DownloadAsset[] = product.assets.filter(asset => {
                            return asset.checked;
                        }).map(asset => {
                            return {doi: asset.doi};
                        });
                        return {articleNumber: product.articleNumber, assets};
                    });

                    this.requestDownloadLink(products);
                }
            }
        }

        if (!this.props.data.isDownloadDialogOpen && this.state.downloadState > -1) {
            this.setState({downloadState: -1});
        }
    }
}

const GET_DOWNLOAD_DIALOGOPEN_QUERY = gql`
query GET_DIALOGOPEN_QUERY {
    isDownloadDialogOpen @client,
    products @client {
        articleNumber,
        assets {
            doi,
            checked
        }
    }
}
`;

const GET_DOWNLOAD_PRODUCTS_QUERY = gql`
query ProductDownload($products: [DownloadProductListType]!) {
    requestDownload(products: $products)
}
`;

export const DownloadDialog = graphql<any, DownloadDialogProps>(GET_DOWNLOAD_DIALOGOPEN_QUERY)(DownloadDialogComponent);
