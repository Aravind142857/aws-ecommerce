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
    2. Profile
    3. Some Filters
    4. Functional search bar
    5. Creating a product
3. APIs
    1. All products
    2. Filtering products by category
    3. Filtering products by product ID
    4. Filtering products by keywords through search
    5. Creating a product
    6. Creating a user
    7. Obtaining a user by user ID
    8. Obtain Shopping Cart by user ID
    9. Add to Shopping Cart
    10. Delete from Shopping Cart
4. Classes
    1. Product - Represents a product.
    2. User - Represents a user.
5. A Product page for each product using product id
6. Database: DynamoDB
7. User Authentication: AWS Cognito
8. Profile page with address using user id
9. Shopping Cart
10. Checkout using Stripe
11. Single-page sort
12. Recent Orders

## Next:
1. Pagination and more products (n=20 products a page, general query returns items-a-page and num-pages)
2. More filters
3. Personal Recommendations
4. Allow mini-view of entire product page on listing page
5. Themes
6. BUG FIX: Tag and search
7. BUG FIX: Add lowercase name, desc to Product to enable case-insensitive search. Change searchTerm to lowercase
8. API for login, signup
9. BUG FIX: Float error, loc: Cart, desc: (20 + 20 + 19.99 ?= 59.989999999999995)
10. Cleanup API directory.
11. Design Payment cancel page
12. ToolTip
13. Rate and Review
14. Clean up and redesign recent orders

## Tech stack:
1. NextJS
2. TypeScript
3. AWS DynamoDB
4. AWS Cognito
5. Tailwind CSS
6. Stripe