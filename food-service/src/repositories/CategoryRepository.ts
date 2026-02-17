import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, ScanCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
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
                IndexName: "CategoryNameIndex", 
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

    async getAllCategories(): Promise<Category[]> {
        const result = await this.docClient.send(
            new ScanCommand({
                TableName: this.tableName,
            })
        );

        if (!result.Items || result.Items.length === 0) {
            return [];
        }

        return result.Items.map(item =>
            CategoryMapper.toDomain(item as CategoryDbItem)
        );
    }

    async getCategoryById(id: string): Promise<Category | null> {
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

        return CategoryMapper.toDomain(result.Item as CategoryDbItem);
    }

    async updateCategory(category: Category): Promise<Category> {
        await this.docClient.send(
            new UpdateCommand({
                TableName: this.tableName,
                Key: { id: category.id },
                UpdateExpression: "set categoryName = :categoryName",
                ExpressionAttributeValues: {
                    ":categoryName": category.categoryName
                },
                ConditionExpression: "attribute_exists(id)", 
                ReturnValues: "ALL_NEW" 
            })
        );

        return category;
    }

    async deleteCategory(id: string): Promise<void> {
        await this.docClient.send(
            new DeleteCommand({
                TableName: this.tableName,
                Key: { id },
                ConditionExpression: "attribute_exists(id)" 
            })
        );
    }
}
