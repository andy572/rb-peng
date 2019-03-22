import * as React from "react";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {SearchHistoryProps} from "./PropDefs";


class SearchHistoryComponent extends React.Component<SearchHistoryProps> {
    render() {
        if (this.props.data.search.length == 0) return null;

        return <Grid container direction={"column"} style={{marginTop:15}}>
            <Grid item>
                <Typography variant={"caption"} color={"default"}>Verlauf</Typography>
            </Grid>
            {this.props.data.search.map(value => {
                return <Grid item>
                    <Typography variant={"subtitle2"}>{value}</Typography>
                </Grid>
            })}
        </Grid>;
    }
}

const GET_SEARCH_VALUES = gql`
    query GET_SEARCH_VALUES {
        search @client
    }
`;

export const SearchHistory = graphql<any, SearchHistoryProps>(GET_SEARCH_VALUES)(SearchHistoryComponent);