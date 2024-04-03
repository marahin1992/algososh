describe('Queue page works correctly', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/queue');

    cy.get('[class^=input_input_]').as('input');
    cy.get('button').contains('Добавить').parent().as('addBtn');
    cy.get('button').contains('Удалить').parent().as('delBtn');
    cy.get('button').contains('Очистить').parent().as('clrBtn');
    cy.get('[class*=circle_content]').first().as('firstElement');
    cy.get('[class*=circle_content]').eq(1).as('secondElement');
  });
  it('если в инпуте пусто, то кнопка добавления недоступна', function () {
    cy.get('@input').should('have.value', '');
    cy.get('@addBtn').should('be.disabled');

    cy.get('@input').type('test').should('have.value', 'test');
    cy.get('@addBtn').should('not.be.disabled');

    cy.get('@input').clear().should('have.value', '');
    cy.get('@addBtn').should('be.disabled');
  });

  it('элемент правильно добавляется в очередь', function () {
    cy.get('@input').type('777');
    cy.get('@addBtn').click();
    cy.get('@input').should('have.value', '');


    cy.get('@firstElement').contains('777');
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').contains('tail');
    cy.get('@firstElement').children('[class*=circle_changing]');
    cy.wait(500);
    cy.get('@firstElement').children('[class*=circle_default]');

    cy.get('input').type('666');
    cy.get('@addBtn').click();

    cy.get('@secondElement').children('[class*=circle_changing]');
    cy.wait(500);
    cy.get('@secondElement').children('[class*=circle_default]');

    cy.get('[class*=circle_content]').should('have.length', 7).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('777');
        cy.wrap($el).contains('head');
      }
      if (index === 1) {
        cy.wrap($el).contains('666');
        cy.wrap($el).contains('tail');
      }
    });
  });

  it('элемент правильно удаляется из очереди', function () {
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

    cy.get('[class*=circle_content]').should('have.length', 7).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('777');
        cy.wrap($el).contains('head');
      }
      if (index === 1) {
        cy.wrap($el).contains('666');
        cy.wrap($el).contains('tail');
      }
    });

    cy.get('@delBtn').click();

    cy.get('@firstElement').contains('777');
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').children('[class*=circle_changing]');
    cy.get('@secondElement').contains('head').should('not.exist');
    cy.wait(500);
    cy.get('@firstElement').children('[class*=circle_default]');
    cy.get('@firstElement').contains('head').should('not.exist');
    cy.get('@firstElement').contains('777').should('not.exist');
    cy.get('@secondElement').contains('head');
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

    cy.get('[class*=circle_content]').should('have.length', 7).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('777');
        cy.wrap($el).contains('head');
      }
      if (index === 1) {
        cy.wrap($el).contains('666');
        cy.wrap($el).contains('tail');
      }
    });

    cy.get('@clrBtn').click();

    cy.get('[class*=circle_content]').should('have.length', 7).each(($el, index) => {
      cy.wrap($el).children('[class*=circle_circle]').children().should('have.text', "")
      cy.wrap($el).contains('head').should('not.exist');
      cy.wrap($el).contains('tail').should('not.exist');;
    });
  });

});