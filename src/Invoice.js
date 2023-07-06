import React, {  useState } from "react";
import "./invoice.css";
import { stockItems } from "./list";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Invoice = () => {
  // const [selectedItem, setSelectedItem] = useState("");
  // const [gstPercentage, setGstPercentage] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredStockItems, setFilteredStockItems] = useState(stockItems);
  const [inputFocused, setInputFocused] = useState(false);

  



  // const handleSelectChange = (event) => {
  //   setSelectedItem(event.target.value);
  // };

  // const handleGstChange = (event) => {
  //   setGstPercentage(event.target.value);
  // };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getFormattedDay = (date) => {
    if (date) {
      const dayOptions = { weekday: "long" };
      return date.toLocaleDateString("en-US", dayOptions);
    }
    return "";
  };

  const calculateInclusiveRate = (rate, gst) => {
    const rateValue = parseFloat(rate);
    const gstValue = parseFloat(gst);
  
    if (!isNaN(rateValue) && !isNaN(gstValue)) {
      const inclusiveRate = (rateValue * 100) / (100 + gstValue);
      return inclusiveRate.toFixed(2);
    }
  
    return "";
  };
  


  


  const calculateAmount = (rate, quantity) => {
    const rateValue = parseFloat(rate);
    const quantityValue = parseFloat(quantity);

    if (!isNaN(rateValue) && !isNaN(quantityValue)) {
      const amount = rateValue * quantityValue;
      return amount.toFixed(2);
    }

    return "";
  };

  const [rows, setRows] = useState([
    {
      name: "",
      code: "",
      gst: "",
      quantity: "",
      rate: "",
      inclusiveRate: "",
      per: "",
      dec: "",
      amount: "",
    },
    {
      name: "",
      code: "",
      gst: "",
      quantity: "",
      rate: "",
      inclusiveRate: "",
      per: "",
      dec: "",
      amount: "",
    },
    {
      name: "",
      code: "",
      gst: "",
      quantity: "",
      rate: "",
      inclusiveRate: "",
      per: "",
      dec: "",
      amount: "",
    },
    {
      name: "",
      code: "",
      gst: "",
      quantity: "",
      rate: "",
      inclusiveRate: "",
      per: "",
      dec: "",
      amount: "",
    },
    {
      name: "",
      code: "",
      gst: "",
      quantity: "",
      rate: "",
      inclusiveRate: "",
      per: "",
      dec: "",
      amount: "",
    },
    {
      name: "CGST",
      code: "",
      gst: "",
      quantity: "",
      rate: "",
      inclusiveRate: "",
      per: "",
      dec: "",
      amount: "",
    },
    {
      name: "SGST",
      code: "",
      gst: "",
      quantity: "",
      rate: "",
      inclusiveRate: "",
      per: "",
      dec: "",
      amount: "",
    },
    {
      name: "Round Off",
      code: "",
      gst: "",
      quantity: "",
      rate: "",
      inclusiveRate: "",
      per: "",
      dec: "",
      amount: "",
    },
    {
      name: "",
      code: "",
      gst: "",
      quantity: "",
      rate: "",
      inclusiveRate: "",
      per: "",
      dec: "",
      amount: "",
    },
    {
      name: "",
      code: "",
      gst: "",
      quantity: "",
      rate: "",
      inclusiveRate: "",
      per: "",
      dec: "",
      amount: "",
    },
    {
      name: "",
      code: "",
      gst: "",
      quantity: "",
      rate: "",
      inclusiveRate: "",
      per: "",
      dec: "",
      amount: "",
    },
    {
      name: "",
      code: "",
      gst: "",
      quantity: "",
      rate: "",
      inclusiveRate: "",
      per: "",
      dec: "",
      amount: "",
    },
  ]);

  const handleInputChange = (event, index, field) => {
    const { value } = event.target;
  
    if (field === "name") {
      const filteredItems = stockItems.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStockItems(filteredItems);
      setInputFocused(event.type === "focus");
    }
  
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index][field] = value;
  
      // Update calculated fields
      const { rate, gst, quantity } = updatedRows[index];
      updatedRows[index].inclusiveRate = calculateInclusiveRate(rate, gst);
      updatedRows[index].amount = calculateAmount(rate, quantity);
  
      return updatedRows;
    });
  };
  

  const getTotalAmount = () => {
    const total = rows.reduce((sum, row) => {
      const amount = parseFloat(row.amount);
      return !isNaN(amount) ? sum + amount : sum;
    }, 0);

    return total.toFixed(2);
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  return (
    <div className="invoice-container">
      <div className="header">
        <div className="left-section">
          <div className="sales-manual">Sales_Manual</div>
          <div className="number">No.</div>{" "}
          <input
            type="number"
            className={`numinput ${inputFocused ? "focused" : ""}`}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>

        {/* <div className="dropdown-section">
          <select className="dropdown" value={selectedItem} onChange={handleSelectChange}>
            <option value="" disabled>
              List of stock value
            </option> */}
        {/* Render the stock items as options */}
        {/* {stockItems.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
 */}

        <div className="right-section">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="Date Day"
            dateFormat="dd-MM-yyyy"
            className="custom-datepicker"
          />
         
        </div>
      </div>
<div className="dayheader"> {getFormattedDay(selectedDate)}</div>





      <div className="voucher-section">
        <div className="center voucherclass">Voucher class </div>{" "}
        <div className="colon6">:</div>{" "}
        <input className="sales" placeholder="sales" />
      </div>
      <div className="price-level-section">Price level</div>

      <div className="allinput">
        <div className="firstrow">
          <div className="party-section">Party A/c name</div>{" "}
          <div className="colon">:</div>{" "}
          <input
            className="onlinetranfer"
            placeholder="Online Transfer Customer"
          />
        </div>

        <div className="secondrow">
          <div className="balance-section">Current balance:</div>
          <div className="colon2">:</div>{" "}
          <input className="debit" placeholder="30,72,124.97 Dr" />
        </div>

        <div className="thirdrow">
          <div className="ledger-section">Sales ledger</div>
          <div className="colon3">:</div>
          <input className="debit" placeholder="GST Sales" />
        </div>

        <div className="fourthrow">
          <div className="balance-section">Current balance</div>
          <div className="colon4">:</div>
          <input className="debit" placeholder="82,71,260.99 Cr" />
        </div>
      </div>

      {/* Render the column headings
      <div className="column-heading">
        <div className="nameofitemmain">Name of item</div>
        <div className="hsnmain" >
          HSN/SAC Code
        </div>
        <div className="gstmain" >
          GST%
        </div>
        <div className="qtymain" >
          Quantity
        </div>
        <div className="ratetaxmain" >
          Rate 
          <div>(incl. of tax)</div>
        </div>
        <div className="ratemain" >
          Rate
        </div>
        <div className="permain" >
          Per
        </div>
        <div className="decmain" >
          Dec%
        </div>
        <div className="amtmain" >
          Amount
        </div>
      </div> */}


<div className="flexheading">
<div className="headingone" >
Name of item
        </div>
<div className="headingtwo" >
          HSN/SAC Code
        </div>
        <div className="headingthree" >
          GST%
        </div>
        <div className="headingfour" >
          Quantity
        </div>
        <div className="headingfive" >
          Rate 
          <div>(incl. of tax)</div>
        </div>
        <div className="headingsix" >
          Rate
        </div>
        <div className="headingseven" >
          Per
        </div>
        <div className="headingeight" >
          Dec%
        </div>
        <div className="headingnine" >
          Amount
        </div>
        </div>






      
      {rows.map((row, index) => (
  <div className="item-row" key={index}>
    <div className="col">
      {index < 5 ? (
        <input
          className="nameofitem"
          type="text"
          value={row.name}
          onChange={(event) => handleInputChange(event, index, "name")}
          list={`stockItems-${index}`}
        />
      ) : (
        <input
          className="nameofitem"
          type="text"
          value={row.name}
          onChange={(event) => handleInputChange(event, index, "name")}
        />
      )}
      {index < 5 && (
        <datalist id={`stockItems-${index}`}>
          {filteredStockItems.map((item, itemIndex) => (
            <option key={itemIndex} value={item} />
          ))}
        </datalist>
      )}





          </div>
          <div className="col">
            <input
              className="hsncol"
              type="text"
              value={row.code}
              onChange={(event) => handleInputChange(event, index, "code")}
            />
          </div>
          <div className="col">
            <input
              className="gstcol"
              type="text"
              value={row.gst}
              onChange={(event) => handleInputChange(event, index, "gst")}
            />
          </div>
          <div className="col">
            <input
              className="qtycol"
              type="text"
              value={row.quantity}
              onChange={(event) => handleInputChange(event, index, "quantity")}
            />
          </div>
          <div className="col">
            <input
              className="ratecol"
              type="text"
              value={row.rate}
              onChange={(event) => handleInputChange(event, index, "rate")}
            />
          </div>
          <div className="col">
            <input
              className="incrate"
              type="text"
              value={row.inclusiveRate}
              onChange={(event) => handleInputChange(event, index, "rate")}
            />
          </div>
          <div className="col">
            <input
              className="percol"
              type="text"
              value={row.per}
              onChange={(event) => handleInputChange(event, index, "per")}
            />
          </div>
          <div className="col">
            <input
              className="deccol"
              type="text"
              value={row.dec}
              onChange={(event) => handleInputChange(event, index, "dec")}
            />
          </div>
          <div className="col">
            <input
              className="amtcol"
              type="text"
              value={row.amount}
              onChange={(event) => handleInputChange(event, index, "dec")}
            />
          </div>
        </div>
      ))}
      <div className="footer">


<div className="narration">
        <div className="left" >
          Narration
        </div>
<div className="colon7">:</div>
        <input className="narrationinput" type="text" />

        </div>



        <div className="right" contentEditable>
          {getTotalAmount()}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
