"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = void 0;
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
exports.createUserHandler = async (request, response) => {
    try {
        const { email, password } = request.body.input.credentials;
        const user = await firebase_admin_1.auth().createUser({
            email,
            password,
        });
        await firebase_admin_1.auth().setCustomUserClaims(user.uid, {
            "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["user"],
                "x-hasura-default-role": "user",
                "x-hasura-user-id": user.uid,
            },
        });
        firebase_functions_1.logger.log(request.body);
        response.status(200).send({
            id: user.uid,
            email: user.email,
        });
    }
    catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        response.status(500).send({ message: `Message: ${errorMessage}` });
    }
};
//# sourceMappingURL=createUser.js.map