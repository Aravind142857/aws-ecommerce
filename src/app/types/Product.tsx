export default class Product {
    name: String;
    price: String;
    img: String | null;
    rating: Number;
    votes: Number;
    category: String;

    constructor(name: String, price: String, img: String|null, rating: Number, votes: Number, category: String) {
        this.name = name;
        this.price = price;
        this.img = img;
        this.rating = rating;
        this.votes = votes;
        this.category = category;
    }
}