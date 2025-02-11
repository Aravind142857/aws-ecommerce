// import { v4 as uuidv4 } from 'uuid';
export default class Product {
    pid: string;
    name: string;
    desc: string;
    price: number;
    img: string;
    rating: number;
    votes: number;
    category: string;
    lowercase_description: string;

    constructor(pid: string, name: string, desc:string, price: number, img: string, rating: number, votes: number, category: string) {
        this.pid = pid;//uuidv4();
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.img = img;
        this.rating = rating;
        this.votes = votes;
        this.category = category;
        this.lowercase_description = desc.toLowerCase().replaceAll(/[^a-z0-9\s]/g, '');
    }
    toPlainObject() {
        return {
          pid: this.pid,
          name: this.name,
          desc: this.desc,
          price: this.price,
          img: this.img,
          rating: this.rating,
          votes: this.votes,
          category: this.category,
          lowercase_description: this.lowercase_description
        };
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
            category: product.category,
            lowercase_description: product.lowercase_description
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
            product.category,
        ));
    }
    static fromDynamoItem(item: Record<string, any>): Product { 
        return new Product(
          item.pid.S,
          item.name.S,
          item.desc.S,
          Number(item.price.N),
          item.img.S,
          Number(item.rating.N),
          Number(item.votes.N),
          item.category.S
        );
      }
      static fromDynamoItems(items: Record<string, any>[]): Product[] {
        return items.map((item) => Product.fromDynamoItem(item));
      }
      
      
}
// Add LowerCase()
