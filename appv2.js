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
var allText;

function textAnalyzer () {
  $('form.js-textform').submit(function(event){
    event.preventDefault();
    allText = $('.js-textarea').val();
    console.log(allText);
    htmlVarInjector(allText, '.js-raw-text');
    // var wordArray = ArraySplitToWord(allText);
    // console.log(wordArray);
    // var uniqWord = UniqueWordobj(wordArray);
    // console.log(uniqWord);
    var sentArray = arraySplitToSent(allText);
    console.log(sentArray);

  })
}

// returns an array containing the lengths of all of the words
// Make sure the input array contains all characters, separated as
// ["el1", "el2", etc]
function totalWordLen(array) {
  var wordLengthsAr = [];
  var totalLength = 0;
  array.forEach(function(element){
    if (element !== "" && element !== " ") {
    wordLengthsAr.push(element.length);
    totalLength+= element.length
    }
  })
  // console.log(wordLengths);
  return totalLength;
}

function wordAvg(wLen, wCount) {
  var avg = wlen / wCount;
  return avg;
  }

// returns the word count of an array
function totalWordCount(array) {
  var wordCount = 0
  array.forEach(function(element){
    if (element !== "" && element !== " ") {
      wordCount += 1;
    }
  })
  // console.log(wordCount);
  return wordCount;
}


//return true if submitted text is a number AND has no white space
function hasNumberNoSpc (text) { // method name is confusing
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
  if (text) {
    var lower = text.toLowerCase();
    var upper = text.toUpperCase();
    var result = "";
    for(var i=0; i<lower.length; ++i) {
      if(hasNumberNoSpc(text[i]) || (lower[i] != upper[i]) || (lower[i].trim() === '')) {
        result += text[i];
      }
    }
    console.log(result);
    return result;
  }
  return '';
}



// converts the text to an array splitting the index at spaces and new line ignores special characters
function arraySplitToWord(text) {
  var wordSplit = text.split(/ |\n/);
  console.log(wordSplit);
  return wordSplit;
}

// converts the text to an array of sentences:
// tests whether it is a dictionary sentence or one without punctuation
// if sentences do not end with standard punctuation, count line breaks
// outputs an array of sentences

function arraySplitToSent(text) {
  var standardSentEx = new RegExp('/[\.!\?"] /');
  var sentenOut = [];
  if (standardSentEx.test(text) === true) {
    sentenOut = text.split(standardSent);
    return sentenOut
    } else {
    sentenOut = text.split("\n");
    return sentenOut;
    }
}

// creates an object out of an array by posting and counting the
// uniqKeys of the object. returns a count of the unique keys
// storing the object for (possibly) later use
function uniqueWordCount(array) {
  var keyCount = 0;
  var uniObj = {};
  var id = 0;
  array.forEach(function(key){
    if (uniObj[key] === undefined) {
    uniObj[key] = id++;
    keyCount += 1;
    }
  })
  console.log(keyCount)
  return keyCount;
}




// Creates html orderered list elements based on the
// contents of an array, and outputs the element
function createOlWithClass (arr, clas) {
	var OlHtml = ''
	arr.forEach(function (el) {
		Olhtml += '<li>' + el + '</li>'
	})
	  OlHtml = '<ol class=' + clas + '>' + OlHtml + '</ol>';
    return Olhtml
}

// injects variables into the Dom
function htmlVarInjector(txtvar, clas) {
  $(clas).text(txtvar);
  if( $('dl').hasCLass('hidden')) {
    $('dl.text-report').removeClass('hidden');
  }
}


// function call
textAnalyzer();
// htmlVarInjector(allText, 'js-raw-text');
