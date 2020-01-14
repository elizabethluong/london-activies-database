
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('activities_info').del()
    .then(function () {
      // Inserts seed entries
      return knex('activities_info').insert([
        {activity: 'vinyasa yoga', area: 'kings cross', price: 'medium', type_of_activity: 'wellbeing'},
        {activity: 'rock climbing', area: 'vauxhall', price: 'high', type_of_activity: 'fitness'},
        {activity: 'the tate modern', area: 'bankside', price: 'free', type_of_activity: 'museum'},
        {activity: 'ministry of sound', area: 'elephant and castle', price: 'very high', type_of_activity: 'nightlife'},
      ]);
    });
};
