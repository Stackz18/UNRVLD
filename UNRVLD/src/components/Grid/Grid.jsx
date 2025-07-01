import React, { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import "./Grid.scss"

const endpoint = "https://mock.shop/api";
const graphQLClient = new GraphQLClient(endpoint);

const GET_PRODUCTS = gql`
 {
    products(first: 20) {
      edges {
        node {
          id
          title
          description
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
                {products.map(({ node: product }) => {
                    const image = product.images.edges[0]?.node;
                    const variant = product.variants.edges[0]?.node;
                    const price = variant?.price;

                    return (
                        <div key={product.id} className="col-12 col-md-6 col-lg-3">
                            <a href={product.handle}>
                                <div className="card">
                                    {image?.url && (
                                        <img
                                            src={image.url}
                                            alt={image.altText || product.title}
                                            className="card-img"
                                            style={{ objectFit: "cover", height: "300px", width: "100%" }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h4>{product.title}</h4>
                                        <p>{product.description || "No description available."}</p>
                                        <p>£{parseFloat(price.amount).toFixed(2)}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                })};




            </div>
        </section>
    );
}
