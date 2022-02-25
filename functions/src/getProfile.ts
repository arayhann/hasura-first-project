import { Request, Response } from "firebase-functions";
import { auth } from "firebase-admin";

export const getProfileHandler = async (
    request: Request,
    response: Response
) => {
    try {

        const { id } = request.body.input;
        const { uid, email } = await auth().getUser(id);

        response.status(200).send({
            id: uid,
            email: email,
        });
    } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        response.status(500).send({ message: `Message: ${errorMessage}`});
    }
}