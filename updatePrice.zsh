#!/bin/zsh

TABLE_NAME="Products"

cat products.json | jq -c '.Items[]' | while read item; do
    pid=$(echo $item | jq -r '.pid.S')
    price_str=$(echo $item | jq -r '.price.S')

    echo "Raw price string: $price_str"
    
    price=$(echo $price_str | sed 's/\$//g' | sed 's/,//g')
    echo "Processed price: $price"
    
    if [[ $price =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
        aws dynamodb update-item \
            --table-name "$TABLE_NAME" \
            --key '{"pid": {"S": "'$pid'"}}' \
            --update-expression "SET price = :price" \
            --expression-attribute-values '{":price": {"N": "'$price'"}}' \
            --return-values "UPDATED_NEW" \
            --endpoint-url "http://localhost:8000"
        
        echo "Updated product with pid $pid to price $price"
    else
        echo "Invalid price for product $pid: $price_str"
    fi
    echo "----"
done
