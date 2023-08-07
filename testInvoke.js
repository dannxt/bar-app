const {
  InvokeCommand,
  LambdaClient,
  LogType,
} = require("@aws-sdk/client-lambda");

const REGION = "ap-southeast-1";
const ROLE_ARN = "arn:aws:iam::123456789012:role/lambda-role";

/** snippet-start:[javascript.v3.lambda.actions.Invoke] */
const invoke = async (funcName, invocationType, payload) => {
  const client = new LambdaClient({
    region: REGION,
  });
  const command = new InvokeCommand({
    FunctionName: funcName,
    InvocationType: invocationType,
    Payload: JSON.stringify(payload),
    LogType: LogType.Tail,
  });

  const { Payload, LogResult } = await client.send(command);
  const result = Buffer.from(Payload).toString();
  const logs = Buffer.from(LogResult, "base64").toString();
  return { logs, result };
};

const input = "BPBPBPBPBPBBBPBPBPBPPBPB";

async function callSearchRouteData() {
  console.log(await invoke("searchRouteData", "RequestResponse", input));
}
callSearchRouteData();
