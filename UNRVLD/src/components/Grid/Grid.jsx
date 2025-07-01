import React, { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import "./Grid.scss";

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
                selectedOptions {
                  name
                  value
                }
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
    const [sortOrder, setSortOrder] = useState("asc");
    const [visibleCount, setVisibleCount] = useState(8);

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

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const sortedProducts = [...products].sort((a, b) => {
        const priceA = parseFloat(a.node.variants.edges[0]?.node.price.amount || 0);
        const priceB = parseFloat(b.node.variants.edges[0]?.node.price.amount || 0);
        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });

    const visibleProducts = sortedProducts.slice(0, visibleCount);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <section className="product-grid">

            <div className="row">
                <div className='col-12 col-lg-6 extra-padding'>
                    <span className='subheading'>// Spring Summer 25</span>
                    <h2>Explore the range</h2>
                </div>
                <div className='col-12 col-lg-6 extra-padding justify-right-desktop'>
                    <select className="form-select" value={sortOrder} onChange={handleSortChange}>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="row">
                {visibleProducts.map(({ node: product }) => {
                    const image = product.images.edges[0]?.node;
                    const variant = product.variants.edges[0]?.node;
                    const price = variant?.price;
                    const colorOption = variant?.selectedOptions.find(opt =>
                        opt.name.toLowerCase() === "color"
                    );

                    return (
                        <div key={product.id} className="col-12 col-md-6 col-lg-3">
                            <a href={product.handle} className="text-decoration-none text-dark">
                                <div className="card">
                                    {image?.url && (
                                        <img
                                            src={image.url}
                                            alt={image.altText || product.title}
                                            className="card-img"
                                            style={{ objectFit: "cover", height: "350px", width: "100%" }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h4 className="card-title">{product.title}</h4>
                                        <p className="card-description">{product.description || "No description available."}</p>
                                        <p className="card-color">{colorOption ? colorOption.value : ""}</p>
                                        <p className="card-price">£{parseFloat(price.amount).toFixed(2)}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    );
                })}
            </div>

            {visibleCount < products.length && (
                <button
                    className="btn text-center"
                    onClick={() => setVisibleCount(products.length)}
                >
                    Show More
                </button>
            )}
        </section>
    );
}
