### FEATURES
## Current:
1. A section that displays all the filtered products in a box
    1. Image
    2. Name
    3. Rating
    4. Votes
    5. Price
    6. Category
    7. Description
2. Navbar
    1. Logo
    2. Non-functional Profile
    3. Some Filters
    4. Functional search bar
    5. Creating a product
3. APIs
    1. All products
    2. Filtering products by category
    3. Filtering products by product ID
    4. Filtering products by keywords through search
    5. Creating a product
4. Classes
    1. Product - Represents a product. Contains toJSON and fromJSON methods
5. A Product page for each product using product id
6. Database: DynamoDB
7. User Authentication: AWS Cognito

## Next:
1. Pagination and more products (n=20 products a page, general query returns items-a-page and num-pages)
2. Profile page
3. Shopping cart and adding to cart
4. Checkout (using Stripe)
5. More filters
6. Sorting
7. Personal Recommendations
8. Allow mini-view of entire product page on listing page
9. Themes
10. BUG FIX: Tag and search
11. BUG FIX: Add lowercase name, desc to Product to enable case-insensitive search. Change searchTerm to lowercase
12. API for login, signup

## Tech stack:
1. NextJS
2. TypeScript
3. AWS DynamoDB
4. AWS Cognito
5. Tailwind CSS