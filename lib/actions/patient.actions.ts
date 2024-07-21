import { Code } from "lucide-react";
import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "@/libs/utils";

// USER CREATION
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return newUser;
  } catch (error: any) {
    if (error && error?.Code == 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);

      return documents?.users[0];
      console.log(error);
    }
    console.error("An error occurred while creating a new user:", error.stack);
  }
};

// GETTING USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};
