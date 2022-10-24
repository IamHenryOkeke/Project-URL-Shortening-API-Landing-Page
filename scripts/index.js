const submitBtn = document.getElementById("shorten-btn")

const urlLink = document.getElementById("url")

console.log(submitBtn)

const myLinks = []

class MyUrlObj{
  constructor(longLink, shortLink){
      this.longLink = longLink;
      this.shortLink = shortLink;
  }
}

submitBtn.addEventListener("click", async function getShortenLink(e){
          if (urlLink.value === ""){
              alert("Empty field. Please enter a value.")
           }
          else {
              e.preventDefault();
              const originalLink = urlLink.value;
              const apiUrl = `https://api.shrtco.de/v2/shorten?url=${originalLink}`;
            
              try{
                  const response = await fetch(apiUrl);
                  const data = await response.json();
                  const shortenLink = data.result.full_short_link;
                  console.log(data);
                  alert(`Your shortened link: ${shortenLink}`);
                  const newLink = new MyUrlObj(originalLink, shortenLink)
                  myLinks.push(newLink)
              }
              catch(e){
                  console.error(e);
              }
        }});