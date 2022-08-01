Cypress.Commands.add("resetDatabase", () => {
	cy.request("POST", "http://localhost:5000/reset").as("resetDatabase");
});

Cypress.Commands.add("resetScore", () => {
	cy.request("POST", "http://localhost:5000/reset/score").as("resetScore");
});

Cypress.Commands.add("createRecommendations", () => {
	cy.request("POST", "http://localhost:5000/create/recommendations").as("createRecommendations");
});