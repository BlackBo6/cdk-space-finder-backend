import { Stack } from "aws-cdk-lib"
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb"





export class GenericTable {
    private name: string
    private primaryKey: string
    private stack: Stack
    private table: Table

    public constructor(name: string, primarykey: string, stack: Stack) {
        this.name = name;
        this.primaryKey = primarykey;
        this.stack = stack;
        this.initialize()
    }


    public initialize() {
        this.createTable();
    }

    private createTable() {
        this.table = new Table(this.stack, this.name, {
            partitionKey: {
                name: this.name,
                type: AttributeType.STRING
            },
            tableName: this.name
        })
    }
}