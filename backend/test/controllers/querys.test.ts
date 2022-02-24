import request from "supertest";
import app from '../../src/app.js';


describe('POST /querys/askStation', () => {
    /*
    test('reponse avec code 200', async ()  => {
        const res = await request(app)
            .post('/querys/askStation')
            .set('Accept', 'application/json')
            .send({
            "latitude":"12,534",
            "longitude":"12,534",
            "Gazole":true,
            "SP95E10":false,
            "SP98":true,
            "SP95":true,
            "GPLc":true,
            "E85":true});
        
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("200");
       

    })*/
    
    test('reponse avec code 401 car il manque des informations', async ()  => {
        const res = await request(app)
            .post('/querys/askStation')
            .set('Accept', 'application/json')
            .send({
            "latitude":"12,534",
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
    
    test('reponse avec code 401 car il manque des informations', async ()  => {
        const res = await request(app)
            .post('/querys/askStation')
            .set('Accept', 'application/json')
            .send({
                "latitude":"12,534",
                "longitude":"12,534",
                "SP95E10":"true",
                "SP98":42,
                "SP95":"true",
                "GPLc":"true",
                "E85":"true"});
        
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("Des informations sont manquantes");

    })
    
    test('reponse avec code 401 car SP95 true !== "true"', async ()  => {
        const res = await request(app)
            .post('/querys/askStation')
            .set('Accept', 'application/json')
            .send({
                "latitude":"12,534",
                "longitude":"12,534",
                "Gazole":"true",
                "SP98":"true",
                "SP95":true,
                "GPLc":"true",
                "E85":"true"});
        
        expect(res.type).toBe('application/json');
        expect(res.body.status).toBe("401");
        expect(res.body.message).toBe("Des informations sont manquantes");

    })
    
    
    test('reponse avec code 401 car oui !== true', async ()  => {
        const res = await request(app)
            .post('/querys/askStation')
            .set('Accept', 'application/json')
            .send({
                "latitude":"12,534",
                "longitude":"12,534",
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