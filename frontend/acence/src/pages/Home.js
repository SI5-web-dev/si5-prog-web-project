import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


function Home(){
    return (
        <div>
        <Button variant="primary">Primary</Button>
            <FontAwesomeIcon icon={faCoffee} />
        <p>Home page</p>
        </div>
    )
}

export default Home;
