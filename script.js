let invoicedata = [];


window.onload = function(){
    let invoicedataJSON = localStorage.getItem('customers');
    if(invoicedataJSON){
        invoicedata = JSON.parse(invoicedataJSON)
        console.log(true)
    }
    else{
        invoicedata = [];
        console.log(false)
    }
}
const showpopup = () => {
    if (localStorage.getItem('usertype') === null) {
        let popup = document.getElementById('popup')
        let popupover = document.getElementById('popupover')
        popup.classList.remove('hidden')
        popupover.classList.remove('hidden')
    }
}
showpopup()

function createInvoice() {
    // Getting Values from Input fields
    const product = document.getElementById('product-name').value;
    const qty = document.getElementById('qty').value;
    const price = document.getElementById('price').value;
    const total = price * qty;

    // Setting of Table to add data
    let table = document.getElementById('invoicetable');
    let row = table.insertRow(-1);
    let productcell = row.insertCell(0)
    let pricecell = row.insertCell(1)
    let qtycell = row.insertCell(2)
    let totalcell = row.insertCell(3)
    let actioncell = row.insertCell(4)
    // Display data in table
    productcell.innerHTML = product;
    pricecell.innerHTML = price;
    qtycell.innerHTML = qty;
    totalcell.innerHTML = total;
    actioncell.innerHTML = '<button id="del" class=" px-1 mt-1 text-white border border-red-600 hover:bg-transparent hover:border-white transition-all duration-200 rounded-md bg-red-600" onclick="deleteData(this.parentNode.parentNode)">Remove</button>';
    updateTotalAmount();
    reset();
}
function updateTotalAmount() {
    let table = document.getElementById('invoicetable');
    let rowCount = table.rows.length;
    let totalproduct = document.getElementById('totalproducts');
    totalproduct.innerHTML = (rowCount - 1);
    let totalAmount = 0;
    for (let i = 1; i < rowCount; i++) {
        let row = table.rows[i];
        let totalCell = row.cells[3];
        totalAmount += parseFloat(totalCell.innerHTML)
    }
    let amount = document.getElementById('totalamount');
    amount.innerHTML = (totalAmount);
}
function deleteData(row) {
    let table = document.getElementById('invoicetable');
    let rowIndex = row.rowIndex;
    table.deleteRow(rowIndex);
    updateTotalAmount();
}
function reset() {
    let product = document.getElementById('product-name').value = ''
    let qty = document.getElementById('qty').value = ''
    let price = document.getElementById('price').value = ''
}

const closepopup = () => {
    let popup = document.getElementById('popup')
    let popupover = document.getElementById('popupover')
    popup.classList.add('hidden')
    popupover.classList.add('hidden')
    localStorage.setItem('usertype', 'old')
}


const saveinvoice = () => {
    let customername = document.getElementById('customer-name').value;
    let customerphone = document.getElementById('customer-phone').value;
    let customeremail = document.getElementById('customer-email').value;
    let products = document.getElementById(`totalproducts`).innerText;
    let amount = document.getElementById(`totalamount`).innerText;

    let tablebody = document.getElementsByTagName('tbody')[0];

    const newinvoice = {
        name: customername,
        phone: customerphone,
        email: customeremail,
        products: products,
        amount: amount
    }
    invoicedata.push(newinvoice);

    const invoicedataJSON = JSON.stringify(invoicedata);
    localStorage.setItem('customers', invoicedataJSON)

    let msg = document.getElementById('msg');
        msg.classList.replace('text-blue-500', 'text-green-400');
        msg.innerHTML = 'Data has been saved successfully!'
    customername = ''
    customeremail = ''
    customerphone = ''
}
