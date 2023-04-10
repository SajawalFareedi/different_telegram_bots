const axios = require("axios").default;


const getData = async () => {
    try {
        // return (await axios.get("http://localhost:3000/data", { headers: { "content-type": "application/json" } })).data;

        // return {
        //     "id": "123456789",
        //     "firstName": "Harold G",
        //     "lastName": "Aguayo",
        //     "dob": {
        //         "day": "07",
        //         "month": "10",
        //         "year": "1994"
        //     },
        //     "gender": "M",
        //     "ssn": "694-01-7392",
        //     "address": {
        //         "street": "3609 Perine Street",
        //         "city": "Centerville",
        //         "state": "VA",
        //         "zip": "22020"
        //     },
        //     "dl": "123232323",
        //     "phone": "7038309931",
        //     "email": "HaroldGAguayo@teleworm.us",
        //     "employer": "Cut Rite",
        //     "income": 7200,
        //     "password": "VBghd#&^7272HH"
        // }

        // return {
        //     "id": "123456789",
        //     "firstName": "David H",
        //     "lastName": "Vega",
        //     "dob": {
        //         "day": "18",
        //         "month": "09",
        //         "year": "2003"
        //     },
        //     "gender": "M",
        //     "ssn": "549-43-8765",
        //     "address": {
        //         "street": "2873 Cemetery Street",
        //         "city": "San Francisco",
        //         "state": "CA",
        //         "zip": "94107"
        //     },
        //     "dl": "123232323",
        //     "phone": "8317090396",
        //     "email": "DavidHVega@armyspy.com",
        //     "employer": "Mikro Designs",
        //     "income": 7200,
        //     "password": "VBghd#&^7272HH"
        // }

        return {
            "id": "123456789",
            "firstName": "Charles S",
            "lastName": "Ryman",
            "dob": {
                "day": "27",
                "month": "03",
                "year": "1995"
            },
            "gender": "M",
            "ssn": "523-33-8757",
            "address": {
                "street": "136 Sampson Street",
                "city": "Kiowa",
                "state": "CO",
                "zip": "80117"
            },
            "dl": "123232323",
            "phone": "3036216798",
            "email": "CharlesSRyman@rhyta.com",
            "employer": "The Lawn Guru",
            "income": 7200,
            "password": "VBghd#&^7272HH"
        }

    } catch (error) {
        console.error(error);
    }
}

const sleep = (seconds) => {
    return new Promise((resolve, reject) => { setTimeout(resolve, seconds * 1000) });
}

module.exports = { getData, sleep };
