"use client"
import {ProductListing} from "./components/productListing";
import {Navbar} from "./components/navbar";
import { useState } from "react";
import { CreateProductForm } from "./components/createProductForm";
export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [createMode, setCreateMode] = useState<boolean>(false);
  return (
    <>
    <main className="px-[10%] py-4 space-y-8">
      <Navbar setTag={setSelectedTag} setSearchTerm={setSearchTerm} setFilter={setFilterType} setCreateMode={setCreateMode}/>
      <ProductListing tag={selectedTag} searchTerm={searchTerm} filter={filterType}/>
    </main>
     {createMode && (
      <CreateProductForm setCreateMode={setCreateMode}/>
    )}
    </>
  );
}


// Next: Color tags for categories, Search Bar
/**
 * Acknowledgements:
 * Free images from Lorem Picsum (https://picsum.photos)
 */