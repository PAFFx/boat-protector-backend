# Boat Protector Backend

CPE Embedded 2023 Project. Aim to report boat emergency situation(SOS, boat sink) and location for immediate help.

โครงการนี้เป็นส่วนหนี่งของโปรเจควิชา Embedded ภาควิชาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเกษตรศาสตร์ ปีการศึกษา 2023
โปรเจคนี้มีเป้าหมายเพื่อช่วยแจ้งเหตุการณ์ และตำแหน่งของเหตุฉุกเฉินที่เกิดขึ้นกับเรือเล็ก เพื่อความรวดเร็วในการเข้าช่วยเหลือ

# จัดทำโดย

นายบารมี ปัญญาเฟือน

นายจิตตบุญ บรรเริงศรี

นายมติ วรสิงห์

นายมหัศจรรย์ สถาพรวานิชย์

นายอนวัช มูลมณี

## Require(สิ่งที่จำเป็น)

-   node & npm
-   docker & docker-compose

## Initialize(เริ่มต้นโปรเจ็ค)

```
 npm init

 npm install
```

To start local mongo container `docker-compose up -d`

create your secret `.env` file based on `.example.env`

|

สำหรับการสร้าง Mongo Database แบบ local โดยใช้ docker `docker-compose up -d`

สร้างไฟล์สำหรับเก็บข้อมูลบางส่วยที่เป็นความลับให้สร้างไฟล์ `.env` โดยยึดรูปแบบตาม `.example.env`

## Scripts

To start server use `npm run start`

To start dev server(Auto update on edit) use `npm run dev`

To build JS src code (In dist dir) use `npm run build`

|

สำหรับเริ่ม server ใช้ `npm run start`

สำหรับเริ่ม server สำหรับพัฒนา(เปลี่ยนอัตโนมัติเมื่อเปลี่ยนโค้ด) ใช้ `npm run dev`

สำหรับสร้างโค้ด JS (ถูกเก็บในไดเรคทอรี่ dist) ใช้ `npm run build`
