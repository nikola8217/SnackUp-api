import { injectable } from 'tsyringe';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { IFoodRepository } from "../../business/ports/IFoodRepository";
import { Food } from "../../core/entities/Food";
import { FoodMapper, FoodDbItem } from "../mappers/FoodMapper";

@injectable()
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
                Item: FoodMapper.toPersistence(food) 
            })
        );

        return food;
    }

    async getFoodById(id: string): Promise<Food | null> {
        const result = await this.docClient.send(
            new GetCommand({
                TableName: this.tableName,
                Key: {
                    id: id
                }
            })
        );

        if (!result.Item) {
            return null;
        }

        return FoodMapper.toDomain(result.Item as FoodDbItem);
    }

    async getAllFoods(): Promise<Food[]> {
        const result = await this.docClient.send(
            new ScanCommand({
                TableName: this.tableName
            })
        );

        return (result.Items ?? []).map(item => FoodMapper.toDomain(item as FoodDbItem));
    }

    async getFoodsByCategoryId(categoryId: string): Promise<Food[]> {
        const result = await this.docClient.send(
            new QueryCommand({
                TableName: this.tableName,
                IndexName: 'CategoryIdIndex',
                KeyConditionExpression: 'categoryId = :categoryId',
                ExpressionAttributeValues: {
                    ':categoryId': categoryId
                }
            })
        );

        return (result.Items ?? []).map(item => FoodMapper.toDomain(item as FoodDbItem));
    }

    async updateFood(food: Food): Promise<Food> {
        const result = await this.docClient.send(
            new UpdateCommand({
                TableName: this.tableName,
                Key: { id: food.id },
                UpdateExpression: "set foodName = :foodName, description = :description, price = :price, imageUrl = :imageUrl, categoryId = :categoryId",
                ExpressionAttributeValues: {
                    ":foodName": food.foodName,
                    ":description": food.description,
                    ":price": food.price,
                    ":imageUrl": food.imageUrl,
                    ":categoryId": food.categoryId
                },
                ConditionExpression: "attribute_exists(id)",
                ReturnValues: "ALL_NEW"
            })
        );

        return FoodMapper.toDomain(result.Attributes as FoodDbItem);
    }

    async deleteFood(id: string): Promise<void> {
        await this.docClient.send(
            new DeleteCommand({
                TableName: this.tableName,
                Key: { id },
                ConditionExpression: "attribute_exists(id)" 
            })
        );
    }
}
