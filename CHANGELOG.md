Diagnosis endpoints

1. Create diagnosis

POST http://localhost:3000/diagnosis

body {
"symptoms": [
"yellow_leaves",
"wilting_stem"
]
}

Remove create disease and now used prolog KB for diagnoses

http://localhost:3000/prolog/diagnose?symptoms=wilting_stem,yellow_leaves

{"result":["[fusarium_wilt-0.9,fusarium_wilt-0.8,vine_mite-0.8,waterlogging-0.8]"]}
