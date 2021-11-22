import {HttpException, Injectable} from '@nestjs/common';
import * as AWS from 'aws-sdk'
import {v4} from 'uuid'
@Injectable()
export class FileService {
    private bucket = process.env.DO_SPACE_BUCKET;
    private endpoint = new AWS.Endpoint(process.env.DO_SPACE_ENDPOINT)
    private s3 = new AWS.S3({
        endpoint:this.endpoint,
        secretAccessKey:process.env.DO_SPACE_SECRET_KEY,accessKeyId:process.env.DO_SPACE_ACCESS_KEY})

    async uploadFile(file):Promise<string>{
        let fileName = v4();
        const {originalname} = file
        const format = originalname.split('.')
        fileName= fileName + '.' + format[format.length-1]
        await this.s3_upload(file.buffer,this.bucket,fileName,file.mimetype)
        return fileName
    }
    private async s3_upload(file,bucket,name,mimeType){
           const params = {
               Bucket:bucket,
               Key:`${name}`,
               Body:file,
               ACL: "public-read",
               ContentType: mimeType,
               ContentDisposition:"inline",
               CreateBucketConfiguration:
                   {
                       LocationConstraint: "ap-south-1"
                   }
           };
           try {
              let s3Response = await this.s3.upload(params).promise()
               console.log(s3Response)
           }catch (e) {
               console.log(e)
           }
    }
    async deleteFile(key:string){
        try {
            await this.s3.deleteObject({
                Bucket:String(this.bucket),
                Key:key
            })
        }catch (e) {
            console.log(e)
        }
    }
}
