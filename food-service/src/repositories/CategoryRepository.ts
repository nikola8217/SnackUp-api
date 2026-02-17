import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { ICategoryRepository } from "../services/ports/ICategoryRepository";
import { Category } from "../entities/Category";
import { CategoryMapper, CategoryDbItem } from "../mappers/CategoryMapper";

export class CategoryRepository implements ICategoryRepository {
    private tableName = process.env.CATEGORIES_TABLE!;
    private docClient: DynamoDBDocumentClient;

    constructor() {
        const client = new DynamoDBClient({});
        this.docClient = DynamoDBDocumentClient.from(client, {
            marshallOptions: { removeUndefinedValues: true }
        });
    }

    async createCategory(category: Category): Promise<Category> {
        await this.docClient.send(
            new PutCommand({
                TableName: this.tableName,
                Item: CategoryMapper.toPersistence(category),
                ConditionExpression: "attribute_not_exists(categoryName)", 
            })
        );

        return category;
    }

    async getCategoryByName(categoryName: string): Promise<Category | null> {
        const result = await this.docClient.send(
            new QueryCommand({
                TableName: this.tableName,
                IndexName: "CategoryNameIndex", // Proveri da li se u serverless.yml IndexName i dalje zove ovako
                KeyConditionExpression: "categoryName = :categoryName",
                ExpressionAttributeValues: {
                    ":categoryName": categoryName
                },
                Limit: 1 
            })
        );

        if (!result.Items || result.Items.length === 0) {
            return null;
        }

        const item = result.Items[0] as CategoryDbItem;
        
        return CategoryMapper.toDomain(item);
    }
}
