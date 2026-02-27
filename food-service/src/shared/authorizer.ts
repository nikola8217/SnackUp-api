import { APIGatewayRequestAuthorizerEventV2 } from "aws-lambda";
import jwt from "jsonwebtoken";

type SimpleAuthorizerResult = {
    isAuthorized: boolean;
};

export const handler = async (
  event: APIGatewayRequestAuthorizerEventV2
): Promise<SimpleAuthorizerResult> => {
    try {
        const authHeader = event.headers?.authorization;

        if (!authHeader) {
            return { isAuthorized: false };
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as { id: string; role: string };

        if (decoded.role !== "Admin") {
            return { isAuthorized: false };
        }

        return {
            isAuthorized: true
        };

    } catch {
        return { isAuthorized: false };
    }
};
