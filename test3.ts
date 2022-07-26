
import sdk, {initialize} from './sdk';

const DAOName = 'TESE_DAO2';

async function testMakeDAO() {
	await initialize('https://smart-dao-rel.stars-mine.com/service-api');

	sdk.msg.addEventListener('MakeDAOComplete', async function({data: { state, task, data, ok }}) {
		console.log(data);
		if (ok) {
			let address = data.data;
			console.log('MakeDAO success', address);
			let dao = await sdk.utils.methods.getDAO({ chain: 4, address });
			console.log(dao);
		} else {
			console.log('MakeDAO fail', data.error);
		}
	});

	let task = await sdk.tasks.methods.makeDAO({
		name: DAOName,
		mission: DAOName,
		description: DAOName,
		operator: '0x45d9dB730bac2A2515f107A3c75295E3504faFF7',
		chain: 4, // ChainType.RINKEBY
	});

	console.log(task);
}

testMakeDAO();