
//object for the statement/phrase
function Phrase(inp, stmt, nBlanks){
  this.inp = inp;
  this.statement = stmt;
  this.word = 0;
  this.nBlanks = nBlanks;
  this.storeList = [];
  this.prevInp = "";
  //store previous user input
  this.storeInp = function(inp){
    this.prevInp = inp.value;
  };

  //true if n number is found within array
  this.oneEqual = function(n,arr){
    for (i in arr){
      if (n === arr[i]){
        return true;
      }
    }

    return false;
  }


  //replace characters with underlines for the word
  //then store information for later restoration
  this.underLine = function(str, n){
    let underStr = "";

    this.storeList.push(
      {
        number: n,
        w: str
      });

    //sort storeList so that first blank pops up first (Ascending)
    this.storeList.sort((a,b) => (a.number > b.number) ? 1:-1);

    for(let i = 0; i < str.length; i++){

      underStr += "_";

    }

    return underStr;


  }

  //hides 'three' words
  this.hideString = function(str){
    let list = str.split(" ");
    let rnList = []; //store values of rand numbers

    let wordsHidden = 0;

    while(wordsHidden < this.nBlanks){

      let number = Math.floor(Math.random() * list.length);

      //avoid having less than or more than 'three' underlines
      if(this.oneEqual(number, rnList)){
        continue; //goes back to start of while loop
      }


      list[number] = this.underLine(list[number], number);
      rnList.push(number);
      wordsHidden++;

    }

    return list.join(" ");

  }

  //hides the string with blanks *main function*
  this.hideStatement = function(entered){

    //current input value : previous input value
    let inputVal = entered ? this.inp.value.trim() : this.prevInp.trim(); //true means the user pressed 'Enter' :  false means the user clicked 'Reset' button

    if(!(inputVal === "")){
      //reset storage List and word for every new input
      this.storeList = [];
      this.word = 0;



      let hidden = this.hideString(inputVal);


      if(entered){
        this.storeInp(this.inp);
        this.inp.value = ""; //reset input value to hide memorize statement
      }

      this.statement.innerHTML = hidden;

    }

  } //hideStatement end



} //Object end

//returns length of input value
function numberOfWords(inp){
  return inp.split(" ").length;
}



let input = document.getElementById("icon_prefix2");
let statement = document.getElementById('statement');

let sliderVal = document.getElementById('slider');
let numberOfBlanks = document.getElementById('slider').value; //default-value: 3

$('#statementCard').hide(); //hide bottom card-panel at the beginning

sliderVal.addEventListener('input', function(e){
  numberOfBlanks = e.target.value;
  phrase.nBlanks = numberOfBlanks;
});




let phrase = new Phrase(input, statement, numberOfBlanks);





try{
//when enter is pressed while inside input, hides words
input.addEventListener("keyup", function(event){


  if(event.keyCode == 13){

    if(numberOfWords(input.value) <= numberOfBlanks){throw alert("Number of items must be greater"
    + " than slide value. (at least one word/element must be displayed.)");} //quiz wouldn't make sense without context

    else{
      $('#statementCard').show();
      phrase.nBlanks = numberOfBlanks;
      phrase.hideStatement(true);
    }

  }


});



let rset = document.getElementById('reset');

//when button clicked, use the same input again and again
rset.addEventListener("click", function(event){
  if(numberOfWords(phrase.prevInp) <= numberOfBlanks){throw alert("Number of elements must be greater"
   + " than slide value. (at least one word/element must be displayed.)");}
  phrase.hideStatement(false);



});



//each time paragraph clicked, reveal a blank line
statement.addEventListener("click", function(event){

  let w = statement.innerHTML;
  let wList = w.split(" ");

  let storeList = phrase.storeList;
  let word = phrase.word;


  if(phrase.word < phrase.nBlanks){
    wList[storeList[word].number] = "<i>"+storeList[word].w+"</i>";


    let wstr = wList.join(" ");

    statement.innerHTML = wstr;

    phrase.word++;
  }


});



}catch(err){

alert(err);
}
