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

aws dynamodb update-item \
  --table-name Products \
  --key '{"pid": {"S": "a4921856-09e4-411e-85b4-57d7cade75e1"}}' \
  --update-expression "SET lowercase_description = :lowercase_desc" \
  --expression-attribute-values '{":lowercase_desc": {"S": "women mock neck ribbed bodycon dress long sleeve mini pencil dresses"}}' \
  --return-values ALL_NEW \
  --endpoint-url http://localhost:8000
