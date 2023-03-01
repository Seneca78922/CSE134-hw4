
let lastID = 0;
let allBlogPosts = JSON.parse(localStorage.getItem("1"));

export function initBlogPosts() {
  //get array from loadstorage if exists, if null then add intial blog posts to array
  let blogList = document.getElementById("list");
  let addBtn = document.getElementById("addBtn");
    addBtn.onclick = function() {
    let addDialog = document.getElementById("addNew").cloneNode(true);
    document.body.appendChild(addDialog);
    addDialog.querySelector("#postTitleAdd").value= "";
    addDialog.querySelector("#postDateAdd").value= "";
    addDialog.querySelector("#postSummaryAdd").value ="";
    addDialog.showModal();
    addDialog.addEventListener("close", () =>{
        if (addDialog.returnValue !="false"){
          let newBlog = {
            postTitle: addDialog.querySelector("#postTitleAdd").value,
            postDate: addDialog.querySelector("#postDateAdd").value,
            postSummary: addDialog.querySelector("#postSummaryAdd").value
          }
          
          allBlogPosts.push(newBlog);
          localStorage.setItem("1", JSON.stringify(allBlogPosts)); 
          addDialog.remove()
          displayPosts(); 

        }
    });
   }
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

  displayPosts();
}

/* grab first item, iterate over each object, convert to string
   make it list item, append to list
*/
function displayPosts() {
  
  
  let blogList = document.getElementById("list");
  blogList.innerHTML = "";
  
  for (let i = 0; i < allBlogPosts.length; i++) {
    let blogPost = JSON.stringify(allBlogPosts[i]);
    console.log(blogPost);
    let listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(blogPost));
    

    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);
    blogList.appendChild(listItem); 
    deleteAndEditListeners(editBtn,deleteBtn,listItem,i);
    
  }

  function deleteAndEditListeners(editBtn, deleteBtn, listItem, i) {
    deleteBtn.onclick = function () {
    
      let deleteDialog = document.getElementById("deleteItem").cloneNode(true);
      document.body.appendChild(deleteDialog);
      deleteDialog.showModal();
      deleteDialog.addEventListener("close", () => {
        if (deleteDialog.returnValue != "false") {
           allBlogPosts.splice(i,1); 
           localStorage.setItem("1", JSON.stringify(allBlogPosts));    
          
          displayPosts();
        }
        deleteDialog.remove();
      });
    
    };
    editBtn.onclick = function () {
      let editDialog = document.getElementById("editExisting").cloneNode(true);
      document.body.appendChild(editDialog);
      editDialog.querySelector("#postTitleEdit").value= allBlogPosts[i].postTitle;
      editDialog.querySelector("#postDateEdit").value= allBlogPosts[i].postDate;
      editDialog.querySelector("#postSummaryEdit").value= allBlogPosts[i].postSummary;
      editDialog.showModal();
      
      console.log(i);
      editDialog.addEventListener("close", () => {
        if (editDialog.returnValue != "false") {
           allBlogPosts[i].postTitle = editDialog.querySelector("#postTitleEdit").value;
           allBlogPosts[i].postDate = editDialog.querySelector("#postDateEdit").value;
           allBlogPosts[i].postSummary = editDialog.querySelector("#postSummaryEdit").value;
           displayPosts();
           console.log(listItem.childNodes[0]);   
           console.log(allBlogPosts[i]);
           localStorage.setItem("1", JSON.stringify(allBlogPosts));  //update storage
        }
        editDialog.remove();
      });
    }

  }

}  

