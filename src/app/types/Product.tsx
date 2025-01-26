import { v4 as uuidv4 } from 'uuid';
export default class Product {
    pid: string;
    name: string;
    desc: string;
    price: string;
    img: string;
    rating: number;
    votes: number;
    category: string;

    constructor(pid: string, name: string, desc:string, price: string, img: string, rating: number, votes: number, category: string) {
        this.pid = pid;//uuidv4();
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.img = img;
        this.rating = rating;
        this.votes = votes;
        this.category = category;
    }
    
    static toJSON(products: Product[]): string {
        return JSON.stringify(products.map((product) => ({
            pid: product.pid,
            name: product.name,
            desc: product.desc,
            price: product.price,
            img: product.img,
            rating: product.rating,
            votes: product.votes,
            category: product.category
        })));
    }

    static fromJSON(products: string): Product[] {
        const parsedProducts: any[] = JSON.parse(products);
        return parsedProducts.map((product) => new Product(
            product.pid,
            product.name,
            product.desc,
            product.price,
            product.img,
            product.rating,
            product.votes,
            product.category
        ));
    }
}