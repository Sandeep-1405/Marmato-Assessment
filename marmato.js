const items = document.getElementById("items")
const search = document.getElementById("search")
const hamberger = document.getElementById("hamberger")
const grid = document.getElementById("grid")



function createelements(result) {
    let {
        product_image,
        product_title,
        product_badge,
        product_variants
    } = result;



    let div1 = document.createElement("div")
    div1.classList.add("div1")

    let img = document.createElement("img")
    img.classList.add("img")
    img.src = product_image;
    img.alt = "img"
    div1.appendChild(img);


    let div2 = document.createElement("div")
    div1.appendChild(div2)

    let h1 = document.createElement("h1")
    h1.classList.add("heading")
    h1.textContent = product_title
    div2.appendChild(h1)


    let i = 1;
    for (let a of product_variants) {
        let s = 'v' + i;
        let p = document.createElement("p")
        p.textContent = (a[s])
        p.classList.add("para")
        div2.appendChild(p)
        //console.log(a)
        i++
    }
    if (product_badge.length >= 1) {
        let button = document.createElement("button");
        button.classList.add("btn")
        button.textContent = product_badge
        div1.appendChild(button)
    }


    items.appendChild(div1);



    function searchfun() {
        let searchvalue = search.value
        console.log(searchvalue)
        let tolist = Object.values(product_variants)

        if (searchvalue === product_title) {
            h1.style.backgroundColor = "red";
        }
        if (tolist.includes(searchvalue)) {
            console.log(true)
        }
    }
    search.addEventListener("keydown", searchfun)

    grid.addEventListener("click", function() {
        items.classList.add("grid")
        div1.classList.add("col-6")

    })

    hamberger.addEventListener("click", function() {
        items.classList.remove("grid")
        div1.classList.remove("col-6")
    })
}

function displayResults(Data) {
    for (let result of Data) {
        createelements(result)
    }
}

const Search = () => {
    let options = {
        method: "GET"
    };
    let url = "https://products-api-2ttf.onrender.com/api/products"
    fetch(url, options)
        .then(response => {
            return response.json()
        })
        .then(function(jsonData) {
            //console.log(JSON.stringify(jsonData))
            let {
                data
            } = jsonData;
            displayResults(data);
        })

        .catch(error => console.log(error));

}

Search()