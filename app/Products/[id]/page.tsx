import React from "react";
import ProductDetail from "./ProductDetail";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";

const getProduct = async (id: string) => {
  try {
    const product = await client.fetch(
      `*[_type == "food" && _id == $id][0]{
        _id,
        name,
        category,
        price,
        originalPrice,
        tags,
        "image": image.asset->url,
        description,
        available
      }`,
      { id }
    );
    return product || null;
  } catch (err) {
    console.error("Error fetching product:", err);
    return null;
  }
};


interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for does not exist.",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

const Page = async ({ params }: Props) => {
  const product = await getProduct(params.id);

  if (!product) {
    return <p>Product not found</p>;
  }

  return <ProductDetail product={product} />;
};

export default Page;


