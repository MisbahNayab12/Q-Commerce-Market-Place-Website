
// import React from "react";
// import CaretRight from '../../../public/CaretRight.png'
// import Image from "next/image";
// import { client } from '@/sanity/lib/client';
// import Handbag from '../../../public/Handbag.png'
// import Link from "next/link";

// const getProduct = async (id: string) => {
//     const product = await client.fetch(
//         `*[_type == "food" && _id == $id][0]{
//         _id,
//         name,
//         category,
//         price,
//         originalPrice,
//         tags,
//         "image": image.asset->url,
//         description,
//         available
//       }`,
//         { id }
//     );
//     return product;
// };

// const ProductDetail = async ({ params }: { params: { id: string } }) => {
    
//     const product = await getProduct(params.id);

//     if (!product) {
//         return <p>Product not found!</p>; // Handle cases when product doesn't exist
//     }
//     return (
//         <div className="bg-white pb-12">
//             <div className="bg-hero-image bg-cover bg-center h-80 w-full flex justify-center items-center mt-[30px]">
//                 <div className=''>
//                     <h1 className='text-white font-sans text-5xl font-bold '>Shop Details</h1>
//                     <div className='flex justify-center items-center'>
//                         <h2 className='text-white leading-[56px] text-inter'> Home </h2>
//                         <Image src={CaretRight} alt="icon" />
//                         <h2 className='text-primary'>Shop details</h2>
//                     </div>
//                 </div>
//             </div>


//             <div className="md:flex-col lg:flex lg:flex-row lg:mx-8 xl:mx-[150px] gap-6 md:py-32 2xl:mx-[600px] 2xl:gap-32">
//                 <Image src={product.image} alt={product.name} width={400} height={400} />
//                 <div className="flex flex-col items-center mt-8">
//                     <p className="text-green-600">{product.available ? 'In Stock' : 'Out of Stock'}</p>
//                     <h1 className="text-[48px] font-bold font-sans text-center lg:text-left mt-10 lg:mt-0">{product.name}</h1>
//                     <p className="text-gray-600">{product.description}</p>
//                     <p className="font-bold text-xl mt-5 text-center lg:text-left">Price: ${product.price}</p>
//                     <p className="text-primary mt-4">Category: {product.category}</p>
                    
//                     <div className='flex justify-center items-center bg-primary h-10 w-[191px] gap-3 hover:bg-amber-400'>
//                 <Image src={Handbag} alt="image" />
//                 <Link href={'/ShoppingCart'}>
//                 <button className='text-white'>Add to Cart</button>
//                 </Link>
//               </div>
                    
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetail;

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

// Use the built-in Next.js types for params
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


