const beer_name_dom = document.getElementById("beer-name");
const beer_image_dom = document.getElementById("beer-image");
const beer_description_dom = document.getElementById("beer-description");
const edited_description_form = document.getElementById("description-form");
const  beers_ul = document.getElementById("beer-list");
// Remove the items initially in the beer-list <ul>
while (beers_ul.hasChildNodes()) {
    beers_ul.removeChild(beers_ul.firstChild);
  }


async function get_db_data(endpoint_url){
   const response = await fetch(endpoint_url);
   return await response.json()
}

get_db_data("http://localhost:3000/beers").then(data => {
   const beers = data;
   beers.forEach(beer => {
    //    console.log(beer)
       // Create an "li" node:
       const node_listOfBeers = document.createElement("li");
       // Create a text node:
       const textListNode = document.createTextNode(beer.name);
       // Append the text node to the "li" node:
       node_listOfBeers.appendChild(textListNode);
    //    console.log(node_listOfBeers)
       beers_ul.appendChild(node_listOfBeers)
   })
})

get_db_data("http://localhost:3000/beers/1").then(beer_details => {
    // console.log(data)
    beer_name_dom.innerHTML = beer_details.name;
    beer_image_dom.setAttribute("src", beer_details.image_url);
    beer_description_dom.innerHTML = `Description: ${beer_details.description}`;

    const text_input = edited_description_form.children[1];
    const button = edited_description_form.children[2];

button.addEventListener('click', function(e){
    e.preventDefault()
    if (text_input.value == ""){
        alert("There is no description update to make!")
    } else{
        beer_description_dom.innerHTML = `Description: ${text_input.value}`;
    }
})
})