import { AlertButtonComponent } from './alert-button.component';


describe('AlertButtonComponent', () => {

  it('should increment the vote ', () => {

  // Arrange
  const component = new AlertButtonComponent();

  // Act
  component.upVotes();

  // Asert
  expect(component.totalVote).toBe(1);

  });

 });
