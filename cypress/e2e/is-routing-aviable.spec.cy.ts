describe('app works correctly with routes', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it('should open main by default', function() {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('should open Строка page after click on Строка', function() {
    cy.get('a[href*="recursion"]').click();
    cy.contains('Строка');
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('should open Фибоначчи page after click on Фибоначчи', function() {
    cy.get('a[href*="fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи');
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('should open Сортировка массива page after click on Сортировка массива', function() {
    cy.get('a[href*="sorting"]').click();
    cy.contains('Сортировка массива');
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('should open Стек page after click on Стек', function() {
    cy.get('a[href*="stack"]').click();
    cy.contains('Стек');
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('should open Очередь page after click on Очередь', function() {
    cy.get('a[href*="queue"]').click();
    cy.contains('Очередь');
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('should open Связный список page after click on Связный список', function() {
    cy.get('a[href*="list"]').click();
    cy.contains('Связный список');
    cy.get('button').contains('К оглавлению').click();
    cy.contains('МБОУ АЛГОСОШ');
  });

});