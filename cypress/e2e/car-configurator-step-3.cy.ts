describe('Summary', () => {
  it('All values are summarized, prices are using the currency pipe, the total is correctly calculated', () => {
    cy.visit('/');
    cy.wait(500);

    cy.get('#modelSelect').select('S');
    cy.get('#step2').click();

    cy.get('#configSelect').select('1');
    cy.get('#includeYoke').check();

    cy.get('#step3').click();
    cy.url().should('include', 'summary');

    cy.get('[data-cy="summary-yoke"]').should('exist');
    cy.get('[data-cy="summary-tow"]').should('not.exist');
    cy.get('[data-cy="summary-model-description"]').should(
      'include.text',
      'Your Tesla Model S',
    );
    cy.get('[data-cy="summary-selected-config-description"]').should(
      'include.text',
      'Dual Motor All-Wheel Drive',
    );
    cy.get('[data-cy="summary-config-description"]').should(
      'include.text',
      'Range: 405 miles - Max speed: 149',
    );
    cy.get('[data-cy="summary-selected-config-price"]').should(
      'include.text',
      '$74,990.00',
    );

    cy.get('[data-cy="summary-selected-color-description"]').should(
      'include.text',
      'Pearl White Multi-Coat',
    );
    cy.get('[data-cy="summary-selected-color-price"]').should(
      'include.text',
      '$0.00',
    );

    cy.get('[data-cy="summary-total"]').should('include.text', '$75,990.00');
  });

  it('The user should be able to go back to step 1 or 2 and change the configuration.', () => {
    cy.visit('/');
    cy.wait(500);

    cy.get('#modelSelect').select('S');
    cy.get('#step2').click();

    cy.get('#configSelect').select('1');
    cy.get('#includeYoke').check();

    cy.get('#step3').click();
    cy.get('[data-cy="summary-total"]').should('include.text', '$75,990.00');

    cy.get('#step2').click();
    cy.get('#configSelect').select('2');

    cy.get('#step3').click();
    cy.get('[data-cy="summary-model-description"]').should(
      'include.text',
      'Your Tesla Model S',
    );
    cy.get('[data-cy="summary-selected-config-description"]').should(
      'include.text',
      'Plaid - Tri Motor All-Wheel Drive',
    );
    cy.get('[data-cy="summary-config-description"]').should(
      'include.text',
      'Range: 396 miles - Max speed: 200',
    );
    cy.get('[data-cy="summary-total"]').should('include.text', '$90,990.00');

    cy.get('#step1').click();
    cy.get('#modelSelect').select('C');
    cy.get('#step2').click();

    cy.get('#configSelect').select('1');
    cy.get('#includeTow').check();
    cy.get('#step3').click();

    cy.get('[data-cy="summary-model-description"]').should(
      'include.text',
      'Your Tesla Cybertruck',
    );
    cy.get('[data-cy="summary-selected-config-description"]').should(
      'include.text',
      'Rear Wheel Drive',
    );
    cy.get('[data-cy="summary-config-description"]').should(
      'include.text',
      'Range: 250 miles - Max speed: 110',
    );
    cy.get('[data-cy="summary-tow"]').should('exist');
    cy.get('[data-cy="summary-total"]').should('include.text', '$61,990.00');
  });
});
