describe('Options selection', () => {
  it(
    'The dropdowns must have an HTML ID equal to configSelect, and if tow hitch or yoke are available, ' +
      'those checkboxes must have an ID of includeYoke and includeTow.',
    () => {
      cy.visit('/');
      cy.wait(500);

      cy.get('#modelSelect').select('C');
      cy.get('#step2').click();

      cy.get('#includeYoke').should('exist');
      cy.get('#includeTow').should('exist').should('not.be.checked');
      cy.get('#configSelect').should('exist').should('not.be.checked');
    },
  );

  it('Yoke and steering must be displayed (not checked) only if available', () => {
    cy.visit('/');
    cy.wait(500);

    cy.get('#modelSelect').select('S');
    cy.get('#step2').click();

    cy.get('#includeYoke').should('exist').should('not.be.checked');
  });

  it('When a config is selected, display the associated range, max speed, and cost', function () {
    cy.visit('/');
    cy.wait(500);

    cy.get('#modelSelect').select('S');
    cy.get('#step2').click();

    cy.get('[data-cy="config-description"]').should('not.exist');
    cy.get('#configSelect').select('1');
    cy.get('[data-cy="config-description"]')
      .should('exist')
      .should('have.text', 'Range: 405 - Max speed: 149 - Cost: $74,990.00');
  });
});

describe('Navigation', () => {
  it('Once the model and the color are selected, we can visit Step 2. But not step 3.', function () {
    cy.visit('/');
    cy.wait(500);
    cy.get('#modelSelect').select('S');

    cy.get('#step2').click();
    cy.url().should('include', '/options-selection');

    cy.get('#step3').click();
    cy.url().should('include', '/options-selection');
  });
});
