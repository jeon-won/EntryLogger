let oneMonthAgo = new Date(new Date(Date.now()).setMonth(new Date().getMonth() - 1))
  .toISOString().replace('T', ' ').slice(0, 10); // YYYY-MM-DD;
console.log(oneMonthAgo);