import Navigation from "../components/Navigation";
function Home(){
    return (
        <div className="Home">
            <Navigation />
            <h1>Trouver une station essence</h1>

            <input placeholder="Dans quelle ville voulez-vous trouver votre station essence ?"/>
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
            <button>Rechercher la plus proche</button>
            <button>Rechercher la moins chère</button>
            
        </div>

        
       
    )
}

export default Home;