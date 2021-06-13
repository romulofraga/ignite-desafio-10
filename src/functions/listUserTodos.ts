import { APIGatewayProxyHandler } from "aws-lambda";
// import { AWSError } from "aws-sdk";
// import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { document } from "src/util/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;

  const params = {
    TableName: "users_todos",
    FilterExpression: "#user_id = :userid",
    ExpressionAttributeNames: {
      "#user_id": "user_id",
    },
    ExpressionAttributeValues: { ":userid": userid }
  };

  const response = await document.scan(params).promise()

  const todos = response.Items

  // let count = 0;

  // function onScan(err: AWSError, data: DocumentClient.ScanOutput) {
  //   if (err) {
  //     console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
  //   } else {
  //     console.log("Scan succeeded.");
  //     data.Items.forEach(function (itemdata) {
  //       console.log("Item :", ++count, JSON.stringify(itemdata));
  //     });
  //   }
  // }

  return {
    headers: {
      "Content-Type": "application/json"
    },
    statusCode: 200,
    body: JSON.stringify({
      todos
    })
  }

}