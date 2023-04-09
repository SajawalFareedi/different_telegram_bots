const fetch = require("node-fetch").default;


const getData = async () => {
    try {
        // const data = await fetch("http://localhost:300/data", { method: "GET", headers: { "content-type": "application/json" } });
        // return await data.json();

        return {
            "id": "123456789",
            "firstName": "Harold G",
            "lastName": "Aguayo",
            "dob": {
                "day": "07",
                "month": "10",
                "year": "1994"
            },
            "gender": "M",
            "ssn": "694-01-7392",
            "address": {
                "street": "3609 Perine Street",
                "city": "Centerville",
                "state": "VA",
                "zip": "22020"
            },
            "dl": "123232323",
            "phone": "703-830-9931",
            "email": "HaroldGAguayo@teleworm.us",
            "employer": "Cut Rite",
            "income": 7200,
            "password": "VBghd#&^7272HH"
        }

    } catch (error) {
        console.error(error);
    }
}

module.exports = { getData };
