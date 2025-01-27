"use client"
import {ProductListing} from "./components/productListing";
import {Navbar} from "./components/navbar";
import { useState } from "react";
export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <main className="px-[10%] py-4">
      <Navbar setTag={setSelectedTag} setSearchTerm={setSearchTerm}/>
      <ProductListing tag={selectedTag} searchTerm={searchTerm}/>
    </main>
  );
}


// Next: Color tags for categories, Search Bar
/**
 * Acknowledgements:
 * Free images from Lorem Picsum (https://picsum.photos)
 */