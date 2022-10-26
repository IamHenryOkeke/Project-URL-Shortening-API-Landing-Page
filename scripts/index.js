const submitBtn = document.getElementById("shorten-btn");

const urlLink = document.getElementById("url");

const testLocal = document.getElementById("local");

const userLinkContainer = document.querySelector(".user-links")

submitBtn.addEventListener("click", async function getShortenLink(e){
          if (urlLink.value === ""){
              alert("Empty field. Please enter a value.");
           }
          else {
              e.preventDefault();
              const originalLink = urlLink.value;
              const apiUrl = `https://api.shrtco.de/v2/shorten?url=${originalLink}`;
            
              try{
                  const response = await fetch(apiUrl);
                  const data = await response.json();
                  const shortenLink = data.result.full_short_link;
                  alert(`Your shortened link: ${shortenLink}`);
                  localStorage.setItem(originalLink, shortenLink);
                  printUserLinkList()
              }
              catch(e){
                  console.error(e);
              }
            }
        });
const printUserLinkList = () => {
    userLinkContainer.replaceChildren();
    for (let i = 0; i < localStorage.length; i++){
        renderLink(`${localStorage.key(i)}` , `${localStorage.getItem(localStorage.key(i))}`);
        console.log(`${localStorage.key(i)} ===> ${localStorage.getItem(localStorage.key(i))}`);
    }
}

const copyPassword = () => {
    let copyText = document.getElementById("password");
    navigator.clipboard.writeText(copyText.innerText);
    alert("Copied password: " + copyText.innerText);
}

const renderLink = (lLink, sLink) => {
    const longLink = document.createElement("p");
    const shortLink = document.createElement("p");
    const copyBtn = document.createElement("button");

    const shortLinkDiv = document.createElement("div");
    const linkDiv = document.createElement("div");

    longLink.textContent = lLink;
    shortLink.textContent = sLink;
    copyBtn.textContent = "Copy";

    linkDiv.appendChild(longLink);
    linkDiv.appendChild(shortLinkDiv);

    userLinkContainer.appendChild(linkDiv);
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
// function toggleNavBar() {
//     document.getElementById("myDropdown").classList.toggle("show");
//   }
  
//   // Close the dropdown if the user clicks outside of it
//   window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//       var dropdowns = document.getElementsByClassName("dropdown-content");
//       var i;
//       for (i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }
// testLocal.addEventListener("click", printStorage)