import Product from "../types/Product";

export const allItems = [
    new Product('12133495-7d08-47eb-b1eb-23c94c40354a', "iPad", "(10th Generation): with A14 Bionic chip, 10.9-inch Liquid Retina Display, 64GB, Wi-Fi 6, 12MP front/12MP Back Camera, Touch ID, All-Day Battery Life – Blue", "$700.00", "https://picsum.photos/seed/picsum/400/300", 4.5, 1000, "Technology"),
    new Product('baf1adb6-35d2-4315-bc8e-9349317b1f2a', "dress", "Women Mock Neck Ribbed Bodycon Dress Long Sleeve Mini Pencil Dresses", "$89.49", "https://picsum.photos/seed/brady/400/300", 4.9, 3000, "Clothing"),
    new Product('f12d16a3-0e4e-4e5c-9e03-a327f0599c80', "t-shirt", "Men's Cotton, Moisture-Wicking Crew Tee Undershirts, Multi-Packs Available", "$19.99", "https://picsum.photos/seed/kendrick/400/300", 3.8, 385, "Clothing"),
    new Product('484ef9aa-e081-4246-b4e1-8f27c1103fef', "Pepsi", "Pepsi Soda, 7.5 Ounce Mini Cans, (10 Pack) (Packaging May Vary)", "$1.99", "https://picsum.photos/seed/mbappe/400/300", 4.2, 11536, "Food and Beverages"),
    new Product('17b0fa51-9b18-4fb9-9d03-184ca0838ae5', "Dear Edward", "Dear Edward: A Read with Jenna Pick: A Novel", "$20.00", "https://picsum.photos/seed/phil/400/300", 4.9, 1004, "Books"),
    new Product('55c1cefb-7f6b-420d-8a2d-be0472ae6e39', "Das Capital - Karl Marx", "Capital (Das Capital): Includes Vol.1,2,3", "$26.00", "https://picsum.photos/seed/diaz/400/300", 4.5, 1914, "Books"),
];

export function addProduct(product: Product) {
    allItems.push(product);
}

