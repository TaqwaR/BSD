// BSD FRONT-END DEVELOPER TEST
// We're building a Star Wars app displaying the "Humans of Star Wars." We are
// going to use the Star Wars API (https://swapi.co/) as our data source and
// fortunately for us the endpoint at https://swapi.co/api/species/1/ gives
// a list of the humans we care about.
//
// OBJECTIVE:
// The goal of this test is to assess your front-end HTML/CSS/JS skills. All
// code must be written as one would in production alongside a team of other
// developers who will be interfacing with your code.
//
// While there are no design mockups provided, we are interested in seeing what
// basic design choices you make such that the data is more easily digestible
// for end users. This is also an opportunity for you to demonstrate your CSS
// abilities.
//
// Please plan to spend no more than 4 hours on this test. You will have an
// opportunity at the next interview to discuss what other ideas you might have
// implemented if you had additional time, so it's fine to leave some things as
// "TODO".
//
// Treat the interviewer who sent you this test as the "product manager" and a
// as a teammate on your product team. Feel free to ask as many questions as you
// need to in order to do your best to solve the tasks assigned to you. The
// quantity, frequency, and quality of questions will not be held against you.
//
// TASKS:
// * Display a table of humans alphabetically sorted by last name or whatever
//   is closest to last, e.g. "Bail Prestor Organa" would be sorted based on
//   "Organa", "Qui-gon Jinn"'s last name is "Jinn", while "Dooku" would simply
//   be sorted by 'Dooku.'
// * Each table row should display the human's name, height (written in meters,
//   i.e. 1.77m), mass (written in kilograms, i.e. 76kg), and hair color.
// * To help our end users get a quick summary of some interesting data points,
//   please create a dashboard of data highlights above the table that displays:
//   - The average mass of all humans in the table.
//   - The name and height of the tallest human.
//   - The most common hair color of all humans.
//
// REQUIREMENTS:
// You may use whatever libraries and/or frameworks (including jQuery) you would like.
// Assume that we are only concerned about building for modern web browsers - specifically
// the current stable release of Chrome. Some initial code is provided to get you started,
// though you may refactor this as you see fit.

/**
 * Fetches data from a given API endpoint.
 * @param {string} url - URL of the API endpoint.
 * @return {Promise} - Promise that resolves as a JSON object of the response.
 */
function fetchData(url) {
  return fetch(url).then((resp) => resp.json());
}

/**
 * Returns text wrapped in a element with provided tag name. Optionally, an
 * array of CSS class names can be added to the wrapping element.
 * @param {string} tagName - HTML tag name.
 * @param {string} text - Text content of the element.
 * @param {Array.<string>} [cssClasses] - Class names to add to the element.
 * @return {HTMLElement}
 */
function constructElement(tagName, text, cssClasses) {
  const el = document.createElement(tagName);
  const content = document.createTextNode(text);
  el.appendChild(content);
  if (cssClasses) {
    el.classList.add(...cssClasses);
  }
  return el;
}

/**
 * Given an array of strings (data), this returns a table row element with <td>
 * children wrapping each item in the data array.
 * @param {Array.<string>} [data] - Data to display in table cells.
 * @return {HTMLElement}
 */
function constructTableRow(data) {
  const row = document.createElement('tr');
  data.forEach((datum) => {
    row.appendChild(constructElement('td', datum));
  });
  return row;
}

// Sample process of adding a row to the table.
// TODO: Show all the humans.
const swTable = document.getElementById('sw-table').getElementsByTagName('tbody')[0];

fetchData('https://swapi.co/api/people/').then((data) => {


//initializing variables and arrays.
  const allHumans = []; //my array of objects
  const firstNames = [];
  const lastNames = [];
  const fullNames = [];
  const lastNameFirstFullNames = [];
  const meterConversion = 0.0254;

  let mass = 0;
  let totalMassArray = [];
  let heightArray = [];
  let tallestHumanSlice;
  let hairColors = [];

///Adds objects from API to the allHumans array.
  allHumans.push(data);
  console.log(allHumans);

//For loop for splitting name key into first and last name and then saving them in an array.
  for (var i = 0; i < allHumans[0].results.length; i++) {

    const firstName = allHumans[0].results[i].name.split(" ")[0];
    const lastName = allHumans[0].results[i].name.split(" ")[1];

    allHumans[0].results[i].firstName = firstName;
    allHumans[0].results[i].lastName = lastName;

    // adds data retruned from API request to HTML table based on key
    // TODO: Format height and mass.

    const row = constructTableRow([
      allHumans[0].results[i].name,
      allHumans[0].results[i].height * meterConversion + "m" ,
      allHumans[0].results[i].mass + "kg",
      allHumans[0].results[i].hair_color.toUpperCase(),
    ]);

    swTable.appendChild(row);

  }


  const massReducer = (accumulator, currentValue) => accumulator + currentValue;


  //////////////Average mass////////////////////////////
  for (var i = 0; i < allHumans[0].results.length; i++) {
    let totalMass = mass + parseInt(allHumans[0].results[i].mass);
    totalMassArray.push(totalMass);
  };

  const totalMassSum = totalMassArray.reduce(massReducer);
  const massAverage = totalMassSum/totalMassArray.length;

  $(".mass").append("<h5>" + massAverage + "</h5>");


  /////////////Popular hair caolor//////////////////////
  for (var i = 0; i < allHumans[0].results.length; i++) {
    hairColors.push(allHumans[0].results[i].hair_color);
  }

  // let colorsOnly = hairColors.filter(if (hairColors[i] != "n/a") {
  //   return colorsOnly;
  // });
  //
  // console.log(colorsOnly);
  // console.log(hairColors);


  /////////////////Tallest human//////////////////////////
  for (var i = 0; i < allHumans[0].results.length; i++) {
    let humanHeight = parseInt(allHumans[0].results[i].height) * meterConversion;
    let human = allHumans[0].results[i].name;
    let humanPlusHeight = {human: human, height: humanHeight};
    heightArray.push(humanPlusHeight);
  };


  ///////////////////Sort by Object Key function/////////////////
  function sortByKey(array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

  sortedHeights = sortByKey(heightArray, 'height');
  tallestHumanSlice = sortedHeights.slice(-1)[0].human;

  console.log(heightArray);
  console.log(sortedHeights);
  console.log(tallestHumanSlice);

  $(".tallest").append("<h5>" + tallestHumanSlice + "</h5>")

});
