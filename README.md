<div align="center">
<h1 align="center" style="border: 0;"> Ecometer </h1>
<p>Collect energy data from user to calculate energy consumption</p>
</div>

# Project Structure

The application includes the backend of the application in below structure:

```bash
├── src
├── docker-compose.yml
...
..
```

# Running The Application

Please make sure you have the env file ready, you can find the sample in `server/.env.dist`.

As everything is dockerized, run the below docker command and the application will be ready to use:

```bash
docker compose up
```

The backend server: http://localhost:8080

# Unit Tests

```bash
yarn test
```

# API Endpoints

There are in total 2 endpoints available and are exposed as follows:

| Method | Path                             | Description                                                         |
| ------ | -------------------------------- | ------------------------------------------------------------------- |
| `GET`  | `/api/v1/forms/:formName`        | Gets the form structure of the given form                           |
| `POST` | `/api/v1/forms/:formName/submit` | Creates user and energy reading data on database for the given form |

`GET /api/v1/forms/:formName`

Fetches the form structure of `formName`.

```
curl --request GET \
--url "http://localhost:8080/api/v1/forms/{my-form-name}"
```

`POST /api/v1/forms/:formName/submit`

Creates the data of user and energy reading

```
curl --request POST \
--url "http://localhost:8080/api/v1/forms/{my-form-name}/submit" \
--data '{
    "energyInfo": {
        "buildingType": "residential",
        "numberOfResidential": 1,
        "serialNumber": "123A1B2C",
        "type": "electricity",
        "reading": 6531231,
        "city": "Berlin",
        "zip": "12345",
        "termsAndConditions": true
    },
    "user": {
        "firstName": "Ashish",
        "lastName": "Yadav",
        "phoneNumber": "21435657",
        "email": "example@gmail.com"
    }
}'
```
