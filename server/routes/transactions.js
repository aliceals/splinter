const router = require('express').Router()
const db = require('../db/transactions')

router.get('/:id', (req, res) => {
  db.getTransactions(req.params.id)
    .then(transactions => {
      res.json(transactions)
    })
})

router.get('/total/:id', (req, res) => {
  db.getTransactionTotal(req.params.id)
    .then(totals => {
      let initialValue = 0
      let sum = totals.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.transaction_total
      }, initialValue)
      // res.send(sum)
      res.json({ totalSpent: sum })
    })
})


module.exports = router
router.post('/', (req, res) => {
  let t = req.body.transaction
  let transaction = {
    group_id: t.group_id,
    groupMember_id: t.groupMemberId,
    transaction_total: t.transactionTotal * 100,
    transaction_name: t.transactionName,
    date: Date.now() / 1000
  }

  db.addTransaction(transaction)
    .then(id => {
      req.body.group_members.map(member => {
        if (member.groupMember_id == transaction.groupMember_id) {
          let payer = {
            transaction_id: id,
            groupMember_id: member.groupMember_id,
            total_contribution: transaction.transaction_total
          }
          return db.addTransactionDetails(payer)
        } else {
          let payee = {
            transaction_id: id,
            groupMember_id: member.groupMember_id,
            total_contribution: ((transaction.transaction_total) / req.body.group_members.length) * -1
          }
          return db.addTransactionDetails(payee)
        }

      })


    })
    .then(() => {
      res.send(200)
    })
})

router.delete('/:id', (req, res) => {
  db.deleteTransactions(req.params.id).then(() => {
    db.deleteTransactionDetails(req.params.id).then(() => {
      res.send(200)
    })
  })
})



module.exports = router

