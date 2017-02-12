// Todo:

// V 1. function to pull text on submit button click, and return it to a variable as a string
// V 2. function to convert string to an array, to be analyzed
// V 3. function to convert array into an object
// V 4. function to do word count
//   V a. for each loop sending each element into an object, counting each element in variable "wordcount"
// V 5. unique word count
//   V b. using the for each loop step 2 to send each element into a separate key
// V 6. word length
//  V  c. as forEach function runs, store element.length in a variable for each element
// V 7. average sentence length in characters
//   V  d. for the original array, designate line breaks (and maybe other things) as sentence enders,
//    V separate each into a separate array and join all the characters and count .length
// V 8. function to inject counter variables for word stats back into the DOM, and remove the .hidden class when done

var uniqueWordObj = {}; // only global, referenced by uniqueWordObj function

// MAIN FUNCTION
// Listens for an event on the form
// On a button click, runs analytics and injects them into the DOM

function formListenPullAnalyze() {
  var allText = "";
  $('form.js-textform').submit(function(event) {
    event.preventDefault();
    allText = $('.js-textarea').val();
    htmlRemover();
    // console.log(allText);
    // Text as inputed //
    // Text grabbed from textArea
    htmlVarInjector(allText, '.js-raw-text');

    // Text without special characters //
    // Raw text put through removeSpecial function to
    // remove special characters !@#$%^&*()
    var textNoSp = removeSpecial(allText);
    htmlVarInjector(textNoSp, '.js-text-no-specials');

    // Word count //
    // Text is split into an array of words
    // The elements of the array of words are counted
    var wordArray = arraySplitToWord(allText);
    var wordCount = totalWordCount(wordArray);
    htmlVarInjector(wordCount, ".js-word-count");

    // Word count without special characters
    // text with no special characters is split into
    // into an array of words
    // The elements of the array of words are counted
    var wordArrayNoSp = arraySplitToWord(textNoSp);
    var wordCountNoSp = totalWordCount(wordArrayNoSp);
    htmlVarInjector(wordCountNoSp, '.js-word-count-no-special');

    //  Unique word Count //
    // The array of words is sort into an object of unique words
    // The count of unique words is returned
    var uniWordCount = uniqueWordCount(wordArray);
    htmlVarInjector(uniWordCount, '.js-unique-word-count');

    // Average word length //
    // The array of words is counted into individual characters and the count returned
    // The total character length is divided by the number of words
    // (measured by the number of elements in the word array)
    var totalWordLength = totalCharLen(wordArray);
    var averageWordLength = wordAvg(totalWordLength, wordCount);
    htmlVarInjector(averageWordLength, '.js-average-word-length');

    // Average word length no special characters //
    // Same as average word length, except the word array with no special
    // characters is used as the initial input
    var totalWordLengthNoSp = totalCharLen(wordArrayNoSp);
    var averageWordLengthNoSp = wordAvg(totalWordLengthNoSp, wordCountNoSp);
    htmlVarInjector(averageWordLengthNoSp, '.js-average-word-length-no-special');

    // Average sentence length //
    // the total word count divided by the number of sentences
    var sentenceArray = arraySplitToSent(allText);
    var numberofSentences = totalWordCount(sentenceArray);
    var sentenceLength = wordAvg(wordCount, numberofSentences);
    htmlVarInjector(sentenceLength, '.js-average-sentence-length');

    // Unique word list //
    // The intentional pass-by-reference on the uniqueWordObj created by
    // the uniqueWordCount function is used to obtain the keys of the Object
    // containing all of the unique words. That is fed into the ordered list
    // html creator function
    var uniquewordArr = Object.keys(uniqueWordObj)
    var uniquewordOL = createOlWithClass(uniquewordArr, "unique words");
    $('.js-unique-word-list').append(uniquewordOL);


    // Frequent word list //
    // Creates a frequent word object using the word array function
    // Sorts through the keys
    // Feeds the keys and object into a modified ordered list creator
    // Injects the ordered list into the DOM
    var frequentWordObj = frequentWords(wordArray);
    // console.log(frequentWordObj);
    var reverseKeys = Object.keys(frequentWordObj).sort(function(a,b) {
     return frequentWordObj[b]-frequentWordObj[a]
   });
   var freqWordHtml = createOlFreqWordWithClass(reverseKeys, 'js-frequent-word-list', frequentWordObj);
   $('.js-frequent-word-list').append(freqWordHtml);
    //  console.log(reverseKeys);

     // easter egg
     if (/(trump)|(Trump)/.test(allText)) {
      alert("I hope you're not a trump supporter!")
    }
   });

    //   frequentWordObj= frequentWordObj.map(function(ele, i, ar){
    //    frequentWordObj = frequentWordObj[reverseKeys[i]]
    //  });
    //    console.log(frequentWordObj);
  }


// Main function call

formListenPullAnalyze();

// returns an array containing the lengths of all of the words
// takes an array of words as an input
function totalCharLen(array) {
  var wordLengthsAr = [];
  var totalLength = 0;
  array.forEach(function(element) {
    if (element !== "" && element !== " ") {
      wordLengthsAr.push(element.length);
      totalLength += element.length;
    }
  })
  // console.log(wordLengths);
  return totalLength;
}


// do I really have to explain this one?
function wordAvg(wLen, wCount) {
  return wLen / wCount;
}


// returns the word count of an array
function totalWordCount(array) {
  var wordCount = 0;
  array.forEach(function(element) {
    if (element !== "" && element !== " ") {
      wordCount += 1;
    }
  });
  // console.log(wordCount);
  return wordCount;
}


