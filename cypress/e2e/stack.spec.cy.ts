describe('Stack page works correctly', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/stack');

    cy.get('[class^=input_input_]').as('input');
    cy.get('button').contains('Добавить').parent().as('addBtn');
    cy.get('button').contains('Удалить').parent().as('delBtn');
    cy.get('button').contains('Очистить').parent().as('clrBtn');
  });
  it('если в инпуте пусто, то кнопка добавления недоступна', function () {
    cy.get('@input').should('have.value', '');
    cy.get('@addBtn').should('be.disabled');

    cy.get('@input').type('test').should('have.value', 'test');
    cy.get('@addBtn').should('not.be.disabled');

    cy.get('@input').clear().should('have.value', '');
    cy.get('@addBtn').should('be.disabled');
  });

  it('элемент правильно добавляется в стэк', function () {
    cy.get('@input').type('777');
    cy.get('@addBtn').click();
    cy.get('@input').should('have.value', '');

    cy.get('[class*=circle_content]').should('have.length', 1).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_changing]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('top');
      }
    });

    cy.wait(500);

    cy.get('[class*=circle_content]').should('have.length', 1).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('top');
      }
    });

    cy.wait(500);

    cy.get('@input').type('666');
    cy.get('@addBtn').click();
    cy.get('@input').should('have.value', '');

    cy.get('[class*=circle_content]').should('have.length', 2).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('top').should('not.exist');
      }
      if (index === 1) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('1');
        cy.wrap($el).contains('top');
      }
    });
  });

  it('элемент правильно удаляется из стэка', function () {
    cy.get('@delBtn').should('be.disabled');
    cy.get('@input').type('777');
    cy.get('@addBtn').click();
    cy.get('@input').should('have.value', '');
    cy.get('@delBtn').should('not.be.disabled');
    cy.wait(500);
    cy.get('@input').type('666');
    cy.get('@addBtn').click();
    cy.get('@input').should('have.value', '');
    cy.get('@delBtn').should('not.be.disabled');
    cy.wait(500);

    cy.get('[class*=circle_content]').should('have.length', 2).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('top').should('not.exist');
      }
      if (index === 1) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('1');
        cy.wrap($el).contains('top');
      }
    });

    cy.get('@delBtn').click();

    cy.get('[class*=circle_content]').should('have.length', 2).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('top').should('not.exist');
      }
      if (index === 1) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_changing]');
        cy.wrap($el).children('p').contains('1');
        cy.wrap($el).contains('top');
      }
    });

    cy.wait(500);

    cy.get('[class*=circle_content]').should('have.length', 1).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('top');
      }
    });

  });

  it('кнопка "Очистить" работает прапвильно', function () {
    cy.get('@clrBtn').should('be.disabled');
    cy.get('@input').type('777');
    cy.get('@addBtn').click();
    cy.get('@input').should('have.value', '');
    cy.get('@clrBtn').should('not.be.disabled');
    cy.wait(500);
    cy.get('@input').type('666');
    cy.get('@addBtn').click();
    cy.get('@input').should('have.value', '');
    cy.get('@clrBtn').should('not.be.disabled');
    cy.wait(500);

    cy.get('[class*=circle_content]').should('have.length', 2).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('top').should('not.exist');
      }
      if (index === 1) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('1');
        cy.wrap($el).contains('top');
      }
    });

    cy.get('@clrBtn').click();

    cy.get('[class*=circle_content]').should('not.exist');
    cy.get('@clrBtn').should('be.disabled');
  });

});