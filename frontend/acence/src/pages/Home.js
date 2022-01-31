import Button from 'react-bootstrap/Button';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Form} from "reactstrap";
import {FormControl} from "react-bootstrap";

function Home(){
    return (
        <div className="Home">
            <div>
            <h3>Trouver une station essence</h3>
            <Form >
                <FormControl
                    type="search"
                    placeholder="Dans quelle ville voulez-vous trouver votre station essence?"
                    className="me-2"
                    aria-label="Search"
                />
                <div>
                <Button variant="secondary" className="m-2">Rechercher la plus proche</Button>
                <Button variant="secondary" className="m-2">Rechercher la moins chère</Button>
                </div>
            </Form>
            </div>
            <div>
                <input type="radio" id="Gazole" name="essence" value="Gazole" checked />
                <label for="Gazole">Gazole</label>
            </div>
            <div>
                <input type="radio" id="SP95-E10" name="essence" value="SP95-E10" checked />
                <label for="SP95-E10">SP95-E10</label>
            </div>
            <div>
                <input type="radio" id="SP98" name="essence" value="SP98" checked />
                <label for="SP98">SP98</label>
            </div>
            <div>
                <input type="radio" id="SP95" name="essence" value="SP95" checked />
                <label for="SP95">SP95</label>
            </div>
            <div>
                <input type="radio" id="GPLc" name="essence" value="GPLc" checked />
                <label for="GPLc">GPLc</label>
            </div>
            <div>
                <input type="radio" id="E85" name="essence" value="E85" checked />
                <label for="E85">E85</label>
            </div>


        </div>

    )
}

export default Home;
