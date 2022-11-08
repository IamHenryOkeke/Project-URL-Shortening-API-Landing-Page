const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('nav-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

const submitBtn = document.getElementById("shorten-btn");

const urlLink = document.getElementById("url");

const userLinkContainer = document.querySelector(".user-links");

submitBtn.addEventListener("click", async function getShortenLink(e){
            const para = document.getElementById("empty-error-message")
            if (urlLink.value === "" || urlLink.value === null){
                para.textContent = "Please add a link";
            }
            else {
                e.preventDefault();
                const originalLink = urlLink.value;
                const apiUrl = `https://api.shrtco.de/v2/shorten?url=${originalLink}`;
                
                try{
                    para.textContent = ""
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    const shortenLink = data.result.full_short_link;
                    alert(`Your shortened link: ${shortenLink}`);
                    localStorage.setItem(originalLink, shortenLink);
                    printUserLinkList();
                    const copyLinkButtons = Array.from(document.querySelectorAll("#copy-btn"));
                    copyLinkButtons.map(button => {
                        button.addEventListener("click", function(e){
                            const index = copyLinkButtons.indexOf(e.target);
                            copyPassword(`${index}`);
                        })
                    }) 
                }
                catch(e){
                    console.error(e);
                }
            }
        });
const printUserLinkList = () => {
    userLinkContainer.replaceChildren();
    for (let i = 0; i < localStorage.length; i++){
        renderLink(`${localStorage.key(i)}` , `${localStorage.getItem(localStorage.key(i))}`, i);
    }
}

const copyPassword = (index) => {
    let copyText = document.getElementById(index);
    navigator.clipboard.writeText(copyText.textContent);
    alert("Copied link: " + copyText.textContent);
}

const renderLink = (lLink, sLink, index) => {
    const longLink = document.createElement("p");
    const shortLink = document.createElement("p");
    shortLink.setAttribute('id',index);
    const copyBtn = document.createElement("button");
    copyBtn.setAttribute('id','copy-btn');
    copyBtn.setAttribute('class','btn');

    const longLinkDiv = document.createElement("div");
    longLinkDiv.setAttribute("id", "longLink");
    const shortLinkDiv = document.createElement("div");
    shortLinkDiv.setAttribute("id", "shortLink");
    const linkDiv = document.createElement("div");

    longLink.textContent = lLink;
    shortLink.textContent = sLink;
    copyBtn.textContent = "Copy";

    longLinkDiv.appendChild(longLink)
    shortLinkDiv.appendChild(shortLink);
    shortLinkDiv.appendChild(copyBtn);

    linkDiv.appendChild(longLinkDiv);
    linkDiv.appendChild(shortLinkDiv);

    userLinkContainer.appendChild(linkDiv);
}

printUserLinkList();

const copyLinkButtons = Array.from(document.querySelectorAll("#copy-btn"));
copyLinkButtons.map(button => {
    button.addEventListener("click", function(e){
        const index = copyLinkButtons.indexOf(e.target);
        copyPassword(`${index}`);
    })
});
