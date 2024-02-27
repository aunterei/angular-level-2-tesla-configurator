describe('Model and Color selection', () => {
  it(
    'The two dropdowns must have an HTML attribute ID equal to modelSelect and colorSelect. ' +
      'The colorSelect appears when the model is selected with a default value.',
    () => {
      cy.visit('/');
      cy.wait(500);
      cy.get('#modelSelect').should('exist');

      cy.get('#colorSelect').should('not.exist');

      cy.get('#modelSelect').select('Model S');

      cy.get('#colorSelect').should('exist');
      cy.get('#colorSelect').invoke('val').should('eq', 'white');
    },
  );

  it('When a Model and Color are selected, the proper image should be displayed on the screen.', () => {
    const selectedModel: string = 'S';
    const selectedColor: string = 'red';
    cy.visit('/');
    cy.wait(500);
    cy.get('[data-cy="img-container"]').should('not.exist');
    cy.get('#modelSelect').select(selectedModel);
    cy.get('#colorSelect').select(selectedColor);
    cy.get('[data-cy="img-container"]').should('exist');
    cy.get('[data-cy="img-container"]')
      .find('img')
      .should('have.attr', 'src')
      .should(
        'include',
        `tesla-app/images/${selectedModel}/${selectedColor}.jpg`,
      );
  });
});

describe('Navigation', () => {
  it('The step buttons must have IDs of step1, step2, and step3 respectively.', function () {
    cy.visit('/');
    cy.get('#step1').should('exist');
    cy.get('#step2').should('exist');
    cy.get('#step3').should('exist');
  });

  it(
    'Step 2 navigation at the top of the screen must be disabled as long as the user hasn’t selected a model and color. ' +
      'If the url is accessed, the app should redirect to home.',
    () => {
      cy.visit('/');

      cy.get('#step2').click();
      cy.url().should('include', '/model-selection');

      cy.visit('/options-selection');
      cy.url().should('include', '/model-selection');
    },
  );
});
