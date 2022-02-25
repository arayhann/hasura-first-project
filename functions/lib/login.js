"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = void 0;
const node_fetch_1 = require("node-fetch");
const AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBslAw25QWEs601Kt2IVk3umJgSccSO71Q`;
exports.loginHandler = async (request, response) => {
    try {
        const { email, password } = request.body.input.credentials;
        const loginRequest = await node_fetch_1.default(AUTH_URL, {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
            }),
        });
        const { idToken, localId } = await loginRequest.json();
        if (!idToken)
            throw Error("No IdToken");
        response.status(200).send({
            accessToken: idToken,
            id: localId,
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
//# sourceMappingURL=login.js.map