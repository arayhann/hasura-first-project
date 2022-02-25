import { Request, Response } from "firebase-functions";
import { storage } from "firebase-admin";

export const uploadPhotoHandler = async ( request: Request,
    response: Response
) => {
    try {
        const { base64image } = request.body.input;
        const contentType = base64image.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
        const file = storage().bucket().file(`photos/${Date.now()}`);

        const base64EncodedImageString = base64image.replace(/^data:image\/\w+;base64,/, "");
        const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');
        await file.save(imageBuffer, { contentType });

        await file.makePublic();
        const url = file.publicUrl();
        response.status(200).send({ url });
    } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        response.status(500).send({ message: `Message: ${errorMessage}`});
    }
}