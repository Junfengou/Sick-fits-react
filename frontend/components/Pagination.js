import React from "react";
import PaginationStyles from "./styles/PaginationStyles";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { perPage } from "../config";
import Head from "next/head";
import Link from "next/link";

const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		itemsConnection {
			aggregate {
				count
			}
		}
	}
`;

function Pagination(props) {
	return (
		<Query query={PAGINATION_QUERY}>
			{({ data, loading, error }) => {
				if (loading) return <p>Loading...</p>;

				const count = data.itemsConnection.aggregate.count;
				const pages = Math.ceil(count / perPage);
				const page = props.page;
				return (
					//data-test is for snapshot testing only! This component get data-test because it doesn't have nested query or mutation
					<PaginationStyles data-test="pagination">
						<Head>
							<title>
								Sick Fits - Page {page} of {pages}
							</title>
						</Head>
						<Link
							prefetch
							href={{
								pathname: "items",
								query: { page: page - 1 },
							}}
						>
							<a className="prev" aria-disabled={page <= 1}>
								Previous page
							</a>
						</Link>
						<p>
							Page {props.page} of <span className="totalPages">{pages}</span>
						</p>
						<p>{count} Item total</p>

						<Link
							prefetch
							href={{
								pathname: "items",
								query: { page: page + 1 },
							}}
						>
							<a className="next" aria-disabled={page >= pages}>
								Next page
							</a>
						</Link>
					</PaginationStyles>
				);
			}}
		</Query>
	);
}

export default Pagination;
export { PAGINATION_QUERY };
