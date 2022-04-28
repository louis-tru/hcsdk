
import {make, DefaultSigner} from '.';

async function test () {
	const {core} = await make({
		url: 'https://mvp-test.stars-mine.com/service-api',
		signer: new DefaultSigner('test', '2f2b4e5d1c379570da02e53eec7f12038b504b40cc84aebcdf740dd1b1c7f34d'),
	});

	const token = '0xFE6C5CA912D5b2f4C5A7639770DE3F577AD81Ba6';
	const tokenId = '0xb642b94f6d1e377ca3c261484dfddbb166d5fb39bf75cec058d2d92c5f850f4b';

	// 获取资产是否存在
	var asset = await core.nft.methods.getNFT({
		token: token,
		tokenId: tokenId,
	});

	console.log(asset);

	await core.keys.methods.setUnlock({pwd: '0000'}); // 设备ksm自动解锁密码
	const from = await core.keys.methods.address({part_key: 'test'}); // 通过key获取from地址
	//await core.user.methods.bSNGasTap({address: from})// 调用BSN水龙头

	const tx = await core.tx.methods.postSync({
		chain: 5555, // bsn chain
		from: from,
		address: token, // 协约地址
		method: 'mint', // 协约方法
		args: [tokenId], // 协约参数
	});

	console.log(tx);
}

async function test2 () {

	const {core} = await make({
		url: 'https://mvp-test.stars-mine.com/service-api',
		signer: new DefaultSigner('hashii', 'f090dc6f513e3b6fb1413b4a866e9bcd80621cba5c0d27744b50019ee4215102'),
	});

	const tx1 = await core.tx.methods.postSync({
		chain: 5555, // bsn chain
		from: '0xa7Ad9207DE1417198FCc62FbF1a16B7f35C96ABf',
		address: '0xFE6C5CA912D5b2f4C5A7639770DE3F577AD81Ba6', // 协约地址
		method: 'mint', // 协约方法
		args: ['0xb642b94f6d1e377ca3c261484dfddbb166d5fb39bf75cec058d2d92c5f850f4e'], // 协约参数
	});

	console.log(tx1);

	const tx = await core.tx.methods.post({
		chain: 5555, // bsn chain
		from: '0xa7Ad9207DE1417198FCc62FbF1a16B7f35C96ABf',
		address: '0x4428E96DB72340F24C752630B2E0ff1AE285E5f7', // 协约地址
		method: 'mintMultiTokenTo', // 协约方法
		args: [
			[{
				"owner":"0xa7Ad9207DE1417198FCc62FbF1a16B7f35C96ABf",
				"tokenId":"0x07f231131b8bf5a4fd39c8ec880021163b9a2ddf4f70c0b32e3f3a3283a1b0e9",
				"uri":"","idType":false
			}]
		], // 协约参数
	});

	debugger

	console.log(tx);
}


test2();