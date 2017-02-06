// Todo:

// V 1. function to pull text on submit button click, and return it to a variable as a string
// V 2. function to convert string to an array, to be analyzed
// 3. function to convert array into an object
// 4. function to do word count
//    a. for each loop sending each element into an object, counting each element in variable "wordcount"
// 5. unique word count
//    b. using the for each loop step 2 to send each element into a separate key
// 6. word length
//    c. as forEach function runs, store element.length in a variable for each element
// 7. average sentence length in characters
//    d. for the original array, designate line breaks (and maybe other things) as sentence enders,
//     separate each into a separate array and join all the characters and count .length
// 8. function to inject counter variables for word stats back into the DOM, and remove the .hidden class when done

function textAnalyzer () {

  var allText
  $('form.textform').submit(function(event){
    event.preventDefault();
    allText = $('div > textarea').val();
    // console.log(allText);
    var specialsRemove = removeSpecial(allText);
    var textArray = textToArray(specialsRemove);
    console.log(textArray);
  })
}

//return true if submitted text is a number AND has no white space
function hasNumber (text) { // method name is confusing
  // Really pay attention to variable hoisting

  var regNum = new RegExp('[0-9]+'); // this matches the string "a9"
  var regNoSpace = new RegExp('^[^\s]+$');

  // indentation represents blocks: functions, while, for, if, switch, etc.
  // quality syntax: indentation (using tabs vs. spaces, tab length, etc.)
  //                 variable names
  //                 appropriate use of functions

  if ((regNum.test(text)) === true && (regNoSpace.test(text) === true)) {
    return true;
  }

  return false;
}
//  "5".LowerCase = 5, "%".toUpperCase = %
//removes special characters (but leaves spaces) (not including numbers from string)
function removeSpecial (text) {
  if(text) {
    var lower = text.toLowerCase();
    var upper = text.toUpperCase();
    var result = "";
    for(var i=0; i<lower.length; ++i) {
      if(hasNumber(text[i]) || (lower[i] != upper[i]) || (lower[i].trim() === '')) {
        result += text[i];
      }
    }
    console.log(result);
    return result;
  }
  return '';
}



// converts the text to an array splitting the index at spaces
function textToArray(text) {
  var textSplit = text.split(" ");
  console.log(textSplit);
  return textSplit;
}

// function call
textAnalyzer();
