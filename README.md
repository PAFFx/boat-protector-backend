# Boat Protector Backend

CPE Embedded 2023 Project. Aim to report boat emergency situation(SOS, boat sink) and location for immediate help.

## Require

-   node & npm
-   docker & docker-compose

## Initialize

```
 npm init

 npm install

```

To start local mongo container `docker-compose up -d`

create your secret `.env` file based on `.example.env`

## Scripts

To start server use `npm run start`

To start dev server(Auto update on edit) use `npm run dev`

To build JS src code (In dist dir) use `npm run build`
