import countryList from "./codes.js";

const submitBtn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".To select");
const msg = document.querySelector(".msg");

const getTodaysDate = () => {
    let yourDate = new Date();
    return yourDate.toISOString().split('T')[0];
};

const BASEURL = `
  https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${getTodaysDate()}/v1/currencies/`;

console.log(BASEURL);

const dropdownSelects = document.querySelectorAll(".dropdown select");

for (const selects of dropdownSelects) {
    for (const currencyCode in countryList) {
        console.log(currencyCode + " " + countryList[currencyCode]);
        const newSelectOption = document.createElement("option");
        if (selects.name === "from" && currencyCode === "USD") {
            newSelectOption.selected = "selected";
        }
        else if (selects.name === "to" && currencyCode === "INR") {
            newSelectOption.selected = "selected";
        }
        newSelectOption.innerText = currencyCode;
        newSelectOption.value = currencyCode;
        selects.append(newSelectOption);

        selects.addEventListener("change", (event) => {
            updateFlag(event.target);
        })
    }
}

const updateFlag = function (element) {
    let currencyCode = element.value;
    let countryFlagCode = countryList[currencyCode];
    const parentNode = element.parentElement.querySelector("img");
    parentNode.setAttribute("src", `https://flagsapi.com/${countryFlagCode}/flat/64.png`);
}

submitBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    const orgAmount = document.querySelector(".amount input");
    console.log(orgAmount.value);
    const inputAmount = orgAmount.value;
    if (inputAmount < 1 || inputAmount === "") {
        orgAmount.value = 1;
    }
    console.log(fromCurr.value);
    console.log(toCurr.value);

    const newUrl = `${BASEURL}${fromCurr.value.toLowerCase()}.json`;
    // const response = await fetch(newUrl);
    // const respJson = await response.json();

    fetch(newUrl).then(function (response) {
        return response.json()
    }).then(function (respJson) {
        console.log(respJson["date"]);
        const exhangeRate = respJson[`${fromCurr.value.toLowerCase()}`][toCurr.value.toLowerCase()] * (orgAmount.value)
        console.log(exhangeRate);
        return exhangeRate;
    }).then(function (exhangeRate) {
        const msgToDisplay = `${orgAmount.value} ${fromCurr.value} = ${exhangeRate} ${toCurr.value}`;
        msg.innerHTML = `<b> ${msgToDisplay} </b>`;
    }).catch(function (error) {
        throw new error(error);
    });
});

// const amountdiv = document.querySelector(".amount p ~ input");
// const anchorTag = document.createElement("button");
// anchorTag.innerText = "www.google.com";
// anchorTag.style.backgroundColor = "cyan";
// amountdiv.after(anchorTag);