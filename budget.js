//  Select the Elements 

const budgetInput = document.getElementById("budget")
const expensesInput = document.getElementById("expenses")
const ProdectsInput = document.getElementById("Prodects")
const setBudgetBtn = document.getElementById("set-budget")
const checkAmountBtn = document.getElementById("check-amount")
let totalBudget = document.querySelector(".total-budget")
let expensesSpan = document.querySelector(".expenses-span")
let restAmount = document.querySelector(".rest-budget")
let expensesList = document.querySelector(".expenses-list")
let errorMasg =  document.querySelectorAll(".erorr")
 let clearBtn = document.querySelector(".clear");
let arr =[]
let not = (expensesInput.value == " " || ProdectsInput.value == " "  || budgetInput.value == " ")

function calcBudget(){
    //  
        setBudgetBtn.addEventListener("click",function(){            
             totalBudget.textContent = budgetInput.value  
        })
        checkAmountBtn.addEventListener("click",function(){
            // Make Sure That All The Inputs are filled
           if(expensesInput.value != "" && ProdectsInput.value != ""  && budgetInput.value != ""){
             checkAmount()
            creatExpensesList()
            calculatePercentage()
           }else{
             //  Display Alert If All Inputs Not Filled
               let alert = `
            <div class="alert alert-warning alert-dismissible fade show"    role="alert">
                <strong>To proceed !</strong>  please fill out the missing information in the fields.
                <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="alert" ></button>
            </div>
               `
            //    Close The Alert 
               let alertList = document.querySelectorAll('.alert')
                alertList.forEach(function (alert) {
                new bootstrap.Alert(alert)
                })
                        if(!not){
                            document.querySelector(".alert-field").innerHTML += alert
                        }
           }
        })
}
calcBudget()
// check Amount Function to Check The Amount End Set The Espenss in the Expenses Span
 function checkAmount (){
    // Set The Budget Automaticly
    totalBudget.textContent = budgetInput.value   
    //  Push The Number In Empty Array 
   arr.push({
    product: ProdectsInput.value,
    cost: Number(expensesInput.value)
  });
  expensesSpan.textContent = arr.reduce((a, b) => a + b.cost, 0).toString();
    restAmount.textContent = 
    parseInt(totalBudget.textContent)  - parseInt(expensesSpan.textContent)  
   
} 
//  Set The Prodects Name With His Expenses 
 function creatExpensesList(){
    let content = `
   
    <div class="expenses-box d-flex flex-row justify-content-between " id="${Date.now()}">
        <div class="expenses-item" >
            <p class= "prodect text-uppercase"> ${ProdectsInput.value} </p>
            <p class="cost ms-4 "> ${expensesInput.value} </p>
        </div> 
        <div class="expenses-icon ">  
            <i class="bi bi-pencil-square  edit"></i>
            <i class="bi bi-trash3 delet"></i>  
        </div> 
    </div>
    `
        expensesList.innerHTML += content
        expensesInput.value =""
        ProdectsInput.value =""
        deletItem()
       editElment()
        
 }

    function deletItem (){
        // select All the Delet Elemnet 
        let deletBtns = document.querySelectorAll(".delet")
        // Make It As Array to loop on it
        deletBtns.forEach((e)=>{
            e.addEventListener("click",function(){
                let expenseItem = e.closest(".expenses-box");
                    //  Select the expenses-item 
                    let res = expenseItem.firstElementChild
                    //  Select the Cost Of prodect
                    let cost = res.lastElementChild
                    //  Set the New Expenses Span Value
                    expensesSpan.textContent -=  parseInt(cost.innerHTML)
                      //  Set the New Rest Amount Value
                      restAmount.textContent =
                       parseInt(cost.innerHTML) + parseInt( restAmount.textContent)
                         // Store the initial cost before modifying it
                        let initialCost = Number(cost.textContent);
                        expenseItem.remove();
                        // Remove the expense from the array
                        arr = arr.filter((expense) => expense.cost !== initialCost);              
                        percentageOk.style.display = "none";
                        percentageRed.style.display = "none";        
            })
        })
    };

  function editElment (){
       
  let editBtns = document.querySelectorAll(".edit");
  editBtns.forEach((e) => {
    e.addEventListener("click", function () {
      let expenseItem = e.closest(".expenses-box");
      let cost = expenseItem.querySelector(".cost");
      let prodectName = expenseItem.querySelector(".prodect");
      // Store the initial cost before modifying it
      let initialCost = Number(cost.textContent);
      // Set the product Cost in the Expenses Input
      expensesInput.value = initialCost;
      // Set the product Name in the product Input
      ProdectsInput.value = prodectName.textContent;
      expenseItem.remove();
      // Remove the expense from the array
      arr = arr.filter((expense) => expense.cost !== initialCost);
    //   Update the ExpensesCost 
        expensesSpan.textContent = arr.reduce((a, b) => a + b.cost, 0).toString();
      // Update the restAmount value
      restAmount.textContent = parseInt(totalBudget.textContent) - parseInt(expensesSpan.textContent);
    // Hidden  percentage Div
        percentageOk.style.display = "none";
        percentageRed.style.display = "none";
        });
      
    });  
  
};

  clearBtn.addEventListener("click", () => {
    document.querySelectorAll(".expenses-box").forEach((e)=>{
        let expenseItem = e.closest(".expenses-box");
                    //  Select the expenses-item 
                    let res = expenseItem.firstElementChild
                    //  Select the Cost Of prodect
                    let cost = res.lastElementChild
                    //  Set the New Expenses Span Value
                    expensesSpan.textContent -=  parseInt(cost.innerHTML)
                      //  Set the New Rest Amount Value
                      restAmount.textContent =
                       parseInt(cost.innerHTML) + parseInt( restAmount.textContent)
                         // Store the initial cost before modifying it
                        let initialCost = Number(cost.textContent);
                        expenseItem.remove();
                        // Remove the expense from the array
                        arr = arr.filter((expense) => expense.cost !== initialCost);         
        e.remove()
         // Hidden  percentage Div
        percentageOk.style.display = "none";
        percentageRed.style.display = "none";
    })
  });

//    Select the Elments for percentage Div
    let percentageOk = document.querySelector(".percentage-ok")
    let percentageRed = document.querySelector(".percentage-red")
    let percentageGreen=document.querySelector(".percentage-num-ok")
    let percentagered=document.querySelector(".percentage-num")
    //  Hidden the Percentage Div
    percentageOk.style.display = "none";
    percentageRed.style.display = "none";

 function calculatePercentage() {
  const expenses = parseInt(expensesSpan.textContent);
  const budget = parseInt(totalBudget.textContent);
  const percentage = Math.round((expenses / budget) * 100).toFixed(1);

    if (percentage > 0 && percentage < 80) {
        percentageOk.style.display = "block";
        percentageGreen.textContent = ` ${percentage}%`;
        percentageRed.style.display = "none";
    } else {
        percentageOk.style.display = "none";
        percentageRed.style.display = "block";
        percentagered.textContent = ` ${percentage}%`;
    }

}
