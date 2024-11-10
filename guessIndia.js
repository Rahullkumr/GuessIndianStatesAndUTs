// 28 states and 8 UTs 

const statesAndUTs = {
    "Andhra Pradesh": [615, 615],
    "Arunachal Pradesh": [940, 240],
    "Assam": [920, 272],
    "Bihar": [770, 300],
    "Chhattisgarh": [690, 410],
    "Goa": [492, 575],
    "Gujarat": [427, 375],
    "Haryana": [550, 205],
    "Himachal Pradesh": [570, 140],
    "Jharkhand": [755, 355],
    "Karnataka": [520, 635],
    "Kerala": [553, 729],
    "Madhya Pradesh": [550, 383],
    "Maharashtra": [490, 470],
    "Manipur": [980, 315],
    "Meghalaya": [900, 300],
    "Mizoram": [958, 370],
    "Nagaland": [995, 275],
    "Odisha": [740, 445],
    "Punjab": [530, 165],
    "Rajasthan": [471, 287],
    "Sikkim": [845, 250],
    "Tamil Nadu": [590, 700],
    "Telangana": [592, 528],
    "Tripura": [930, 350],
    "Uttar Pradesh": [635, 285],
    "Uttarakhand": [633, 200],
    "West Bengal": [820, 375],

    "Chandigarh": [560, 180],
    "Lakshadweep": [432, 721],
    "Delhi": [577, 222],
    "Puducherry": [640, 670],
    "Jammu And Kashmir": [522, 95],
    "Ladakh": [571, 62],
    "Andaman And Nicobar Islands": [800, 640],
    "Dadra And Nagar Haveli And Daman And Diu": [360, 465],
}
const container = document.querySelector('.container');
const input = document.querySelector('input')
const button = document.querySelector('button')
const missedStatesBox = document.querySelector('.missedStatesBox')
const missedStatesContainer = document.querySelector('.missedStatesContainer')
let correct_guess_heading = document.getElementById('correct_guess_heading')
let missedNamesList = Object.keys(statesAndUTs); // remove each correct guesses
let correctlyGuessedNamesList = [];

// converting guessedName into titlecase (first letter of every word capitalized)
let toTitleCase = (userInputValue) =>{
    return userInputValue
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

button.addEventListener('click', (e)=>{
    let guessedName = toTitleCase(input.value.trim());
    input.value = '';
    let x = null;
    let y = null;

    for(let i of Object.keys(statesAndUTs)){
        if(guessedName === 'Exit'){
            button.disabled = true;
            missedNamesList.forEach((val)=>{
                let missedNameHeading = document.createElement('h5');
                missedStatesContainer.append(missedNameHeading);
                missedNameHeading.innerHTML = `<h5 style="font-size: 14px;color: gainsboro;"> ${val} </h5>`;
            });
            // CHANGE TO VISIBLE
            missedStatesBox.style.display = 'flex';
            break;
        }
        // TODO: HOW WILL U MANAGE REPETATIONS (if one enters same value 2nd and 3rd time, then ?)
        if(guessedName === i ){
            correctlyGuessedNamesList.push(guessedName);
            let correct_guesses_count = correctlyGuessedNamesList.length
            correct_guess_heading.innerText = `${correct_guesses_count}/36 Names Correct`;
            x = statesAndUTs[guessedName][0];
            y = statesAndUTs[guessedName][1];
            // span for showing guessed name on the map
            let guessedNameContainer = document.createElement('span');
            document.body.append(guessedNameContainer);
            if(guessedName === 'Dadra And Nagar Haveli And Daman And Diu'){
                guessedNameContainer.innerHTML = `
                <span style="
                    text-align: center;
                    font-size: 10px;
                    position: absolute;
                    top: ${y}px;
                    left: ${x}px">  ${"Dadra And Nagar Haveli <br/>And Daman And Diu"}
                </span>`;
            }else if(guessedName === 'Andaman And Nicobar Islands'){
                // just for the pin, ye likhna pada
                guessedNameContainer.innerHTML = `
                <span style="
                    font-size: 14px;
                    position: absolute;
                    top: ${y}px;
                    left: ${x}px">  ${guessedName+"📍"};    
                </span>`;
            }else{
                guessedNameContainer.innerHTML = `
                <span style="
                    font-size: 14px;
                    position: absolute;
                    top: ${y}px;
                    left: ${x}px">  ${"📍"+guessedName}
                </span>`;
            }
            // remove each correctly guessed name from missedNamesList
            missedNamesList = missedNamesList.filter(val => val !== `${guessedName}`);
        }
    }
});
