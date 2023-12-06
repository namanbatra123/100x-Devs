/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  let output = [];

  if(transactions.length == 0) {
    return output;
  }

  let content = {};
  for(let i = 0; i < transactions.length; i++) {
    const category = transactions[i].category;

    if(content[category]){
      content[category] += transactions[i].price;
    }
    else {
      content[category] = transactions[i].price;
    }
  }

  for(let category in content) {
    output.push({
      category: category,
      totalSpent: content[category]
    });
  }  
  
  return output;

}

module.exports = calculateTotalSpentByCategory;
