import request from "supertest";
import app from '../../src/app.js';


describe('POST /auth/signup', () => {
    test('reponse il manque des informations', async () => {
        const res = await request(app)
            .post('/user/signup')
            .set('Accept', 'application/json')
            .send({
                email: "test@essence.com"
            });

        expect(res.type).toBe('application/json');
        expect(res.body.message).toBe("Il manque des informations..");
    });

    test('reponse  l\'adresse email n\'est pas valide', async () => {
        const res = await request(app)
            .post('/user/signup')
            .set('Accept', 'application/json')
            .send({
                email: "test-essence.com",
                password : "MonSuperMotDePasse",
                name: "nameTest",
                surname: "surnameTest"
            });

        expect(res.type).toBe('application/json');
        expect(res.body.message).toBe("Veuillez entrer une adresse mail valide.");
    });

    test('reponse car le mot de passe n\'est pas assez robuste', async () => {
        const res = await request(app)
            .post('/user/signup')
            .set('Accept', 'application/json')
            .send({
                email: "test@essence.com",
                password : "MonSuperMotDePasse",
                name: "nameTest",
                surname: "surnameTest"
            });

        expect(res.type).toBe('application/json');
        expect(res.body.message).toBe("Le mot de passe n'est pas assez complexe.");
    });
});