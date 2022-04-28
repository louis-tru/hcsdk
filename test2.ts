
import {make, DefaultSigner} from '.';

async function test2 () {
	const {core} = await make({
		url: 'https://mvp-test.stars-mine.com/service-api',
		signer: new DefaultSigner('hashii', 'f090dc6f513e3b6fb1413b4a866e9bcd80621cba5c0d27744b50019ee4215102'),
	});

	const tx = await core.tx.methods.post({
		chain: 5555, // bsn chain
		from: '0x7Ed7cda3702cCb9938b94944541701eA5b5c970b',
		address: '0x4428E96DB72340F24C752630B2E0ff1AE285E5f7', // 协约地址
		method: 'mintMultiTokenTo', // 协约方法
		args: [
			[{
				"owner":"0x7Ed7cda3702cCb9938b94944541701eA5b5c970b",
				"tokenId":"0x07f231131b8bf5a4fd39c8ec880021163b9a2ddf4f70c0b32e3f3a3283a1b0ea",
				"uri":"",
				"idType":false
			}]
		], // 协约参数
	});

	console.log(tx);
}

test2();
