import { IEmployee } from "../types";

export const mockData: { data: IEmployee[] } = {
    data: [
        {
            firstName: "John",
            lastName: "Doe",
            dateOfBirth: "1990-01-01",
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            startDate: "2020-01-01",
            department: "HR",
        }
    ],
};