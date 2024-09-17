
# eCard Backend

Ecard project has been developed by students from DigitalUR student organization from University of Rwanda.

## About eCard

eCard is a digital student ID system that relies on MOSIP technology. It combines foundational information from the MOSIP database with academic data from university databases to address issues posed by traditional plastic or paper cards:

- Difficulty in replacing lost cards.
- Delayed student card provisions.
- Denial of services due to lost or outdated cards.
- Lack of digital integration.
- High manufacturing cost.

## How eCard Works

eCard requests data from two sources:

1. **Foundational Data:** Requested from MOSIP.
2. **Academic Data:** Fetched from the university database.
3. **Data Merging:** Data is merged according to UIN (personal unique ID) and rendered to the interface.

In our project, we used a use-case scenario at our University of Rwanda (UR). We also used dummy data for students registered in MOSIP mock data. You can find them at [MOSIP Mock Data](https://docs.esignet.io/try-it-out/using-mock-data). Use UIN `2047631038` and OTP `111111` for testing.

## Project Applications

This project contains two applications:

1. **eCard:** This application helps students view their online student card, showing both foundational and academic information.
   - [eCard Prototype](https://ecard-mosip.vercel.app/auth)

2. **Relying Demo App:** This app demonstrates how eCard can be used by third-party applications to recognize individuals as students. It allows students to sign up using eCard, providing an alternative to student emails.
   - [Relying App Demo Prototype](https://ecard-relying-demo.vercel.app/auth)
   - [Frontend Repository](https://github.com/DigitalUR/ecard_mosip)

## Technologies & Languages

Our project is developed in JavaScript, using:

- **Frontend:** React
- **Backend:** Node.js (Express)
- **Database:** MySQL

## Repositories

- [Demo Frontend](https://github.com/DigitalUR/ecard-relying-demo)
- [Backend](https://github.com/DigitalUR/ecard_backend)
  - N.B: The backend serves both eCard and relying application demo.

## How to Install the Project

### Requirements

1. Node.js should be installed.
2. MySQL Workbench should be installed.

### Installing Node.js Project

1. Clone the project from the aforementioned links.
2. Run `npm install` to install all packages.
3. Set environment variables (request env variables from the Dev team at so.digitalur@gmail.com).

### Installing Database

1. Open MySQL and create a new connection.
2. Connect to the remote instance using:
   - Host: `intumwa.ct44ukewaho0.eu-north-1.rds.amazonaws.com`
   - Port: `3306`
   - Contact the Dev team at the aforementioned email to get the password or a copy of the database.

## Hosting Platforms

- **Frontend:** Vercel
- **Backend:** Render

## Contact

For further help, please contact us at: so.digitalur@gmail.com
