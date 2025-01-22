import Product from "../types/Product"
export default function ProductListing() {

    const items = [
        new Product("iPad", "$700.00", null, 4.5, 1000, "Technology"),
        new Product("dress", "$89.49", null, 4.9, 3000, "Clothing"),
        new Product("t-shirt", "$19.99", null, 3.8, 385, "Clothing"),
        new Product("Pepsi", "$1.99", null, 4.2, 11536, "Food and beverage"),
        new Product("Dear Eddie", "$20.00", null, 4.9, 1004, "Books"),
        new Product("Das Capital - Karl Marx", "$26.00", null, 4.5, 1914, "Books"),
      ]

    return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-flow-row ">
        {items.map((product, idx) => (
          <div key={idx} className="border-4 border-white p-2 m-2">
            <img src={product.img?.toString()} alt="Placeholder" />
            <h1 className="text-4xl text-center">{product.name}</h1>
            <span className="flex justify-between"><p className="font-bold">{product.price}</p><p>{product.rating.toString()} / 5</p><p>{product.votes.toString()}</p></span>
            <p className="text-center">{product.category}</p>
          </div>
        ))}
      </div>
    )
}