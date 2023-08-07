/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  InvokeCommand,
  LambdaClient,
  LogType,
  fromRole,
} from "@aws-sdk/client-lambda";

const REGION = "ap-southeast-1";
const ROLE_ARN = "arn:aws:iam::123456789012:role/lambda-role";

/** snippet-start:[javascript.v3.lambda.actions.Invoke] */
const invoke = async (funcName, invocationType, payload) => {
  const roleCredentials = fromRole(ROLE_ARN);
  const client = new LambdaClient({
    region: REGION,
    credentials: roleCredentials,
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
/** snippet-end:[javascript.v3.lambda.actions.Invoke] */

export { invoke };
