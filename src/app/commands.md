Start local DynamoDB: java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb from ~
List tables: aws dynamodb list-tables --endpoint-url http://localhost:8000

aws dynamodb create-table \
    --table-name Products \
    --attribute-definitions AttributeName=pid,AttributeType=S \
    --key-schema AttributeName=pid,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --endpoint-url http://localhost:8000