import * as React from "react";
import {Dialog} from "./core/Dialog";
import gql from "graphql-tag";
import {ApolloConsumer, graphql} from "react-apollo";
import {ImageDialogProps} from "./PropDefs";

class ImageDialogComponent extends React.Component<ImageDialogProps> {
    render() {
        return <ApolloConsumer>
            {client => (
                 <Dialog open={this.props.data.isProductDialogOpen}>
                     {this.renderAsset()}
                </Dialog>
            )}
        </ApolloConsumer>
    }

    renderAsset() {
        let imageSizeString;
        let boxSize = {width: 0, height: 0};
        switch (this.props.data.imageSize) {
            case 1:
                imageSizeString = 'fee_194_131_png';
                boxSize = {width: 200, height: 200};
                break;

            case 2:
                imageSizeString = 'fee_325_225_png';
                boxSize = {width: 350, height: 350};
                break;

            case 3:
                imageSizeString = 'fee_786_587_png';
                boxSize = {width: 800, height: 800};
                break;
        }
        return <div style={{width: boxSize.width, height: boxSize.height,background: 'url(https://picscdn.redblue.de/doi/'+this.props.data.dialogImage+'/'+imageSizeString+') no-repeat center/contain'}}/>
    }

    onClose = (client) => {
        client.writeData({data:{isProductDialogOpen: false, dialogImage: null}});
        return true;
    }
}

const GET_DIALOGOPEN_QUERY = gql`
query GET_DIALOGOPEN_QUERY {
    isProductDialogOpen @client,
    dialogImage @client,
    imageSize @client
}
`;

export const ImageDialog = graphql<any, ImageDialogProps>(GET_DIALOGOPEN_QUERY)(ImageDialogComponent);
