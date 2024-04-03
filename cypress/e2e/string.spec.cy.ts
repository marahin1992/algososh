describe('String page works correctly', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/recursion');
  });
  it('если в инпуте пусто, то кнопка добавления недоступна', function () {
    cy.get('[class^=input_input_]').as('input');
    cy.get('button[type="submit"]').as('button');

    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');

    cy.get('@input').type('test').should('have.value', 'test');
    cy.get('@button').should('not.be.disabled');

    cy.get('@input').clear().should('have.value', '');
    cy.get('@button').should('be.disabled');
  });

  it('строка разворачивается корректно', function () {
    cy.get('[class^=input_input_]').as('input');
    cy.get('button[type="submit"]').as('button');

    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');

    cy.get('@input').type('cake').should('have.value', 'cake');
    cy.get('@button').should('not.be.disabled').click();

    cy.wait(1000);

    cy.get('[class*=circle_content]').should('have.length', 4).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('c');
        cy.wrap($el).children('[class*=circle_default]');
      }
      if (index === 1) {
        cy.wrap($el).contains('a');
        cy.wrap($el).children('[class*=circle_default]');
      }
      if (index === 2) {
        cy.wrap($el).contains('k');
        cy.wrap($el).children('[class*=circle_default]');
      }
      if (index === 3) {
        cy.wrap($el).contains('e');
        cy.wrap($el).children('[class*=circle_default]');
      }
    });

    cy.wait(1000);

    cy.get('[class*=circle_content]').should('have.length', 4).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('c');
        cy.wrap($el).children('[class*=circle_changing]');
      }
      if (index === 1) {
        cy.wrap($el).contains('a');
        cy.wrap($el).children('[class*=circle_default]');
      }
      if (index === 2) {
        cy.wrap($el).contains('k');
        cy.wrap($el).children('[class*=circle_default]');
      }
      if (index === 3) {
        cy.wrap($el).contains('e');
        cy.wrap($el).children('[class*=circle_changing]');
      }
    });

    cy.wait(1000);

    cy.get('[class*=circle_content]').should('have.length', 4).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('e');
        cy.wrap($el).children('[class*=circle_modified]');
      }
      if (index === 1) {
        cy.wrap($el).contains('a');
        cy.wrap($el).children('[class*=circle_default]');
      }
      if (index === 2) {
        cy.wrap($el).contains('k');
        cy.wrap($el).children('[class*=circle_default]');
      }
      if (index === 3) {
        cy.wrap($el).contains('c');
        cy.wrap($el).children('[class*=circle_modified]');
      }
    });

    cy.wait(1000);

    cy.get('[class*=circle_content]').should('have.length', 4).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('e');
        cy.wrap($el).children('[class*=circle_modified]');
      }
      if (index === 1) {
        cy.wrap($el).contains('a');
        cy.wrap($el).children('[class*=circle_changing]');
      }
      if (index === 2) {
        cy.wrap($el).contains('k');
        cy.wrap($el).children('[class*=circle_changing]');
      }
      if (index === 3) {
        cy.wrap($el).contains('c');
        cy.wrap($el).children('[class*=circle_modified]');
      }
    });

    cy.wait(1000);

    cy.get('[class*=circle_content]').should('have.length', 4).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('e');
        cy.wrap($el).children('[class*=circle_modified]');
      }
      if (index === 1) {
        cy.wrap($el).contains('k');
        cy.wrap($el).children('[class*=circle_modified]');
      }
      if (index === 2) {
        cy.wrap($el).contains('a');
        cy.wrap($el).children('[class*=circle_modified]');
      }
      if (index === 3) {
        cy.wrap($el).contains('c');
        cy.wrap($el).children('[class*=circle_modified]');
      }
    });

    cy.get('@input').clear().should('have.value', '');
    cy.get('@button').should('be.disabled');
  });



});