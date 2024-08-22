import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Readable } from "stream";

@Injectable()
export class MinioService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      endpoint: process.env.MINIO_ENDPOINT,
      region: process.env.MINIO_REGION,
      credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY,
        secretAccessKey: process.env.MINIO_SECRET_KEY,
      },
      forcePathStyle: true, // Используется для MinIO
    });
  }

  async uploadAvatar(userId: string, file: Buffer) {
    const command = new PutObjectCommand({
      Bucket: "avatars",
      Key: userId,
      Body: file,
    });

    await this.s3Client.send(command);
    return "OK";
  }

  async getAvatar(userId: string): Promise<Readable> {
    try {
      const command = new GetObjectCommand({
        Bucket: "avatars",
        Key: userId,
      });
      const avatar = await this.s3Client.send(command);
      return avatar.Body as Readable;
    } catch {
      const command = new GetObjectCommand({
        Bucket: "avatars",
        Key: "default.png",
      });
      const avatar = await this.s3Client.send(command);
      return avatar.Body as Readable;
    }
  }
}
