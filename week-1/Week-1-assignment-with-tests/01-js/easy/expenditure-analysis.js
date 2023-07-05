/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/


function calculateTotalSpentByCategory(transactions) {
  var hashMap = {};
  for (var i = 0; i < transactions.length; i++){
    if (transactions[i].category in hashMap) {
      let amt = hashMap[transactions[i].category];
      amt = amt + transactions[i].price;
      hashMap[transactions[i].category] = amt;
    } else {
      hashMap[transactions[i].category] = transactions[i].price;
    }
  }
  var list = [];
  for (const key in hashMap) {
    const catObj = {}
    if (hashMap.hasOwnProperty(key)) {
      const value = hashMap[key];
      catObj['category'] = key;
      catObj['totalSpent'] = value;
      list.push(catObj);
    }
  }
  return list;
}

module.exports = calculateTotalSpentByCategory;
