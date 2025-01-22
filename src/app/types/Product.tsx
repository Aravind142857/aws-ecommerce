export default class Product {
    name: string;
    price: string;
    img: string;
    rating: number;
    votes: number;
    category: string;

    constructor(name: string, price: string, img: string, rating: number, votes: number, category: string) {
        this.name = name;
        this.price = price;
        this.img = img;
        this.rating = rating;
        this.votes = votes;
        this.category = category;
    }
}