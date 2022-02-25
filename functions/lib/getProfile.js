"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileHandler = void 0;
const firebase_admin_1 = require("firebase-admin");
exports.getProfileHandler = async (request, response) => {
    try {
        const { id } = request.body.input;
        const { uid, email } = await firebase_admin_1.auth().getUser(id);
        response.status(200).send({
            id: uid,
            email: email,
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
//# sourceMappingURL=getProfile.js.map