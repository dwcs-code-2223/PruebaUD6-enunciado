
/*Envía datos al servidor con POST en formato JSON de forma que pueden ser recuperados en php://input */
function loginJSON(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let pwd = document.querySelector("#pwd").value;
    let rol = document.querySelector("#rol").value;


    let login_url = "?controller=Usuario&action=loginJSON";

    const data = { 'email': email, 'pwd': pwd, 'rol': rol };

    const request = new Request(BASE_URL + login_url, {
        method: "POST",
        body: JSON.stringify(data)
    });

    fetch(request)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                console.log('error 400');
                return false;
            } else {
                console.log("Something went wrong on API server!");
                return false;
            }

        })
        .then((response) => {

            if (response.userId && response.email && response.rolId) {
                showView(MAIN_VIEW_ID);
                setEmail(response.email);
                console.log(response.email);
                //toggleLoginMain(response.email);

                //2.b) punto 1
                if (Number(response.rolId) === ADMIN_ROLE) {
                    cargarUsuarios();
                }


            } else {
                console.error('La autenticación ha fallado');
                showMsg('La autenticación ha fallado', true, ERROR_MSG_TYPE);
            }
        }
        )
        .catch((error) => {
            console.error('Ha ocurrido un error en login' + error);
            showMsg('La autenticación ha fallado', true, ERROR_MSG_TYPE);
        });


}



function logout() {

    let logout_url = "?controller=Usuario&action=logout";

    const request = new Request(BASE_URL + logout_url, {
        method: "POST"

    });

    fetch(request)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("Something went wrong on API server!");
                return false;
            }
        }
        ).
        then((response) => {
            if ((response.error === true) || (response === false)) {
                showMsg('Ha habido un error en el cierre de sesión', true, ERROR_MSG_TYPE);

            }
            showView(LOGIN_VIEW_ID);
            setEmail('');
         
         //   toggleLoginMain('');
        })
        .catch((error) => {
            console.error('Ha ocurrido un error en login' + error);
        });
}







