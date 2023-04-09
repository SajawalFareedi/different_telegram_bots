const fetch = require("node-fetch").default;


const getData = async () => {
    try {
        // const data = await fetch("http://localhost:300/data", { method: "GET", headers: { "content-type": "application/json" } });
        // return await data.json();

        return {
            "id": "123456789",
            "firstName": "xyz",
            "lastName": "abc",
            "dob": {
                "day": "01",
                "month": "01",
                "year": "2000"
            },
            "gender": "M",
            "ssn": "123-45-6789",
            "address": {
                "street": "123 Main St",
                "city": "Anytown",
                "state": "NY",
                "zip": "12345"
            },
            "dl": "123232323",
            "phone": "1234567890",
            "email": "bobdylan6000@outlook.com",
            "employer": "ABC corp",
            "income": 7200,
            "password": "VBghd#&^7272HH"
        }

    } catch (error) {
        console.error(error);
    }
}

module.exports = { getData };
