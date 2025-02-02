export default class User {
    user_id: string;
    email: string;
    address: string;
    birthdate: string;
    given_name: string;
    family_name: string;
    created_at: number;


    constructor(user_id: string, email: string, address: string, birthdate: string, given_name: string, family_name: string, created_at: number) {
        this.user_id = user_id;
        this.email = email;
        this.address = address;
        this.birthdate = birthdate;
        this.given_name = given_name;
        this.family_name = family_name;
        this.created_at = created_at;
    }
    getUser() {
        return {
            user_id: this.user_id,
            email: this.email,
            address: this.address,
            birthdate: this.birthdate,
            given_name: this.given_name,
            family_name: this.family_name,
            created_at: this.created_at
        }
    }
    static fromDynamoItem(item: Record<string, any>): User {
        return new User(
            item.user_id.S,
            item.email.S,
            item.address.S,
            item.birthdate.S,
            item.given_name.S,
            item.family_name.S,
            parseInt(item.created_at)
        );
    }
    static fromDynamoItems(items: Record<string, any>[]): User[] {
        return items.map((item) => User.fromDynamoItem(item));
    }
}