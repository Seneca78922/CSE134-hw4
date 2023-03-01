//alert button pressed -> alert dialog popup
//confirm button pressed -> "do you confirm this" dialog popup, confirm result displayed as output
//prompt result -> "what is your name" input form popup, prompt result (sanitized with DOMPurify) as output


export function alertDialogSetup() {
  let alertBtn = document.getElementById("Alert");
  let alertDialog = document.getElementById("alertBox");
  let confirmOutput = document.getElementById("confirmOutput");
  let promptOutput = document.getElementById("promptOutput");
  alertBtn.addEventListener("click", () => {
    promptOutput.value = "";
    confirmOutput.innerText = "";
    alertDialog.showModal();
  });
}

export function confirmDialogSetup() {
  let confirmBtn = document.getElementById("Confirm");
  let confirmDialog = document.getElementById("confirmBox");
  let confirmOutput = document.getElementById("confirmOutput");
  let promptOutput = document.getElementById("promptOutput");
  confirmBtn.addEventListener("click", () => {
    promptOutput.value = "";
    confirmOutput.innerText = "";
    confirmDialog.showModal();
  });
  confirmDialog.addEventListener("close", () => {
    console.log(confirmDialog.returnValue);
    confirmOutput.innerText = `Confirm result: ${confirmDialog.returnValue}`;
  });
}

export function promptDialogSetup() {
  let promptBtn = document.getElementById("Prompt");
  let promptDialog = document.getElementById("promptBox");
  let output = document.getElementById("userInput");
  let promptOutput = document.getElementById("promptOutput");
  let confirmOutput = document.getElementById("confirmOutput");

  promptBtn.addEventListener("click", () => {
    confirmOutput.innerText = "";
    promptOutput.value = "";
    output.value = "";
    promptDialog.showModal();
  });
  promptDialog.addEventListener("close", () => {
    let pureOutput = DOMPurify.sanitize(output.value);
    if (promptDialog.returnValue != "false") {
      promptOutput.innerText = `prompt result: ${pureOutput}`;
    } else {
      promptOutput.value = "User didn't enter anything";
    }
  });
}
