"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CaretRight from "../../public/CaretRight.png";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import checkList from '../../public/checklist icon.png'


interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  tags: string;
  image: string;
  description: string;
  available: boolean;
}

interface Category {
  _id: string;
  name: string;
}

const getData = async (): Promise<Product[]> => {
  const res = await client.fetch(`
      *[_type == "food"]{
        _id,
        name,
        category,
        price,
        originalPrice,
        tags,
        "image": image.asset->url,
        description,
        available
      }
    `);
  return res;
};

const getCategories = async (): Promise<Category[]> => {
  const res = await client.fetch(`
      *[_type == "category"]{
        _id,
        name
      }
    `);
  return res;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getData();
        const categoriesData = await getCategories()

        setProducts(data);
        setFilteredProducts(data)
        setCategories(categoriesData)

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleFilter = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
    if (categoryName) {
      const filtered = products.filter(
        (product) => product.category === categoryName
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Show all products when no category is selected
    }
  };

  return (
    <div className="bg-white pb-12">
      <div className="bg-hero-image bg-cover bg-center h-80 w-full flex justify-center items-center mt-[30px]">
        <div className="">
          <h1 className="text-white font-sans text-5xl font-bold ">Our Shop</h1>
          <div className="flex justify-center items-center">
            <h2 className="text-white leading-[56px] text-inter"> Home </h2>
            <Image src={CaretRight} alt="icon" />
            <h2 className="text-primary">Shop</h2>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="flex justify-center gap-10 mt-20 lg:mx-8 xl:mx-[100px] flex-wrap">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product) => (
              <div key={product._id}>
                <Image src={product.image} alt="image" width={300} height={300} />
                <div>
                  <h2 className="font-bold">{product.name}</h2>
                  <p className="text-primary">Price: {product.price}</p>
                </div>
                <div>
                  <Link href={`/Products/${product._id}`}>
                    <button className="w-36 h-10 bg-primary text-white hover:bg-amber-400">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p> Loading Products...</p>
          )}
        </div>

        <div className="mt-20 mr-32 hidden md:block">
          <h1 className="font-bold text-xl mb-5">Category</h1>
          <div className="w-40">
            {/* Show "All Categories" filter */}
            <div
              className={`flex items-center gap-5 mt-5 cursor-pointer ${selectedCategory === null ? "font-bold text-primary" : ""
                }`}
              onClick={() => handleFilter(null)}
            >
              <Image src={checkList} alt="All" />
              <p>All Categories</p>
            </div>

            {categories.map((category) => (
              <div
                key={category._id}
                className={`flex items-center gap-5 mt-5 cursor-pointer ${selectedCategory === category.name ? "font-bold text-primary" : ""
                  }`}
                onClick={() => handleFilter(category.name)}
              >
                <Image src={checkList} alt={category.name} />
                <p>{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;