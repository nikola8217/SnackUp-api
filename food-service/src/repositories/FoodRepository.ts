import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { IFoodRepository } from "../services/ports/IFoodRepository";
import { Food } from "../entities/Food";
import { FoodMapper, FoodDbItem } from "../mappers/FoodMapper";

export class FoodRepository implements IFoodRepository {
    private tableName = process.env.FOOD_TABLE!;
    private docClient: DynamoDBDocumentClient;

    constructor() {
        const client = new DynamoDBClient({});
        this.docClient = DynamoDBDocumentClient.from(client, {
            marshallOptions: { removeUndefinedValues: true }
        });
    }

    async createFood(food: Food): Promise<Food> {
        await this.docClient.send(
            new PutCommand({
                TableName: this.tableName,
                Item: FoodMapper.toPersistence(food),
                ConditionExpression: "attribute_not_exists(foodName)", 
            })
        );

        return food;
    }
}
