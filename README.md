# si5-prog-web-project (by ACE)

Our web application is hosted in Heroku at: https://acence.herokuapp.com/ /!\On the deployed version, station data are not updated
### Table of Contents

* [Directories](#les-différents-répertoires)
* [The commands to be executed](#les-commandes-à-exécuter)
* [Authors](#auteurs)


-----------------

### The different directories
* __front-end__ : [_front-end_](https://github.com/SI5-web-dev/si5-prog-web-project/tree/main/frontend/acence)
* __back-end__ : [_back-end_](https://github.com/SI5-web-dev/si5-prog-web-project/tree/main/backend)

-----------------

###  The commands to be executed
First, we clone the project and go to the newly created directory :
```bash
git clone https://github.com/SI5-web-dev/si5-prog-web-project.git
cd si5-prog-web-project
```

* For the __front-end__ part <sup>[1]</sup> :
    ```bash
    cd frontend/acence
    npm install
    ```
    Once the installation is finished, just execute the following command to build the client:
    ```bash
    npm run build
    ```
    Finally we return to the root of the project:
    ```
    cd ../..
    ```
 * For the __back-end__ part <sup>[1]</sup> :
     ```bash
     cd backend
     npm install
     ```
     Once the installation is finished, just execute the following command to build and launch the server:
     ```bash
     npm run dev
     ```
     
  * The application is then accessible at http://localhost:4000
<br>
  * To connect to our application you can create an account or directly use this : 
     
     - email : alex.dubois@example.fr
     - password : AZ534&rzegz34f4gfe
     

[1] : If the installation does not work, it means that you have not installed [NodeJS](https://nodejs.org/en/download/). Install it before running the above commands again.

-----------------

## Authors
- [Élise Chamberlin](https://github.com/Elise-Chamberlin)
- [Ralph El Chalfoun](https://github.com/iBananos)
- [Ossama Ashraf](https://github.com/Ossama98)

