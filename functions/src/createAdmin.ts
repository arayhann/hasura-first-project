import { Request, Response, logger } from "firebase-functions";
import { auth } from "firebase-admin";


export const createAdminHandler = async (
    request: Request,
    response: Response
) => {
    try {

        const { email, password } = request.body.input.credentials;
        const user = await auth().createUser({
            email,
            password,
        });

        await auth().setCustomUserClaims(user.uid, {
            "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["admin"],
                "x-hasura-default-role": "admin",
                "x-hasura-user-id": user.uid,
            },
        });

        logger.log(request.body);
        response.status(200).send({
            id: user.uid,
            email: user.email,
        });
    } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        response.status(500).send({ message: `Message: ${errorMessage}`});
    }
}