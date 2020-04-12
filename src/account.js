import React, { useState, useEffect } from 'react';

export default function Account() {

  const padding10 = {
    padding: "10px"
  }

  const [balanceSheet, setBalanceSheet] = useState([]);
  const [total, setTotal] = useState({"total":0,"amount":0,"scharge":0});

  const sum = (accumulator, currentValue) => accumulator + currentValue;

  useEffect(() => {
    console.log(balanceSheet);    

    let amountarray = balanceSheet.map((item, index) => {
        return item.amount;
    });

    let amount = 0;
    if(amountarray.length)
    {
        amount = amountarray.reduce(sum);
    }

    let scharge = 0;
    let schargearray = balanceSheet.map((item, index) => {
        return item.scharge;
    });

    if(schargearray.length)
    {
        scharge = schargearray.reduce(sum);
    }

    if(scharge < 0) {
        setTotal({"total" :amount+scharge,"amount" : amount, "scharge" : scharge});
    }
    else {
        setTotal({"total" :amount-scharge,"amount" : amount, "scharge" : scharge});
    }

  }, [balanceSheet]);

  const addItem = (newinput) => {
    const newList = [...balanceSheet];
    newList.push(newinput);
    setBalanceSheet(newList);
  }

  const removeItem = (i) => {
    const newList = [...balanceSheet];
    newList.splice(i, 1);
    setBalanceSheet(newList);
  }

  const changeItem = (i,property,value) => {
    const newList = [...balanceSheet];
    if(property !== "name") {
      newList[i][property] = parseFloat(value);
    }
    else {
      newList[i][property] = value;
    }
    setBalanceSheet(newList);
  }

  const balance = (i) => {


    let amountarray = balanceSheet.map((item, index) => {
        return index <= i
                ? item.amount
                : 0
    });

    let amount = 0;
    if(amountarray.length)
    {
        amount = amountarray.reduce(sum);
        console.log(amount);
    }

    let scharge = 0;
    let schargearray = balanceSheet.map((item, index) => {
        return index <= i
                ? item.scharge
                : 0
    });

    if(schargearray.length)
    {
        scharge = schargearray.reduce(sum);
        console.log(scharge);
    }

    if(scharge < 0) {
        return amount+scharge;
    }
    else {
        return amount-scharge;
    }

  }

  return (
    <div>
      <div>
        <span style={padding10}>Name: <input id="input_name" placeholder="Enter Name"/></span>
        <span style={padding10}>Amount: <input id="input_amount"  placeholder="Enter Amount"/></span>
        <span style={padding10}>Service Charge: <input id="input_scharge"  placeholder="Enter Service Charge"/></span>
        <span style={padding10}><button onClick={() => {
          let newinput = {
            name: document.getElementById("input_name").value,
            amount: parseFloat(document.getElementById("input_amount").value || 0),
            scharge: parseFloat(document.getElementById("input_scharge").value || 0),
          }
          addItem(newinput);
          document.getElementById("input_name").focus();
        }}>Add Transaction</button></span>
      </div>

      <div>
        <h3 style={{
          padding: "10px",
          margin: "30px 0 10px",
        }}>Balance Sheet: Total Balance = {total.total.toFixed(2)} | Total Transaction Amount = {total.amount.toFixed(2)} | Total Service Charge = {total.scharge.toFixed(2)}</h3>

        {
          balanceSheet.map((item, index) => {
            return (
              <div style={padding10}>
                <span style={padding10}>Name: <input id={"output_name" + index} value={balanceSheet[index].name}
                 onChange={(e) => {changeItem(index, "name", e.target.value);}}/></span>
                <span style={padding10}>Amount: <input type="number" id={"output_amount" + index} value={balanceSheet[index].amount} onChange={(e) => {changeItem(index, "amount", e.target.value);}}/></span>
                <span style={padding10}>Service Charge: <input type="number" id={"output_scharge" + index} value={balanceSheet[index].scharge} onChange={(e) => {changeItem(index, "scharge", e.target.value);}}/></span>
                <span style={padding10}>Balance: <span> {balance(index)} </span></span>
                <button onClick={() => {
                  removeItem(index);
                }}>Remove Transaction</button>
              </div>
            )
          })
        }


      </div>

    </div>
  );
}