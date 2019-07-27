const db = require('./db');

exports.interact = async (req, res) => {
  const { payload } = res;

  const { response_url, domain, actions } = payload;
  const { id } = domain.team;
  const { action_id, selected_option } = actions[0];

  await db
    .collection('teams')
    .doc(id)
    .set({
      [action_id]: selected_option.value
    });
};

// {
// 	"type": "block_actions",
// 	"team": {
// 		"id": "T0CAG",
// 		"domain": "acme-creamery"
// 	},
// 	"user": {
// 		"id": "U0CA5",
// 		"username": "Amy McGee",
// 		"name": "Amy McGee",
// 		"team_id": "T3MDE"
// 	},
// 	"api_app_id": "A0CA5",
// 	"token": "Shh_its_a_seekrit",
// 	"container": {
// 		"type": "message",
// 		"text": "The contents of the original message where the action originated"
// 	},
// 	"trigger_id": "12466734323.1395872398",
// 	"response_url": "https://www.postresponsestome.com/T123567/1509734234",
// 	"actions": [
// 		{
// 			"type": "static_select",
// 			"block_id": "section791937301",
// 			"action_id": "section734454127",
// 			"selected_option": {
// 				"text": {
// 					"type": "plain_text",
// 					"text": "Sunday",
// 					"emoji": true
// 				},
// 				"value": "0"
// 			},
// 			"placeholder": {
// 				"type": "plain_text",
// 				"text": "Select an item",
// 				"emoji": true
// 			},
// 			"action_ts": "1564233206.940052"
// 		}
// 	]
// }
