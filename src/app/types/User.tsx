export default class User {
    user_id: string;
    email: string;
    address: string;
    birthdate: string;
    given_name: string;
    family_name: string;
    created_at: number;


    constructor(user_id: string, email: string, address: string, birthdate: string, given_name: string, family_name: string) {
        this.user_id = user_id;
        this.email = email;
        this.address = address;
        this.birthdate = birthdate;
        this.given_name = given_name;
        this.family_name = family_name;
        this.created_at = Date.UTC(Date.now());
    }
    

}