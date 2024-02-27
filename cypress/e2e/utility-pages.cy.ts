describe('Not found page', () => {
  it('When the route does not exist, the application should should the NotFoundComponent', () => {
    cy.visit('/unknown');
    cy.get('[data-cy="not-found-container"]').should('exist');
  });
});
