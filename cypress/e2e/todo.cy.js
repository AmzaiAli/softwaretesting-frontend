/* eslint-disable no-undef */
describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/');
  });

  it('should create a new todo', () => {
    cy.get('input[name="name"]').type('New Todo');
    
    // Wait until the "description" input field becomes available
    cy.get('input[name="description"]', { timeout: 5000 }).should('be.visible').type('This is a new todo item');
  
    cy.get('input[name="isCompleted"]').check();
  
    cy.get('button[type="submit"]').click();
  
    cy.contains('New Todo').should('exist');
  });

  it('should create a new todo with a number in the name', () => {
    cy.get('input[name="name"]').type('123');
    cy.get('input[name="description"]').type('This is a todo with a number in the name');
    cy.get('input[name="isCompleted"]').check();

    cy.get('button[type="submit"]').click();

    cy.contains('123').should('exist');
  });

  it('should not create a new todo without name and description', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Create Todo').should('exist');
  });

  it('should update a todo', () => {
    cy.get('input[name="name"]').eq(0).type('{selectall}Updated Todo');
    cy.get('input[name="description"]').eq(0).type('{selectall}This is an updated todo item');
    cy.get('input[name="isCompleted"]').eq(0).uncheck();

    cy.get('button').contains('Save').click();

    cy.contains('Updated Todo').should('exist');
    cy.contains('This is an updated todo item').should('exist');
    cy.contains('Completed: false').should('exist');
  });

  it('should mark a todo as completed', () => {
    cy.get('button').contains('Edit').first().click();
    cy.get('input[name="isCompleted"]').check();
    cy.get('button').contains('Save').click();

    cy.contains('Completed: true').should('exist');
  });

  it('should delete a todo', () => {
    cy.get('button').contains('Delete').first().click();

    cy.contains('New Todo').should('not.exist');
  });

  it('should filter completed todos', () => {
    // Create a completed todo
    cy.get('input[name="name"]').type('Completed Todo');
    cy.get('input[name="description"]').type('This is a completed todo item');
    cy.get('input[name="isCompleted"]').check();
    cy.get('button[type="submit"]').click();

    // Filter completed todos
    cy.get('button[data-testid="filter-completed"]').click();

    // Check if only completed todos are displayed
    cy.contains('Completed Todo').should('exist');
    cy.contains('New Todo').should('not.exist');
  });

  // New test cases start here

  it('should filter active todos', () => {
    // Create an active todo
    cy.get('input[name="name"]').type('Active Todo');
    cy.get('input[name="description"]').type('This is an active todo item');
    cy.get('input[name="isCompleted"]').uncheck();
    cy.get('button[type="submit"]').click();

    // Filter active todos
    cy.get('button[data-testid="filter-active"]').click();

    // Check if only active todos are displayed
    cy.contains('Active Todo').should('exist');
    cy.contains('Completed Todo').should('not.exist');
  });

  it('should clear completed todos', () => {
    // Create a completed todo
    cy.get('input[name="name"]').type('Completed Todo');
    cy.get('input[name="description"]').type('This is a completed todo item');
    cy.get('input[name="isCompleted"]').check();
    cy.get('button[type="submit"]').click();

    // Clear completed todos
    cy.get('button[data-testid="clear-completed"]').click();

    // Check if completed todo is removed
    cy.contains('Completed Todo').should('not.exist');
  });
});
