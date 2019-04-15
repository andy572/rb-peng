import * as React from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {Typography} from "./core/Typography";
import {SearchHistoryProps} from "./PropDefs";
import {FlexContainer} from "./core/FlexContainer";
import {Button} from "./core/Button";


class SearchHistoryComponent extends React.Component<SearchHistoryProps> {
    render() {
        if (this.props.data.search.length == 0) return null;

        return <FlexContainer direction={"column"} style={{marginTop:15}}>
            <Typography variant={"caption"} color={"textSecondary"}>Verlauf</Typography>
            {this.props.data.search.map(value => {
                return <Typography variant={"subtitle2"}>{value}</Typography>
            })}
            <Button align={"center"} className={"rb-search-reset"} onClick={this.onResetClick}><span className={"fa fa-close"}/>&nbsp;<span>Suche zurücksetzen</span></Button>
        </FlexContainer>;
    }

    onResetClick = () => {
        this.props.client.writeData({data: {products: [], search: []}});
    }
}

const GET_SEARCH_VALUES = gql`
    query GET_SEARCH_VALUES {
        search @client
    }
`;

export const SearchHistory = graphql<any, SearchHistoryProps>(GET_SEARCH_VALUES)(SearchHistoryComponent);