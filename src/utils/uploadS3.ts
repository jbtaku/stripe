import { Credentials } from "aws-sdk";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const uploadS3 = async (file: File, name: string) => {
  const accessKeyId = process.env.NEXT_PUBLIC_S3_ACCESS_KEY;
  const secretAccessKey = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY;
  const creds = new Credentials(
    accessKeyId as string,
    secretAccessKey as string
  );

  try {
    const client = new S3Client({
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      credentials: creds,
    });

    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
      Key: name,
      Body: file,
      ContentType: file.type,
      ACL: "public-read",
    });
    await client.send(command);
  } catch (e) {
    console.log(e);
  }
};
