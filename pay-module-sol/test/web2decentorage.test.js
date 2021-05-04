const assert = require('assert');    //assertion
const ganache = require('ganache-cli'); //ganache creates locla test network for testing
const Web3 = require('web3')    //constructor
const web3 = new Web3(ganache.provider());      //provider to connect to some network

const {interface, bytecode} = require('../compile');

let web2decentorage;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    //console.log(accounts);

    //deploy to ganache network the contract
    web2decentorage = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data:bytecode , arguments: [499,100]})
        .send({from: accounts[0], gas: '1000000'});
});

describe('web2decentorage', ()=>{

    it('deploy a contract', async () => {
        //this assertion to make sure that the contract has address so it has been deployed
        //also the address indicates the address that where the contract has been deployed in the network
        assert.ok(web2decentorage.options.address);
        assert.equal(accounts[0], await web2decentorage.methods.getDecentorage().call({
            from: accounts[0]
        }))
    });

    it('user will enter the contract and pay for storage', async () => {
        await web2decentorage.methods.getPaidByUser().send({
            from: accounts[1],
            value: 500
        });

        assert.equal(accounts[1], await web2decentorage.methods.getwebUser().call({
            from: accounts[0]
        }))
    });

    it('a storage node will be part of this contract and be added as one of the storage nodes that stores the data', async() => {
        await web2decentorage.methods.addStorageNode(accounts[1]).send({
            from: accounts[0]
        });

        const storageNodes = await web2decentorage.methods.getStorageNodes().call({
            from: accounts[0]
        });

        assert.equal(accounts[1],storageNodes[0]);
    });

    it('checking the contract balance after a user pay', async() => {
        await web2decentorage.methods.getPaidByUser().send({
            from: accounts[1],
            value: 500
        });

        const balance = await web2decentorage.methods.getBalance().call({
            from: accounts[0]
        });

        assert.equal(balance,500);
    });

    it('paying a storage node after getting paid by a user', async() => {
        console.log(await web3.eth.getBalance(accounts[1]));
        await web2decentorage.methods.getPaidByUser().send({
            from: accounts[1],
            value: 500
        });
        console.log(await web3.eth.getBalance(accounts[1]));

        var balance = await web2decentorage.methods.getBalance().call({
            from: accounts[0]
        });
        assert.equal(balance, 500);

        await web2decentorage.methods.addStorageNode(accounts[1]).send({
            from: accounts[0]
        });
       

        await web2decentorage.methods.payStorageNode(accounts[1]).send({
            from: accounts[0]
        });
        balance = await web2decentorage.methods.getBalance().call({
            from: accounts[0]
        });
        assert.equal(balance, 400);

        await web2decentorage.methods.payStorageNode(accounts[1]).send({
            from: accounts[0]
        });
        balance = await web2decentorage.methods.getBalance().call({
            from: accounts[0]
        });
        assert.equal(balance, 300);

        await web2decentorage.methods.payStorageNode(accounts[1]).send({
            from: accounts[0]
        });
        balance = await web2decentorage.methods.getBalance().call({
            from: accounts[0]
        });
        assert.equal(balance, 200);

        await web2decentorage.methods.payStorageNode(accounts[1]).send({
            from: accounts[0]
        });
        balance = await web2decentorage.methods.getBalance().call({
            from: accounts[0]
        });
        assert.equal(balance, 100);

        await web2decentorage.methods.payStorageNode(accounts[1]).send({
            from: accounts[0]
        });
        balance = await web2decentorage.methods.getBalance().call({
            from: accounts[0]
        });
        assert.equal(balance, 0);

    });
});