exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("reviews")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("reviews").insert([
        { review: "Horrible!", activity_id: "1" },
        { review: "this place was great", activity_id: "1" },
        { review: "worst place ever", activity_id: "2" },
        { review: "This place was great", activity_id: "2" },
        { review: "I loved it", activity_id: "3" },
        { review: "would go again but too expensive", activity_id: "4" }
      ]);
    });
};
