Start local DynamoDB: java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb from ~
List tables: aws dynamodb list-tables --endpoint-url http://localhost:8000

aws dynamodb create-table \
    --table-name Products \
    --attribute-definitions AttributeName=pid,AttributeType=S \
    --key-schema AttributeName=pid,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --endpoint-url http://localhost:8000

aws dynamodb update-item \
--table-name RecentOrders \
--key '{"user_id": {"S": "d4d8c4d8-b021-702a-4449-babdec3b114f"}}' \
--update-expression "SET orders = :o" \
--expression-attribute-values file://recentOrders2.json \
--endpoint-url http://localhost:8000

aws dynamodb get-item \   
--table-name RecentOrders \
--key '{"user_id": {"S": "d4d8c4d8-b021-702a-4449-babdec3b114f"}}' \
--endpoint-url http://localhost:8000 \ 
--output json > recentOrders.json 