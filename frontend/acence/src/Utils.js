var pathUrl =  window.location
let hostname = "";

if (pathUrl.origin === "http://localhost:3000"){
    hostname =  "http://localhost:4000";
}
class Utils {


    /**
     * @param methode 'POST' 'GET'
     * @param url ex: '/user/login'
     * @param data ex: {'password':'gfdgfqhq', 'mail':'teest@user.com'}
     */
    static async sendRequest(methode , url , data , callback) {
        document.getElementById("loading").style.visibility = "visible";
        var xhr = new XMLHttpRequest()
        console.log(hostname+url)
        xhr.open(methode, hostname+url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.addEventListener('readystatechange', function(e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(JSON.parse(this.response))
                if(JSON.parse(this.response).status ==="500"){
                    alert(JSON.parse(this.response).message)
                }else{
                    callback(this.response);
                }
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                alert("Une erreur est survenue. Veuillez rafraîchir la page");
            }
            document.getElementById("loading").style.visibility = "hidden";
        });
        xhr.send(data);
    }
}


export default Utils;
