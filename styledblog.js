 //delete at end to make persistent
localStorage.clear();
let lastID = 0;
let allBlogPosts = JSON.parse(localStorage.getItem("1"));

export function initBlogPosts() {
  //get array from loadstorage if exists, if null then add intial blog posts to array
  if (allBlogPosts === null || allBlogPosts.length === 0) {
    allBlogPosts = [
      {
        postTitle: "Learning Javascript Day 1",
        postDate: "02/25/2023",
        postSummary: "Javascript is hard."
      },
      {
        postTitle: "Javascript Modules and Imports",
        postDate: "02/25/2023",
        postSummary: "Can be confusing."
      },
      {
        postTitle: "Leetcode Streak Day 2",
        postDate: "02/25/2023",
        postSummary: "Just Kidding."
      }
    ];

    
    localStorage.setItem("1", JSON.stringify(allBlogPosts)); 
    lastID = 3; 
  }
  //prepopulate array of blog posts with 3 blogs
  //have to make localstorage persist through different browser loads
  //have to only call initBlogPost once to prevent clearing localStorage

  
  //each blog post can be edited, and deleted

  displayPosts();
}

/* grab first item, iterate over each object, convert to string
   make it list item, append to list
*/
function displayPosts() {
  //loop through each element, turn to string, grab it
  console.log("reloaded");
  let blogList = document.getElementById("list");
  let addBtn = document.createElement("button");
  addBtn.innerText= "Add blog post";
  document.body.appendChild(addBtn);
  addBtn.onclick = function() {
    let addDialog = document.getElementById("addNew");
    document.querySelector("#postTitleAdd").value= "";
    document.querySelector("#postDateAdd").value= "";
    document.querySelector("#postSummaryAdd").value ="";
    addDialog.showModal();
    addDialog.addEventListener("close", () =>{
        if (addDialog.returnValue !="false"){
          let newBlog = {
            postTitle: document.querySelector("#postTitleAdd").value,
            postDate: document.querySelector("#postDateAdd").value,
            postSummary: document.querySelector("#postSummaryAdd").value
          }
         
          allBlogPosts.push(newBlog);
          console.log(allBlogPosts.length);
          let i = allBlogPosts.length - 1;
          let listItem = document.createElement("li");
          let titleLine = document.createElement("p");
          titleLine.innerHTML="Post Title: " + allBlogPosts[i].postTitle;
          listItem.appendChild(titleLine);
          let dateLine = document.createElement("p");
          dateLine.innerHTML="Post Date: " + allBlogPosts[i].postDate;
          listItem.appendChild(dateLine);
          let summaryLine = document.createElement("p");
          summaryLine.innerHTML="Post Summary: " + allBlogPosts[i].postSummary;
          listItem.appendChild(summaryLine);
          
          
          let editBtn = document.createElement("button");
          let deleteBtn = document.createElement("button");
          editBtn.innerText = "Edit";
          editBtn.innerHTML = "<img src='images/pencil.png' width='20px'></img>";
          deleteBtn.innerText = "Delete";      
          deleteBtn.innerHTML = "<img src='images/trash.png' width='20px'></img>";


          
          listItem.appendChild(editBtn);
          listItem.appendChild(deleteBtn);
          blogList.appendChild(listItem); //makes invisible list items
          localStorage.setItem("1", JSON.stringify(allBlogPosts));
          deleteAndEditListeners(editBtn, deleteBtn,listItem);
          
          

        }
    });
  }
  for (let i = 0; i < allBlogPosts.length; i++) {
    let blogPost = JSON.stringify(allBlogPosts[i]);
    console.log(blogPost);
    let listItem = document.createElement("li");
    let titleLine = document.createElement("p");
    titleLine.innerHTML="Post Title: " + allBlogPosts[i].postTitle;
    listItem.appendChild(titleLine);
    let dateLine = document.createElement("p");
    dateLine.innerHTML="Post Date: " + allBlogPosts[i].postDate;
    listItem.appendChild(dateLine);
    let summaryLine = document.createElement("p");
    summaryLine.innerHTML="Post Summary: " + allBlogPosts[i].postSummary;
    listItem.appendChild(summaryLine);
    
    

    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
    editBtn.innerText = "Edit";
    editBtn.innerHTML = "<img src='images/pencil.png' width='20px' height='20px'></img>";
    deleteBtn.innerText = "Delete";      
    deleteBtn.innerHTML = "<img src='images/trash.png' width='20px' height='20px'></img>";
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);
    blogList.appendChild(listItem); //makes invisible list items
    
    deleteBtn.onclick = function () {
      //dialog box (like confirm), ok or cancel
        //remove string from list
        //get index, remove from allBLogPosts, then put thatback into localstorage
      //RELOADS THE ENTIRE PAGE FOR SOME REASON
      let deleteDialog = document.getElementById("deleteItem");
      deleteDialog.showModal();
      deleteDialog.addEventListener("close", () => {
        if (deleteDialog.returnValue != "false") {
           allBlogPosts.splice(i,1); //changes inplace so changes indexing scheme
           localStorage.setItem("1", JSON.stringify(allBlogPosts));
           this.parentElement.remove();  
        }
      });
    };
    editBtn.onclick = function () {
      let editDialog = document.getElementById("editExisting");
      document.querySelector("#postTitleEdit").value= allBlogPosts[i].postTitle;
      document.querySelector("#postDateEdit").value= allBlogPosts[i].postDate;
      document.querySelector("#postSummaryEdit").value= allBlogPosts[i].postSummary;
      editDialog.showModal();
      
      

      editDialog.addEventListener("close", () => {
        if (editDialog.returnValue != "false") {
           allBlogPosts[i].postTitle = document.querySelector("#postTitleEdit").value;
           allBlogPosts[i].postDate = document.querySelector("#postDateEdit").value;
           allBlogPosts[i].postSummary = document.querySelector("#postSummaryEdit").value;
           console.log(allBlogPosts[i].postDate);
           listItem.childNodes[0].textContent = "Post Title: " + allBlogPosts[i].postTitle;
           listItem.childNodes[1].textContent = "Post Date: " + allBlogPosts[i].postDate;
           listItem.childNodes[2].textContent = "Post Summary: " + allBlogPosts[i].postSummary;
           
           console.log(listItem.childNodes[0]);
           
           console.log(allBlogPosts[i]);
           localStorage.setItem("1", JSON.stringify(allBlogPosts)); //update storage
           
        }
      });
    };
  }

  function deleteAndEditListeners(editBtn, deleteBtn, listItem) {
    let i = allBlogPosts.length - 1;
    deleteBtn.onclick = function () {
      //dialog box (like confirm), ok or cancel
        //remove string from list
        //get index, remove from allBLogPosts, then put thatback into localstorage

      let deleteDialog = document.getElementById("deleteItem");
      deleteDialog.showModal();
      deleteDialog.addEventListener("close", () => {
        if (deleteDialog.returnValue != "false") {
           allBlogPosts.splice(i,1); //changes inplace so changes indexing scheme
           localStorage.setItem("1", JSON.stringify(allBlogPosts));
           this.parentElement.remove();  
        }
      });
    };
    editBtn.onclick = function () {
      let editDialog = document.getElementById("editExisting");
      document.querySelector("#postTitleEdit").value= allBlogPosts[i].postTitle;
      document.querySelector("#postDateEdit").value= allBlogPosts[i].postDate;
      document.querySelector("#postSummaryEdit").value= allBlogPosts[i].postSummary;
      editDialog.showModal();
      
      

      editDialog.addEventListener("close", () => {
        if (editDialog.returnValue != "false") {
           allBlogPosts[i].postTitle = document.querySelector("#postTitleEdit").value;
           allBlogPosts[i].postDate = document.querySelector("#postDateEdit").value;
           allBlogPosts[i].postSummary = document.querySelector("#postSummaryEdit").value;
           
           listItem.childNodes[0].textContent = "Post Title: " + allBlogPosts[i].postTitle;
           listItem.childNodes[1].textContent = "Post Date: " + allBlogPosts[i].postDate;
           listItem.childNodes[2].textContent = "Post Summary: " + allBlogPosts[i].postSummary;
           console.log(listItem.childNodes[0]);
           
           console.log(allBlogPosts[i]);
           localStorage.setItem("1", JSON.stringify(allBlogPosts)); //update storage
           
        }
      });
  }

}
  //after adding all elements, append add button to body that lauch add dialog and add node to list element and to allBlogPosts
  // let addBtn = document.createElement("button");
  // addBtn.innerText= "Add blog post";
  // document.body.appendChild(addBtn);
  // addBtn.onclick = function() {
  //   let addDialog = document.getElementById("addNew");
  //   document.querySelector("#postTitleAdd").value= "";
  //   document.querySelector("#postDateAdd").value= "";
  //   document.querySelector("#postSummaryAdd").value ="";
  //   addDialog.showModal();
  //   addDialog.addEventListener("close", () =>{
  //       if (addDialog.returnValue !="false"){
  //         let newBlog = {
  //           postTitle: document.querySelector("#postTitleAdd").value,
  //           postDate: document.querySelector("#postDateAdd").value,
  //           postSummary: document.querySelector("#postSummaryAdd").value
  //         }
  //         allBlogPosts.push(newBlog);
          
  //         let listItem = document.createElement("li");
  //         listItem.appendChild(document.createTextNode(JSON.stringify(newBlog)));
  //         let editBtn = document.createElement("button");
  //         let deleteBtn = document.createElement("button");
  //         editBtn.innerText = "Edit";
  //         deleteBtn.innerText = "Delete";
  //         listItem.appendChild(editBtn);
  //         listItem.appendChild(deleteBtn);
  //         blogList.appendChild(listItem); //makes invisible list items
  //         localStorage.setItem("1", allBlogPosts);
          

  //       }
  //   });
  // }

}  


  /*

  Object.keys(localStorage).forEach((key) => {
    let updatedKey = localStorage.length - key + 1;
    console.log(localStorage.getItem(updatedKey));
    console.log(updatedKey);
    let listItem = document.createElement("li");
    listItem.appendChild(
      document.createTextNode(localStorage.getItem(updatedKey))
    );
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);
    blogList.appendChild(listItem); //makes invisible list items

    deleteBtn.onclick = function () {
      //dialog box (like confirm), ok or cancel
        //remove string from list
        //grab id associated with the object (hae to convert from string to object), grab 
        //corresponding key in localstorage. call deletePost() with id
      
      let deleteDialog = document.getElementById("deleteItem");
      deleteDialog.showModal();
      deleteDialog.addEventListener("close", () => {
        if (deleteDialog.returnValue != "false") {
          deletePost(updatedKey);
          this.parentElement.remove();
        }
      });
    };
    editBtn.onClick = function () {
        let editDialog = document.getElementById("editExisting");
        editDialog.postTitle.value=localStorage.getItem(updatedKey).
    };
  });*/


//one for add dialog with info, retrieve values and call addpost with it