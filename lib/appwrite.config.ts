import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("669684da0036abc17bb3")
  .setKey(
    "eba99bc77a8c1f0b094ac3cd0f3177e75384cb4b1a3e9c3cde666c4daeff96b22fb27dd08ca4f54a5c83cd8fcdd5f52d9d1c3e92d2f801057f7177bb4e14c0cbdf7a0265b609fa1c0976b267b09da312ebae5f5ab8102149b27902b68013fa469202ba9dcfd5f9b4d8d97b8399a044ca0b67fee5c1fee26e928b0af77b722bfb"
  );

export const database = new sdk.Databases(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
