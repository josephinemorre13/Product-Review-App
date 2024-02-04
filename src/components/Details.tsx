import React from "react";

type ProductDetails = {
    name: string;
    createdAt: Date;
    details: string;
    category: string;
    currency: string;
    price: string;
}

interface DetailsProps {
    product: ProductDetails;
}

const Details: React.FC<DetailsProps> = (props) => {
    const { product } = props;
    const { name, createdAt, details, category, currency, price } = product;

    return (
        <section className="description">
            <p className="pre">{category}</p>
            <h1>{name}</h1>
            <p className="desc">{details}</p>
            <div className="price">
                <div className="main-tag">
                    <h2>{currency} {price}</h2>
                </div>
            </div>
            <p>Date created: {new Date(createdAt).toLocaleDateString()}</p>
        </section>
    );
};

export default Details;