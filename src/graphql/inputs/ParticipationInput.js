const ParticipationInput = `
  input ParticipationInput {
    user: ID!
    boat: ID!
  }
`;

module.exports.schema = () => [ParticipationInput];
