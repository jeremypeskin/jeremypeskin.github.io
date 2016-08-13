var addButton = document.getElementById("add-button");
var savedPropertiesTable = document.getElementById("saved-properties-table");
var nameInput = document.getElementById("name-input");
localStorage.setItem("savedName", nameInput.value);
var priceInput = document.getElementById("price-input");
var rentInput = document.getElementById("rent-input");
var maintenanceInput = document.getElementById("maintenance-input");
var propertyTaxInput = document.getElementById("property-tax-input");
var utilitiesAndInsuranceInput = document.getElementById("utilities-and-insurance-input");

var createNewProperty = function(name, price, rent, maintenance, propertyTax, utilitiesAndInsurance) {
	console.log("Create new property...");
	//Create a new property
	var newProperty = savedPropertiesTable.insertRow();
		//Property's name
		var propertyName = newProperty.insertCell(0); // name
		//Property's Price
		var propertyPrice = newProperty.insertCell(1); // price
		//Property's Rent
		var propertyRent = newProperty.insertCell(2); // rent
		//Property's cap rate
		var propertyCapRate = newProperty.insertCell(3); // cap rate
		//  Button row
		var buttonCell = newProperty.insertCell(4);  //Button cell
		// Delete button
		var deleteButton = document.createElement("button"); // Delete button

	// Append the delete button to the button cell
	buttonCell.appendChild(deleteButton);


	//Calculate the cap rate
	capRate = function() {
		var grossIncome = rent * 12;
		var operatingExpenses = (+maintenance) + (+propertyTax) + (+utilitiesAndInsurance);
		var netIncome = grossIncome - operatingExpenses;
		var annualNetIncome = netIncome;
		var rawValue = (annualNetIncome / price * 100).toFixed(2);

		return rawValue + '%';
	};

	//Modify each element
	propertyName.innerText = name;
	propertyPrice.innerText = "$" + price;
	propertyRent.innerText = "$" + rent;
	propertyCapRate.innerText = capRate();
	deleteButton.innerText = "Delete";
	deleteButton.className = "btn btn-default delete";

	return newProperty;
};

//When the Add Button is clicked, add a new property to Saved Properties Table
var addProperty = function() {
	console.log("Add new property...");
	//Create a new property row with its own values
	var newProperty = createNewProperty(savedName, priceInput.value, rentInput.value, maintenanceInput.value, propertyTaxInput.value, utilitiesAndInsuranceInput.value);
	bindTaskEvents(newProperty);
};

//Set the click handler to the addProperty function
addButton.addEventListener("click", addProperty);

//Delete task
var deleteTask = function() {
	console.log("Delete task...");
	var tableCell = this.parentNode;
	var tableRow = tableCell.parentNode;
	var table = tableRow.parentNode;
	table.removeChild(tableRow);
};

//Bind task events
var bindTaskEvents = function(newProperty) {
	console.log("Bind task events...");
	deleteButton = newProperty.querySelector("button.delete");
	deleteButton.addEventListener("click", deleteTask);
};

//Cycle over savedPropertiesTable items and bind task events to each
for(var i=0; i<savedPropertiesTable.rows.length; i++) {
	//for each properties, bind the property's children
	bindTaskEvents(savedPropertiesTable.rows[i]);
}
