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

get diagnose
http://localhost:3000/diseases/diagnose?symptoms=wilting_stem,yellow_leaves

{
"result": [
"[fusarium_wilt-0.9,fusarium_wilt-0.8,vine_mite-0.8,waterlogging-0.8]"
]
}

get advice
http://localhost:3000/advices?disease=fusarium_wilt

{
"result": [
"[Improve soil drainage,Rotate crops,Apply carbendazim]"
]
}

get fertilizer
http://localhost:3000/fertilizer

{
"result": [
"[[0,planting,urea,500],[0,planting,triple_super_phosphate,5000],[0,planting,muriate_of_potash,10000],[0.5,2_weeks_after_planting,urea,45],[0.5,2_weeks_after_planting,triple_super_phosphate,80],[0.5,2_weeks_after_planting,muriate_of_potash,40],[0.5,2_weeks_after_planting,magnesium_sulphate,55]]"
]
}

get harvest

http://localhost:3000/harvest?crop=purple_passion_fruit

{
"result": [
"[90]"
]
}

get nutrition
http://localhost:3000/nutrition

{
"result": [
"[[water,89,percent],[energy,37,kcal],[protein,1.2,percent],[fat,0.2,percent],[carbohydrate,7.7,percent],[fiber,10,mg],[calcium,30,mg],[iron,0.7,mg],[vitamin_a,1968,IU],[vitamin_b,10,mg],[vitamin_c,20,mg],[potassium,13,mg]]"
]
}

recommended variety
POST http://localhost:3000/variety/recommend

{
"zone": "intermediate_zone",
"altitude": 700,
"diseaseProne": false
}

result
{"result":["[[yellow_passion_fruit,0.7]]"]}

recomended fertilizer

POST http://localhost:3000/fertilizer/recommend

{
"zone": "wet_zone",
"stage": "planting"
}

result
{"result":["[[urea,500],[triple_super_phosphate,5000],[muriate_of_potash,10000],[urea,500],[triple_super_phosphate,5000],[muriate_of_potash,10000]]"]}

http://localhost:3000/harvest/check
{
"daysSinceFlowering": 30,
"variety": "yellow_passion_fruit"
}

{
"result": [
"ready"
]
}

{
"variety": "purple_passion_fruit",
"daysSinceFlowering": 60
}

{
"result": [
"not_ready"
]
}

Structured JSON

http://localhost:3000/advices?disease=fusarium_wilt

{
"disease": "fusarium_wilt",
"advices": [
"Improve soil drainage",
"Rotate crops",
"Apply carbendazim"
]
}

http://localhost:3000/diseases/diagnose?symptoms=wilting_stem,yellow_leaves

{
"diagnoses": [
{
"disease": "fusarium_wilt",
"confidence": 0.9
},
{
"disease": "fusarium_wilt",
"confidence": 0.8
},
{
"disease": "vine_mite",
"confidence": 0.8
},
{
"disease": "waterlogging",
"confidence": 0.8
}
]
}

http://localhost:3000/fertilizer/

{
"fertilizers": [
{
"id": 0,
"stage": "planting",
"fertilizer": "urea",
"amount": 500
},
{
"id": 0,
"stage": "planting",
"fertilizer": "triple_super_phosphate",
"amount": 5000
},
{
"id": 0,
"stage": "planting",
"fertilizer": "muriate_of_potash",
"amount": 10000
},
{
"id": 0.5,
"stage": "2_weeks_after_planting",
"fertilizer": "urea",
"amount": 45
},
{
"id": 0.5,
"stage": "2_weeks_after_planting",
"fertilizer": "triple_super_phosphate",
"amount": 80
},
{
"id": 0.5,
"stage": "2_weeks_after_planting",
"fertilizer": "muriate_of_potash",
"amount": 40
},
{
"id": 0.5,
"stage": "2_weeks_after_planting",
"fertilizer": "magnesium_sulphate",
"amount": 55
}
]
}

http://localhost:3000/harvest?crop=purple_passion_fruit

{
"crop": "purple_passion_fruit",
"harvest_times": [
"90"
]
}
