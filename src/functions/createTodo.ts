import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/util/dynamodbClient";
import { v4 } from "uuid";



export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body);

  await document.put({
    TableName: "users_todos",
    Item: {
      id: v4(),
      user_id: userid,
      title,
      done: false,
      deadline: new Date(deadline)
    }
  }).promise();

  return {
    headers: {
      "Content-Type": "application/json"
    },
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created!"
    })
  }
}
