"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPhotoHandler = void 0;
const firebase_admin_1 = require("firebase-admin");
exports.uploadPhotoHandler = async (request, response) => {
    try {
        const { base64image } = request.body.input;
        const contentType = base64image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
        const file = firebase_admin_1.storage().bucket().file(`photos/${Date.now()}`);
        const base64EncodedImageString = base64image.replace(/^data:image\/\w+;base64,/, "");
        const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');
        await file.save(imageBuffer, { contentType });
        await file.makePublic();
        const url = file.publicUrl();
        response.status(200).send({ url });
    }
    catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        response.status(500).send({ message: `Message: ${errorMessage}` });
    }
};
//# sourceMappingURL=uploadPhoto.js.map