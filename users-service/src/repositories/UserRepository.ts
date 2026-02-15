import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { IUserRepository } from "../services/ports/IUserRepository";
import { User } from "../entities/User";
import { UserMapper, UserDbItem } from "../mappers/UserMapper";

export class UserRepository implements IUserRepository {
    private tableName = process.env.USERS_TABLE!;
    private docClient: DynamoDBDocumentClient;

    constructor() {
        const client = new DynamoDBClient({});
        this.docClient = DynamoDBDocumentClient.from(client, {
            marshallOptions: { removeUndefinedValues: true }
        });
    }

    async createUser(user: User): Promise<User> {
        await this.docClient.send(
            new PutCommand({
                TableName: this.tableName,
                Item: UserMapper.toPersistence(user),
                ConditionExpression: "attribute_not_exists(email)", 
            })
        );

        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const result = await this.docClient.send(
            new GetCommand({
                TableName: this.tableName,
                Key: { email },
            })
        );

        if (!result.Item) return null;

        const item: UserDbItem = result.Item as UserDbItem;
        
        return UserMapper.toDomain(item);
    }
}
