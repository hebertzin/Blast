import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../env";

export const s3 = new S3Client({
  credentials: {
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_KEY,
  },
  region: "region",
});
