function restrictAlphabets(e) {                            //function to restrict the alphabet entry as input
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57))
        return true;
    else
        return false;
}



document.getElementById("validate_button").addEventListener("click",()=>button_press()); 
 // to trigger a event when the button is presses





function button_press()
{                                   // function that determines whether our final sudoku is correct or not
var result=validate();
if(result) 
{
 return alert("Sudoku is Solved,Congratulations!!");
} 
else 
{
  return alert("Failed!Please fill correctly and remove the duplicate values which are red");
}

}





function validate()                          //function that checks the validity of sudoku by checking sum of rows,columns,and grid

{
  var board = Array(9).fill(0).map(() => Array(9));        //cells value passed to array (passing html content as array to use js on)
  const myInputs = document.querySelectorAll("input");
  var i_index=0;
  for(var i=0;i<9;i++)
  {
      for(var j=0;j<9;j++)
      {
          board[i][j] = myInputs[i_index++].value;
      }
  }
console.log(board);   //value of input passed to array

localStorage.setItem("array",[`${board}`]);            //bonus


for(var i = 0; i < 9; i++) 
{                             //check sum of each row
    var row_sum = 0; 
    for(var j = 0; j < 9; j++)
    {
      row_sum += parseInt(board[i][j]);
    }
    console.log(row_sum)
    if(row_sum !== 45) 
    {
      return false;
    }
}


for(var i = 0; i < 9; i++) 
{                                                 //check sum of each column
    var col_sum = 0;
    for(var j = 0; j < 9; j++)
    {
      col_sum += parseInt(board[j][i]);
    }
    console.log(col_sum);
    if(col_sum !== 45) 
    {
      return false;
    }
  }



  var row_index= 0;                                               //check sum of each 3 X 3 grid

  while(row_index < 9) 
  {
    var grid1 = 0, grid2 = 0, grid3 = 0;

    for (var i = row_index; i < row_index + 3; i++) 
    {
      for (var j = 0; j < 3; j++) 
      {
        grid1+= parseInt(board[i][j]);
      }
    }

    for (var i = row_index; i < row_index + 3; i++)
    {
      for (var j = 3; j < 6; j++) 
      {
        grid2+= parseInt(board[i][j]);
      }
    }

    for (var i = row_index; i < row_index + 3; i++) 
    {
      for (var j = 6; j < 9; j++) 
      {
        grid3+= parseInt(board[i][j]);
      }  
    }
      row_index += 3;
      if(grid1 !== 45 || grid2 !== 45 || grid3 !== 45) 
      {
        return false;
      }
    }


  return true;
}





function highlight()
{                                           //highlight the row column and 3 X 3 grid of the selected cell
  const td_value = document.querySelectorAll("td");
  for(var x = 0; x < 81; x++) 
  {
    const item = td_value[x];
    item.querySelector("input").onfocus = () => {
      let r_ind = parseInt(item.id / 10);
  
      let c_ind = parseInt(item.id % 10);

           Instance_duplicates(item);       //call the function to highlight multiple occurrence and duplicates when the input is focused

      for (var i = 0; i< 81; i++) 
      {
        var input = td_value[i].querySelector("input");
          if(parseInt(td_value[i].id / 10) === r_ind)            //highlighting row
          {
            input.classList.add("highlight");
            input.classList.remove("disabled");
          } 
          else if(parseInt(td_value[i].id % 10) === c_ind)       //highlighting column
          {
            input.classList.add("highlight");
            input.classList.remove("disabled");
          } 
          else 
          {
            input.classList.remove("highlight");
            if(input.disabled)
            {
              input.classList.add("disabled");
            }
          }
        
      }

  const grid = document.querySelectorAll(`.${item.classList[1]}`);         //highlighting 3 X 3 grid

    for(let j = 0; j < grid.length; j++) 
    {
      const element = grid[j].querySelector("input");
        element.classList.add("highlight");
        input.classList.remove("disabled");
    }
    }
  }
}




function Instance_duplicates(item)   //function to highlight the instances and highlight input in case of duplicates
{                                          
  const t_data= document.querySelectorAll('td');
  
  for(var i = 0; i < t_data.length; i++) 
  {
    const t_in = t_data[i].querySelector("input");
    const r_in = parseInt(t_data[i].id / 10);
    const c_in = parseInt(t_data[i].id % 10);
    
    if(item.querySelector("input").value && t_in.value === item.querySelector("input").value && t_data[i].id !== item.id) 
    {
      t_in.classList.add("multi_occur");
      if(r_in === parseInt(item.id / 10) || c_in === parseInt(item.id % 10) || item.classList[1] === t_data[i].classList[1])
       {
        item.querySelector("input").classList.add("duplicates");    
        
      } 
    } 
    else if(!item.querySelector("input").value && item.id !== t_data[i].id)
     {
      item.querySelector("input").classList.remove("duplicates");
      t_in.classList.remove("multi_occur");
    } 
    else 
    {
      t_in.classList.remove("multi_occur");
    }
  }
}





function call_instfunct()
{                                                 //function to highlight instances at the time of passing input
  var td_data = document.querySelectorAll("td");

  td_data.forEach(item => {
    item.querySelector("input").oninput = () => {
      Instance_duplicates(item);
      bg_input();
    }
  })
}




function bg_input()                            //function to change background when user inputs a value
{

  var input_all=document.querySelectorAll("input");
  input_all.forEach(item => {
    if(item.value && (!item.disabled))
    {
      item.classList.add("input_bg");
    }
    else
    {
      item.classList.remove("input_bg");
    }
  })

}



highlight();
call_instfunct();
