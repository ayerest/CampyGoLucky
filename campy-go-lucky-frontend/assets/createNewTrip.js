function createTrip(user){
    console.log(user)
/* <div class="jumbotron">
    <h1 class="display-4">Creating New Trip</h1>
    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
    <hr class="my-4">
    <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Trip Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Trip name">
            <br>
            <label for="exampleInputEmail1">Starting Location</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your location">
            <br>
            <label for="exampleInputEmail1">Start Date</label>
            <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name">
        </div>
        <button type="submit" class="btn btn-outline-success">Create Trip!</button>
    </form>
</div> */

let renderDelete = document.querySelector(".render-delete")
deleteAllUnder(renderDelete)

let jumbo = document.createElement("div")
jumbo.classList.add("jumbotron", "glass")

let appTitle = document.createElement("h1")
appTitle.classList.add("display-4")
appTitle.innerText = "Creating New Trip"

let appDesc = document.createElement("p")
appDesc.classList.add("lead")
appDesc.innerText = "Let us help you plan your next camping trip! Plan your road trip to get to your favorite camping destinations and add campsites and hiking trails for when you get there. Campy Go Lucky is here for all your camping needs!"

let horizRule = document.createElement("hr")
horizRule.classList.add("my-4")

let loginForm = document.createElement("form")
loginForm.onsubmit = e =>{
    e.preventDefault()
    console.log(user)
    createFormSubmission(e, user)
}

let formStyle = document.createElement("div")
formStyle.class = "form-group"

let tripLabel = document.createElement("label")
tripLabel.for = "inputTripName"
tripLabel.innerText = "Trip Name"
let tripInput = document.createElement("input")
tripInput.type = "text"
tripInput.classList.add("form-control")
tripInput.id = "inputTripName"
tripInput.placeholder = "Enter trip name"
tripInput.setAttribute("aria-describedby","emailHelp")

let tripDescLabel = document.createElement("label")
tripDescLabel.for = "inputTripDesc"
tripDescLabel.innerText = "Trip Description"
let tripDescInput = document.createElement("input")
tripDescInput.type = "text"
tripDescInput.classList.add("form-control")
tripDescInput.id = "inputTripDesc"
tripDescInput.placeholder = "Enter trip description"
tripDescInput.setAttribute("aria-describedby", "emailHelp")

let startingLocationLabel = document.createElement("label")
startingLocationLabel.for = "inputStartLocation"
startingLocationLabel.innerText = "Starting Location"
let startingLocationInput = document.createElement("input")
startingLocationInput.type = "text"
startingLocationInput.classList.add("form-control")
startingLocationInput.id = "inputStartLocation"
startingLocationInput.placeholder = "Enter starting location"
startingLocationInput.setAttribute("aria-describedby","emailHelp")

let startDateLabel = document.createElement("label")
startDateLabel.for = "inputDate"
startDateLabel.innerText = "Enter Start Date"
let startDateInput = document.createElement("input")
startDateInput.classList.add("form-control")
startDateInput.type = "date"
startDateInput.id = "inputDate"
startDateInput.placeholder = "Enter date"
startDateInput.setAttribute("aria-describedby","emailHelp")

let submitBtn = document.createElement("button")
submitBtn.classList.add("btn", "btn-outline-success")
submitBtn.type = "submit"
submitBtn.innerText = "Let's Go!"

formStyle.appendChild(tripLabel)
formStyle.appendChild(tripInput)
formStyle.appendChild(tripDescLabel)
formStyle.appendChild(tripDescInput)
formStyle.appendChild(startingLocationLabel)
formStyle.appendChild(startingLocationInput)
formStyle.appendChild(startDateLabel)
formStyle.appendChild(startDateInput)
formStyle.appendChild(submitBtn)

loginForm.appendChild(formStyle)

jumbo.appendChild(appTitle)
jumbo.appendChild(appDesc)
jumbo.appendChild(horizRule)
jumbo.appendChild(loginForm)

renderDelete.appendChild(jumbo)
}

function createFormSubmission(e,user){

    console.log(user)
let tripName = e.target[0].value
let tripDesc = e.target[1].value
let startLocation = e.target[2].value
let startDate = e.target[3].value

fetch(`http://localhost:3000/trips`,{
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    },
    body: JSON.stringify({
        user_id: user.id,
        name: tripName,
        description: tripDesc,
        start_location: startLocation,
        start_date: startDate
    })
}).then(response => response.json())
  .then(newlyCreatedTrip => {
    getMap(newlyCreatedTrip,newlyCreatedTrip.start_location,user)
})}

getMap = (trip,startLocation,user) => {
    // debugger
    fetch('http://localhost:3000/coms', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            startLocation: startLocation
        })
    })
    .then(res => res.json())
    .then(centerPointHash => {
        singleTrip(trip,centerPointHash,user)
    })
}

//go to parks api instead of google
// getMarkers = (trip, centerPointHash) => {
//     // debugger
//     startLocation = trip.start_location
//     state = centerPointHash.address.split(", ")[1]
//     fetch('http://localhost:3000/markers', {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             // startLocation,
//             state

//         })
//     })
//     .then(res => res.json())
//     .then(markersArray => {
//         singleTrip(trip, centerPointHash, markersArray)
//     })
// }
