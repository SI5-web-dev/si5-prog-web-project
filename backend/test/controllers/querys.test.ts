import request from "supertest";
import app from '../../src/app.js';


describe('POST /querys/proximity', () => {
    
    test('reponse avec code 200', async ()  => {
        const res = await request(app)
            .post('/querys/proximity')
            .set('Accept', 'application/json')
            .send({
            "location":"Nice",
            "Gazole":"true",
            "SP95E10":"false",
            "SP98":"true",
            "SP95":"true",
            "GPLc":"true",
            "E85":"true"});
        
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("200");
       

    })
});


describe('POST /querys/proximity', () => {
    
    test('reponse avec code 401 car il manque des informations', async ()  => {
        const res = await request(app)
            .post('/querys/proximity')
            .set('Accept', 'application/json')
            .send({
            "Gazole":"true",
            "SP95E10":"true",
            "SP98":"true",
            "SP95":"true",
            "GPLc":"true",
            "E85":"true"});
        
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("Des informations sont manquantes");

    })
});


describe('POST /querys/proximity', () => {
    
    test('reponse avec code 401 car il manque des informations', async ()  => {
        const res = await request(app)
            .post('/querys/proximity')
            .set('Accept', 'application/json')
            .send({
                "location":"Nice",
                "SP95E10":"true",
                "SP98":42,
                "SP95":"true",
                "GPLc":"true",
                "E85":"true"});
        
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("Des informations sont manquantes");

    })
});

describe('POST /querys/proximity', () => {
    
    test('reponse avec code 401 car SP95 true !== "true"', async ()  => {
        const res = await request(app)
            .post('/querys/proximity')
            .set('Accept', 'application/json')
            .send({
                "location":"Nice",
                "Gazole":"true",
                "SP98":"true",
                "SP95":true,
                "GPLc":"true",
                "E85":"true"});
        
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("Des informations sont manquantes");

    })
});

describe('POST /querys/proximity', () => {
    
    test('reponse avec code 401 car location pas string', async ()  => {
        const res = await request(app)
            .post('/querys/proximity')
            .set('Accept', 'application/json')
            .send({
                "location":76,
                "Gazole":"true",
                "SP95E10":"true",
                "SP95":"true",
                "GPLc":"true",
                "E85":"true"});
        
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("Des informations sont manquantes");

    })
});

describe('POST /querys/proximity', () => {
    
    test('reponse avec code 401 car oui !== true', async ()  => {
        const res = await request(app)
            .post('/querys/proximity')
            .set('Accept', 'application/json')
            .send({
                "location":"Nice",
                "Gazole":"true",
                "SP95E10":"oui",
                "SP98":"true",
                "SP95":"true",
                "GPLc":"true",
                "E85":"true"});
        
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("Des informations sont manquantes");

    })
});