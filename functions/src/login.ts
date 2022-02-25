import { Request, Response } from "firebase-functions";
import fetch from "node-fetch";

interface LoginObject {
    idToken: string;
    localId: string;
 }

const AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBslAw25QWEs601Kt2IVk3umJgSccSO71Q`
export const loginHandler = async (
    request: Request,
    response: Response
) => {
    try {
        const { email, password } = request.body.input.credentials;
        const loginRequest = await fetch(AUTH_URL, {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        });

        const { idToken, localId } = await loginRequest.json() as LoginObject;
        if (!idToken) throw Error("No IdToken");
        response.status(200).send({
            accessToken: idToken,
            id: localId,
        });
    } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        response.status(500).send({ message: `Message: ${errorMessage}`});
    }
}