// return true if submitted text is a number AND has no white space
function hasNumberNoSpc(text) {

  var regNum = new RegExp('[0-9]+'); // this matches the string "a9"
  var regNoSpace = new RegExp('^[^\s]+$');

  if ((regNum.test(text)) === true && (regNoSpace.test(text) === true)) {
    return true;
  }

  return false;
}

/*
  doing something with a couple of vars
  for loop
    if
    else
*/

// "5".LowerCase = 5, "%".toUpperCase = %
// Filters characters that have the same upper and lower case results
// removes special characters (but leaves spaces) (not including numbers from string)
function removeSpecial(text) { // removeSpecialChars
  // return text.replace(/[^a-zA-Z0-9\s]/g, "");

  if (text) {
    var lower = text.toLowerCase();
    var upper = text.toUpperCase();
    var result = "";
    for (var i = 0; i < lower.length; ++i) {
      if (hasNumberNoSpc(text[i]) || (lower[i] != upper[i]) || (lower[i].trim() === '')) {
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
  // console.log(wordSplit);
  return wordSplit;
}


// converts the text to an array of sentences:
// tests whether it is a dictionary sentence or one without punctuation
// if sentences do not end with standard punctuation, count line breaks
// outputs an array of sentences
function arraySplitToSent(text) { // textToLineArray()
  var standardSentEx = new RegExp('/[\.!\?"] /');
  var sentenOut = [];
  if (standardSentEx.test(text) === true) {
    sentenOut = text.split(standardSent);
    return sentenOut;
  } else {
    sentenOut = text.split("\n");
    return sentenOut;
  }
}


// creates an object of the words occuring most freuqntly
function frequentWords(wordarr) {
  var frequentWordsobj = {};
  wordarr.forEach(function(element){
    if (frequentWordsobj.hasOwnProperty(element)) {
      frequentWordsobj[element] +=1
    } else {
      frequentWordsobj[element] = 1
    }
  });
  console.log(frequentWordsobj);
  return frequentWordsobj;
}


// sorts an object in descending order
function objRevSort(obj) {
 Object.keys(obj).sort(function(a,b) {
  obj[a]-obj[b];
});
  // console.log (objj);
}


// creates an object out of an array by posting and counting the
// uniqKeys of the object. returns a count of the unique keys
// storing the object (with numbericaly increasing values for each key
function uniqueWordCount(array) {
  var keyCount = 0;
  var id = 0;
  array.forEach(function(key) {
    if (uniqueWordObj[key] === undefined) {
      uniqueWordObj[key] = id++;
      keyCount += 1;
    }
  })
  console.log(keyCount)
  return keyCount;
}


// Creates html orderered list elements based on the
// contents of an array, and outputs the element
function createOlWithClass(arr, clas, optionalObj) {
  var olHtml = '', optionalText = "",
      optionalObjPassed = (typeof optionalObj !== "undefined");

  arr.forEach(function(el, index, ar) {
    optionalText = (optionalObjPassed) ? ":" + optionalObj[el] : "";
    olHtml += '<li>' + el + optionalText + '</li>';
  });

  olHtml = '<ol class=' + clas + '>' + olHtml + '</ol>';

  // var ary = ["a", "b", "c"];
  var htmlStringAry = arr.map(function(el, index, ar) {
    optionalText = (optionalObjPassed) ? ":" + optionalObj[el] : "";
    return '<li>' + el + optionalText + '</li>';
  });
  // ary = ["<li>a</li>", "<li>b</li>", "<li>c</li>"]
  // ary = "<li>a</li><li>b</li><li>c</li>"
  // clas = "apple";
  // olHtml = '<ol class="apple"></ol>';
  olHtml = '<ol class="' + clas + '">' + htmlStringAry.join("") + '</ol>';

  return olHtml;
}

// if(obj)

/*
function foo(a, b, c, d){};
function foo(){};

foo(1, 2, 3, 4, 5, 6, 7);

if(typeof obj === "undefined") // wasn't passed in
*/

// Modified
function createOlFreqWordWithClass(arr, clas, obj) {
  var OlHtml = '';
  arr.forEach(function(el, index, ar) {
    OlHtml += '<li>' + el + ":" + obj[el] + '</li>'
  });
  OlHtml = '<ol class=' + clas + '>' + OlHtml + '</ol>';
  return OlHtml;
}


// Injects variables into the Dom
// concatVarWithHtmlAndAppendToClass()
// appendTextToClass(text, class)
// why append to class?
// displayResult(result, class)
function htmlVarInjector(txtvar, clas) {
  /*
  var = htmlStr = '';

  if(isArray(result)) {
    htmlStr = getHtmlForArray(result)
  } else {
    htmlStr = "<p>" + result + "<p>";
  }

  $(clas).append(htmlStr);
  */


  // check to see what result is?
  // if result is an array
  //  var html = getOrderedList(result);
  // else result is object
  var htmlP = "<p>" + txtvar + "<p>"
  $(clas).append(htmlP);

  if ($('dl').hasClass("hidden")) {
    $('.text-report').removeClass('hidden');
  }

  // whatever the previous function came up with
  // now append to the class
}
// Removes html from the DOM for each analytics class
function htmlRemover() { // clearResults
  $('.text-report p, .text-report ol').remove();
}

// Good Programming Concepts
// 1. YAGNI - You ain't gonna need it (General)
// 2. SLAP - simple livel of abstraction principal (Small Talk)
// 3. Use names which explain meaning (General)
