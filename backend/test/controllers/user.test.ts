import request from "supertest";
import {startServer} from '../../src/app.js';

describe('POST /user/signup', () => {
    let app: any;
    beforeAll(async (): Promise<void> => {
        app = await startServer(4002);
    });
    afterAll((): void => {
        app.close();
    });
    test('reponse il manque des informations', async ()  => {
        const res = await request(app)
            .post('/user/signup')
            .set('Accept', 'application/json')
            .send({
                email: "test@essence.com"
            });
        await expect(res.type).toBe('application/json');
        await expect(res.body.message).toBe("Il manque des informations..");
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

    test('il manque le mot de passe', async () => {
        const res = await request(app)
            .post('/user/login')
            .set('Accept', 'application/json')
            .send({
                email: "ralph.elchalfoun@hotmail.fr"
            });

        expect(res.type).toBe('application/json');
        expect(res.body.message).toBe("Nom d'utilisateur ou mot de passe incorrect !");
    });

    test('il manque le mail', async () => {
        const res = await request(app)
            .post('/user/login')
            .set('Accept', 'application/json')
            .send({
                password: "ralph.elchalfoun@hotmail.fr"
            });

        expect(res.type).toBe('application/json');
        expect(res.body.message).toBe("Nom d'utilisateur ou mot de passe incorrect !");
    });

    test('mot de passe incorrect', async () => {
        const res = await request(app)
            .post('/user/login')
            .set('Accept', 'application/json')
            .send({
                email: "ralph.elchalfoun@hotmail.fr",
                password: "1234567TREZ"
            });

        expect(res.type).toBe('application/json');
        expect(res.body.message).toBe("Nom d'utilisateur ou mot de passe incorrect !");
    });

    test('identification réussie', async () => {
        const res = await request(app)
            .post('/user/login')
            .set('Accept', 'application/json')
            .send({
                email: "ralph.elchalfoun@hotmail.fr",
                password: "Azerty&1234"
            });

        expect(res.type).toBe('application/json');
        expect(res.body.message).toBe("Vous êtes connecté !");
        expect(res.body.uid).toBe("61fecd01ef9b83ccbf97acef");
        expect(res.body.favoriteStations).toBeDefined();
    });
});