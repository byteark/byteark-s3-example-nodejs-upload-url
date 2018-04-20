# ByteArk S3 Example - NodeJS Upload URL

ตัวอย่างนี้จะแนะนำวิธีการสร้าง URL เพื่อให้ไคลเอนต์ (เช่น เว็บเบราว์เซอร์ หรือแอพลิเคชัน) สามารถอัพโหลดไฟล์เข้าสู่ ByteArk S3 ได้โดยไม่ต้องผ่านเซิฟเวอร์ของท่าน

## วิธีการติดตั้งและรันตัวอย่าง

1. แก้ไขไฟล์ `config.js` เพื่อระบุ accessKeyId และ secretAccessKey
    ```js
    const accessKeyId = 'accessKeyId'
    const secretAccessKey = 'secretAccessKey'
    ```
2. รันสคริปท์เพื่อเริ่มเซิฟเวอร์
    ```sh
    npm install
    npm run start
    ```

## กระบวนการทำงานของระบบ

1. ไคลเอนต์เรียกมาที่เซิฟเวอร์ของท่านด้วยวิธีใดก็ได้ (เช่น HTTP POST method) เพื่อขอ URL สำหรับอัพโหลดไฟล์ (ในตัวอย่างนี้สร้าง API ไว้ที่ POST /api/uploads โดยรับพารามิเตอร์ผ่าน JSON Body เช่น)
    ```json
    {
      "fileName": "hello.txt",
      "contentType": "text-plain"
    }
    ```
2. เซิฟเวอร์สร้าง URL สำหรับอัพโหลดไฟล์และตอบ URL ดังกล่าวกลับไป โดยในกระบวนการสร้างจะต้องกำหนด
    * Content-Type ของไฟล์
    * สิทธิ์การเข้าถึงไฟล์ (x-amz-acl: public-read|private)
3. ไคลเอนต์อัพโหลดไฟล์โดยใช้ HTTP PUT Method ไปยัง URL ที่ระบุในข้อ 2 โดยจะต้องระบุ HTTP Header ต่อไปนี้ให้ตรงกับที่เซิฟเวอร์ระบุในข้อ 2
    * Content-Type
    * x-amz-acl

## ไลบรารีที่ต้องใช้

* [aws-sdk](https://npmjs.com/package/aws-sdk)
