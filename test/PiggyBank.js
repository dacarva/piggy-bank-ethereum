const { toWei } = require('web3-utils')

const PiggyBank = artifacts.require('./PiggyBank')

require('chai').use(require('chai-as-promised')).should()

contract('PiggyBank', ([owner, senderA, senderB]) => {
    let piggyBank, address

    before(async () => {
        piggyBank = await PiggyBank.deployed()
        address = piggyBank.address
    })

    describe('Deployment', async () => {
        it('Deploys the contract successfully', async () => {
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('Has a name', async () => {
            const name = await piggyBank.name()
            assert.equal(name, 'Ethereum based Piggy Bank')
        })
    })

    describe('Deposits and Withdrawals', async () => {
        it('Sends 1ETH to the piggy bank', async () => {
            //Check the old piggy bank balance
            let oldBalance = await web3.eth.getBalance(address)
            oldBalance = new web3.utils.BN(oldBalance)

            //Deposit 1ETH into the piggy bank
            let result = await piggyBank.deposit({
                from: senderA,
                value: web3.utils.toWei('1', 'Ether'),
            })

            //Check the updated balance
            let newBalance = await web3.eth.getBalance(address)
            newBalance = new web3.utils.BN(newBalance)

            let depositAmount = web3.utils.toWei('1', 'Ether')
            depositAmount = new web3.utils.BN(depositAmount)

            const expectedBalance = oldBalance.add(depositAmount)
            assert.equal(newBalance.toString(), expectedBalance.toString())
        })

        it('Only allows a withdrawal from the owner', async () => {
            let result = await piggyBank.withdraw({ from: senderA }).should.be
                .rejected
        })
        it("Withdraws the balance at the owner's request", async () => {
            //Check the piggy bank balance
            let withdrawalAmount = await web3.eth.getBalance(address)
            withdrawalAmount = new web3.utils.BN(withdrawalAmount)

            //Check the Owner's balance
            let oldBalance = await web3.eth.getBalance(owner)
            oldBalance = new web3.utils.BN(oldBalance)

            //Withdraw funds from the piggy Bank
            let result = await piggyBank.withdraw()

            //Calculate transaction cost
            const tx = await web3.eth.getTransaction(result.tx)
            const gasUsed = result.receipt.gasUsed
            const gasPrice = tx.gasPrice
            let transactionCost = gasPrice * gasUsed
            transactionCost = new web3.utils.BN(transactionCost)

            //Check the Owner's updated balance
            let newBalance = await web3.eth.getBalance(owner)
            newBalance = new web3.utils.BN(newBalance)

            const expectedBalance = oldBalance
                .add(withdrawalAmount)
                .sub(transactionCost)
            assert.equal(newBalance.toString(), expectedBalance.toString())
        })
    })
})
