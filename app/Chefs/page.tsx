"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CaretRight from '../../public/CaretRight.png';
import { client } from "@/sanity/lib/client";

interface Chef {
  _id: string;
  name: string;
  position: string;
  experience: number;
  specialty: string;
  image: string;
  description: string;
  available: boolean;
}

const getData = async (): Promise<Chef[]> => {
  const res = await client.fetch(`
    *[_type == "chef"]{
      _id,
      name,
      position,
      experience,
      specialty,
      "image": image.asset->url,
      description,
      available,
    }
  `);
  return res;
};

export default function Chefs() {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setChefs(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className='bg-white pb-12'>
      <div className="bg-hero-image bg-cover bg-center h-80 w-full flex justify-center items-center mt-[30px]">
        <div>
          <h1 className="text-white font-sans text-5xl font-bold">Our Chef</h1>
          <div className="flex justify-center items-center">
            <h2 className="text-white leading-[56px] text-inter">Home</h2>
            <Image src={CaretRight} alt="icon" />
            <h2 className="text-primary">Chef</h2>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-10 mt-20 lg:mx-8 xl:mx-[150px] flex-wrap">
        {loading ? (
          <p>Loading Products...</p>
        ) : chefs.length > 0 ? (
          chefs.map((chef) => (
            <div key={chef._id} className='text-center'>
              <Image src={chef.image} alt={chef.name} width={250} height={250} />
              <div>
                <h2 className="font-bold mt-4">{chef.name}</h2>
                <p>Chef</p>
              </div>
            </div>
          ))
        ) : (
          <p>No chefs available.</p>
        )}
      </div>
    </div>
  );
}


