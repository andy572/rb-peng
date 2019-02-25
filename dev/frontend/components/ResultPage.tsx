import * as React from 'react';
import {gql} from "apollo-boost";
import {graphql} from "react-apollo";

class ResultPageComp extends React.Component {
    render() {
        console.log( this );
        return <div>DATA IS COMING...</div>
    }
}

const GET_ARTICLES_QUERY = gql`
query ArticlesQuery {
    articles @client
}
`;

export const ResultPage = graphql(GET_ARTICLES_QUERY)(ResultPageComp);