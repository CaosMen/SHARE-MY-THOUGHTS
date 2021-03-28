/* Requests */

const request_thoughts = async () => {
    var URL = window.location.protocol + "//" + window.location.host + '/thoughts';

    var requestOptions = {
        method: 'GET'
    };

    const response = await fetch(URL, requestOptions);
    
    return await response.json();
};

/* Posts */

const post_thought = async (text) => {
    var URL = window.location.protocol + "//" + window.location.host + '/thought';

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("thought", text);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
    };

    const response = await fetch(URL, requestOptions);

    return await response.json();
};

/* Start Calls */

getThoughts();

/* Create Thoughts */

function getThoughts() {
    request_thoughts()
    .then((thoughts) => {
        setThoughts(thoughts.reverse());
    })
    .catch((error) => {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            heightAuto: false
        });
    });
}

function createThought(thought) {
    let element = '<div class="thought">' +
                  '    <h4 class="text text-left noselect">“' + thought + '”</h4>' +
                  '    <h5 class="text text-left noselect">— Anonymous</h5>' +
                  '</div>';
    
    return element;
}

function setThoughts(thoughts) {
    var documentThoughts = document.getElementById('thoughts-place');

    if (thoughts.length > 0) {
        documentThoughts.innerHTML = '';

        for (let i = 0; i < thoughts.length; i++) {
            documentThoughts.innerHTML += createThought(thoughts[i].thought);

            if (i != (thoughts.length - 1)) documentThoughts.innerHTML += '<hr class="divider">';
        }

        documentThoughts.setAttribute('hasData', true);
    } else {
        documentThoughts.innerHTML += '<h4 class="text noselect">Write the first thought!</h4>';

        documentThoughts.setAttribute('hasData', false);
    }
}

function newThought(thought) {
    var documentThoughts = document.getElementById('thoughts-place');

    if (documentThoughts.getAttribute('hasData') == "false") {
        documentThoughts.innerHTML = '';
        
        documentThoughts.setAttribute('hasData', true);
    }

    documentThoughts.innerHTML = createThought(thought) + documentThoughts.innerHTML;
}

function valid () {
    var textArea = document.forms["PostThought"]["TextArea"].value;

    if (textArea) {
        document.getElementById("validation").innerHTML = "";
        document.getElementById("TextArea").value = "";
        
        post_thought(textArea)
        .then((result) => {
            newThought(result.data);
        })
        .catch((error) => {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                heightAuto: false
            });
        });

        return true;
    } else {
        document.getElementById("validation").innerHTML = "Type Something!";

        return false;
    }
}

function post_Text() {
    var valid_check = valid();

    return false;
}

/* JQuery */

/* Text Area Auto Ajust */

$('textarea').autoResize();