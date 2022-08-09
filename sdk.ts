
import {make, DefaultSigner} from '.';
import Store from 'somes/store';
import hash from 'somes/hash';
import somes from 'somes';
import * as cryptoTx from 'crypto-tx';
import buffer, { IBuffer } from 'somes/buffer';
import storage from 'somes/storage';

export const store = new Store('test3/demo');

var _PrivateKey: IBuffer | null = null;
var _AuthName: string = '';

async function initPrivateKey(privateKey?: string) {
	if (_PrivateKey) {
		if (!privateKey) return false;
		let key = buffer.from(privateKey, 'hex');
		if (key.compare(_PrivateKey) == 0) return false;
	}
	if (privateKey) {
		_PrivateKey = buffer.from(privateKey, 'hex');
	} else {
		let key = await storage.get('private');
		if (!key) {
			key = cryptoTx.genPrivateKey().toString('base64');
			storage.set('private', key.toString('base64'));
		}
		_PrivateKey = hash.sha256(key + 'a1048d9bb6a4e985342b240b5dd63176b27f1bac62fa268699ea6b55f9ff301a');
	}
	_AuthName = somes.hash(publicKey());

	return true
}

function getPrivateKey() {
	somes.assert(_PrivateKey, 'not init call genPrivateKey()');
	return _PrivateKey!;
}

export function authName() {
	return _AuthName;
}

export function publicKey() {
	return '0x' + cryptoTx.getPublic(getPrivateKey(), true).toString('hex');
}

export async function initialize(url: string, privateKey?: string, ref?: string) {
	await initPrivateKey(privateKey);

	const {core} = await make({
		store, url,
		signer: new DefaultSigner(_AuthName, getPrivateKey().toString('hex')),
	});

	var user = await core.user.methods.authUser();
	if (!user) {
		await core.user.methods.register({ name: _AuthName, key: publicKey(), ref });
	}
}

export async function setPrivateKey(privateKey: string, ref?: string) {
	somes.assert(store.isLoaded, 'Initialize first');
	if (await initPrivateKey(privateKey)) {
		store.setSigner(new DefaultSigner(_AuthName, getPrivateKey().toString('hex')));
		store.conv?.close(); // reopen

		var user = await store.core.user.methods.authUser();
		if (!user) {
			await store.core.user.methods.register({ name: _AuthName, key: publicKey(), ref });
		}
	}
}

export default store.core;