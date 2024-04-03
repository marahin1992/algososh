describe('List page works correctly', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/list');

    cy.get('input').first().as('valInput');
    cy.get('input').last().as('idInput');
    cy.get('button').contains('Добавить в head').parent().as('headAddBtn');
    cy.get('button').contains('Добавить в tail').parent().as('tailAddBtn');
    cy.get('button').contains('Удалить из head').parent().as('headDelBtn');
    cy.get('button').contains('Удалить из tail').parent().as('tailDelBtn');
    cy.get('button').contains('Добавить по индексу').parent().as('idAddBtn');
    cy.get('button').contains('Удалить по индексу').parent().as('idDelBtn');
  });

  it('если в инпуте пусто, то кнопки добавления недоступны', function () {
    cy.get('@valInput').should('have.value', '');
    cy.get('@idInput').should('have.value', '');
    cy.get('@headAddBtn').should('be.disabled');
    cy.get('@tailAddBtn').should('be.disabled');
    cy.get('@idAddBtn').should('be.disabled');
    cy.get('@idDelBtn').should('be.disabled');

    cy.get('@valInput').type('test').should('have.value', 'test');
    cy.get('@headAddBtn').should('not.be.disabled');
    cy.get('@tailAddBtn').should('not.be.disabled');
    cy.get('@idAddBtn').should('be.disabled');
    cy.get('@idDelBtn').should('be.disabled');

    cy.get('@valInput').clear().should('have.value', '');
    cy.get('@headAddBtn').should('be.disabled');
    cy.get('@tailAddBtn').should('be.disabled');
    cy.get('@idAddBtn').should('be.disabled');
    cy.get('@idDelBtn').should('be.disabled');
  });

  it('элементы добавляются правильно', function () {
    cy.get('[class*=circle_content]').should('not.exist');
    cy.get('@valInput').type('777');
    cy.get('@headAddBtn').click();
    cy.get('@valInput').should('have.value', '');

    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 1).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_modified]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }
    });

    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 1).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }
    });
    //добавляем в head
    cy.get('@valInput').type('666');
    cy.get('@headAddBtn').click();
    cy.get('@valInput').should('have.value', '');

    cy.get('[class*=list-page_circles]').children().should('have.length', 1).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('666').parent('[class*=circle_changing]');
      }
    });

    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 2).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_modified]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
        cy.wrap($el).contains('tail');
      }
    });

    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 2).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
        cy.wrap($el).contains('tail');
      }
    });

    //добавляем в tail
    cy.get('@valInput').type('555');
    cy.get('@tailAddBtn').click();
    cy.get('@valInput').should('have.value', '');

    cy.get('[class*=list-page_circles]').children().should('have.length', 2).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
        cy.wrap($el).contains('tail');
        cy.wrap($el).contains('555').parent('[class*=circle_changing]');
      }
    });

    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 3).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
        cy.wrap($el).contains('tail').should('not.exist');
      }

      if (index === 2) {
        cy.wrap($el).contains('555');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_modified]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
        cy.wrap($el).contains('tail');
      }
    });

    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 3).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
        cy.wrap($el).contains('tail').should('not.exist');
      }

      if (index === 2) {
        cy.wrap($el).contains('555');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
        cy.wrap($el).contains('tail');
      }
    });

    //добавляем по индексу
    cy.get('@valInput').type('444');
    cy.get('@idInput').type('1');
    cy.get('@idAddBtn').should('not.be.disabled').click();
    cy.get('@valInput').should('have.value', '');
    cy.get('@idInput').should('have.value', '');

    cy.get('[class*=list-page_circles]').children().should('have.length', 3).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        //cy.wrap($el).contains('head');
        cy.wrap($el).contains('444').parent('[class*=circle_changing]');
      }

      if (index === 1) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
        cy.wrap($el).contains('tail').should('not.exist');
      }

      if (index === 2) {
        cy.wrap($el).contains('555');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
        cy.wrap($el).contains('tail');
      }
    });

    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 3).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_changing]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
        cy.wrap($el).contains('444').parent('[class*=circle_changing]');
      }

      if (index === 2) {
        cy.wrap($el).contains('555');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
        cy.wrap($el).contains('tail');
      }
    });

    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 4).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('444');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_modified]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
      }

      if (index === 2) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
      }

      if (index === 3) {
        cy.wrap($el).contains('555');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('3');
        cy.wrap($el).contains('tail');
      }
    });

    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 4).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('444');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
      }

      if (index === 2) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
      }

      if (index === 3) {
        cy.wrap($el).contains('555');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('3');
        cy.wrap($el).contains('tail');
      }
    });

  });

  it('элемент правильно удаляется из head и tail списка', function () {
    cy.get('@headDelBtn').should('be.disabled');
    cy.get('@tailDelBtn').should('be.disabled');
    cy.get('@valInput').type('777');
    cy.get('@headAddBtn').click();
    cy.get('@valInput').should('have.value', '');
    cy.get('@headDelBtn').should('not.be.disabled');
    cy.get('@tailDelBtn').should('not.be.disabled');
    cy.wait(500);
    cy.get('@valInput').type('666');
    cy.get('@headAddBtn').click();
    cy.get('@valInput').should('have.value', '');
    cy.get('@headDelBtn').should('not.be.disabled');
    cy.get('@tailDelBtn').should('not.be.disabled');
    cy.wait(500);
    cy.get('@valInput').type('555');
    cy.get('@headAddBtn').click();
    cy.get('@valInput').should('have.value', '');
    cy.get('@headDelBtn').should('not.be.disabled');
    cy.get('@tailDelBtn').should('not.be.disabled');
    cy.wait(500);
    cy.get('@valInput').type('444');
    cy.get('@headAddBtn').click();
    cy.get('@valInput').should('have.value', '');
    cy.get('@headDelBtn').should('not.be.disabled');
    cy.get('@tailDelBtn').should('not.be.disabled');
    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 4).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('444');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('555');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
      }

      if (index === 2) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
      }

      if (index === 3) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('3');
        cy.wrap($el).contains('tail');
      }
    });
    //удаляем из head
    cy.get('@headDelBtn').click();

    cy.get('[class*=list-page_circles]').children().should('have.length', 4).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).children('[class*=circle_default]').should('not.have.text', '444');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
        cy.wrap($el).contains('444').parent('[class*=circle_changing]');
      }

      if (index === 1) {
        cy.wrap($el).contains('555');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
      }

      if (index === 2) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
      }

      if (index === 3) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('3');
        cy.wrap($el).contains('tail');
      }
    });

    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 3).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('555');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
      }

      if (index === 2) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
        cy.wrap($el).contains('tail');
      }
    });

    //удаляем из tail
    cy.get('@tailDelBtn').click();

    cy.get('[class*=list-page_circles]').children().should('have.length', 3).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('555');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
      }

      if (index === 2) {
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]').should('not.have.text', '777');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
        cy.wrap($el).contains('777').parent('[class*=circle_changing]');
      }
    });

    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 2).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('555');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
        cy.wrap($el).contains('tail');
      }

    });

  });

  it('элемент правильно удаляется по индексу', function () {
    cy.get('@headDelBtn').should('be.disabled');
    cy.get('@tailDelBtn').should('be.disabled');
    cy.get('@valInput').type('777');
    cy.get('@headAddBtn').click();
    cy.get('@valInput').should('have.value', '');
    cy.get('@headDelBtn').should('not.be.disabled');
    cy.get('@tailDelBtn').should('not.be.disabled');
    cy.wait(500);
    cy.get('@valInput').type('666');
    cy.get('@headAddBtn').click();
    cy.get('@valInput').should('have.value', '');
    cy.get('@headDelBtn').should('not.be.disabled');
    cy.get('@tailDelBtn').should('not.be.disabled');
    cy.wait(500);
    cy.get('@valInput').type('555');
    cy.get('@headAddBtn').click();
    cy.get('@valInput').should('have.value', '');
    cy.get('@headDelBtn').should('not.be.disabled');
    cy.get('@tailDelBtn').should('not.be.disabled');
    cy.wait(500);
    cy.get('@valInput').type('444');
    cy.get('@headAddBtn').click();
    cy.get('@valInput').should('have.value', '');
    cy.get('@headDelBtn').should('not.be.disabled');
    cy.get('@tailDelBtn').should('not.be.disabled');
    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 4).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('444');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('555');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
      }

      if (index === 2) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
      }

      if (index === 3) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('3');
        cy.wrap($el).contains('tail');
      }
    });
    //удаляем из по индексу "1"

    cy.get('@idInput').type('1');
    cy.get('@idDelBtn').should('not.be.disabled').click();

    cy.get('[class*=list-page_circles]').children().should('have.length', 4).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('444');
        cy.wrap($el).children('[class*=circle_changing]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('555');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
      }

      if (index === 2) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
      }

      if (index === 3) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('3');
        cy.wrap($el).contains('tail');
      };

    });

    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 4).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('444');
        cy.wrap($el).children('[class*=circle_changing]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('555');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_changing]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
      }

      if (index === 2) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
      }

      if (index === 3) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('3');
        cy.wrap($el).contains('tail');
      };

    });

    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 4).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('444');
        cy.wrap($el).children('[class*=circle_changing]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_changing]').should('not.have.text', '555');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
        cy.wrap($el).contains('555').parent('[class*=circle_changing]');
      }

      if (index === 2) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
      }

      if (index === 3) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('3');
        cy.wrap($el).contains('tail');
      };

    });

    cy.wait(500);

    cy.get('[class*=list-page_circles]').children().should('have.length', 3).each(($el, index) => {
      if (index === 0) {
        cy.wrap($el).contains('444');
        cy.wrap($el).children('[class*=circle_default]');
        cy.wrap($el).children('p').contains('0');
        cy.wrap($el).contains('head');
      }

      if (index === 1) {
        cy.wrap($el).contains('666');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('1');
      }

      if (index === 2) {
        cy.wrap($el).contains('777');
        cy.wrap($el).children('[class*=circle_content]').children('[class*=circle_default]');
        cy.wrap($el).children('[class*=circle_content]').children('p').contains('2');
        cy.wrap($el).contains('tail');
      };

    });




  });


});