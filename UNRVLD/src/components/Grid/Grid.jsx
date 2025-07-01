import React, { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";

const endpoint = "https://mock.shop/api";
const graphQLClient = new GraphQLClient(endpoint);

const GET_PRODUCTS = gql`
 {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await graphQLClient.request(GET_PRODUCTS);
                setProducts(data.products.edges);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <section className="product-grid">
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3">
                    <a>
                        <div className="card">
                            <img />
                            <div className="card-body">#
                                <h4>Title</h4>
                                <p>Description</p>
                                <p>Price</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
   </section> 
  );
}
