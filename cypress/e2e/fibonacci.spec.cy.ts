describe('Fibonacci page works correctly', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/fibonacci');
  });
  it('если в инпуте пусто, то кнопка добавления недоступна', function () {
    cy.get('[class^=input_input_]').as('input');
    cy.get('button[type="submit"]').as('button');

    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');

    cy.get('@input').type('7').should('have.value', '7');
    cy.get('@button').should('not.be.disabled');

    cy.get('@input').clear().should('have.value', '');
    cy.get('@button').should('be.disabled');
  });

  it('что числа генерируются корректно', function () {
    cy.get('[class^=input_input_]').as('input');
    cy.get('button[type="submit"]').as('button');

    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');

    cy.get('@input').type('3').should('have.value', '3');
    cy.get('@button').should('not.be.disabled').click();

    cy.wait(500);

    cy.get('[class*=circle_content]').should('have.length', 1).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('1');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
      }
    });

    cy.wait(500);

    cy.get('[class*=circle_content]').should('have.length', 2).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('1');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
      }
      if (index === 1) {
        cy.wrap($el).contains('1');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('1');
      }
    });

    cy.wait(500);

    cy.get('[class*=circle_content]').should('have.length', 3).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('1');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');

      }
      if (index === 1) {
        cy.wrap($el).contains('1');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('1');
      }
      if (index === 2) {
        cy.wrap($el).contains('2');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('2');
      }
    });

    cy.wait(500);

    cy.get('[class*=circle_content]').should('have.length', 4).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('1');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
      }
      if (index === 1) {
        cy.wrap($el).contains('1');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('1');
      }
      if (index === 2) {
        cy.wrap($el).contains('2');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('2');
      }
      if (index === 3) {
        cy.wrap($el).contains('3');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('3');
      }
    });

    

    cy.get('@input').clear().should('have.value', '');
    cy.get('@button').should('be.disabled');
  });



});