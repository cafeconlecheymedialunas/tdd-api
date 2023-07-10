import fs from 'fs';
export type BasicExpression = {
    key: string;
    operation: "greater_than" | "less_than" | "equal" | "starts_with" | "contains",
    value: string | number;
}
export class MockRepository {

    generateId(): number {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000000);
        const uniqueNumber = timestamp + random;
        return uniqueNumber;
    }
    evaluateExpression(expression: BasicExpression, obj: any): boolean {
        const { key, operation, value } = expression;
        const propValue = obj[key]
        switch (operation) {
            case "greater_than": return propValue > value;
            case "less_than": return propValue < value;
            case "contains": return new RegExp(value + "").test(propValue + "")
            case "starts_with": return new RegExp("^" + value + "").test(propValue + "")
            case "equal":
            default:
                return propValue === value;
        }
    }
    async readFile(fileName: string): Promise<any[]> {
        try {

            const filePath = `${__dirname}/${fileName}.json`
            console.log(filePath)
            const data = await fs.promises.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer el archivo de usuarios:', error);
            throw error;
        }
    }

    async writeFile(fileName: string, data: any[]): Promise<void> {
        try {
            const filePath = `${__dirname}/${fileName}.json`
            await fs.promises.writeFile(filePath, JSON.stringify(data));
        } catch (error) {
            console.error('Error al escribir en el archivo de usuarios:', error);
            throw error;
        }
    }
}