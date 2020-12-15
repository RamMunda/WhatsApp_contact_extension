var extract = [];

/**
 * Utility/Helper function
 *
 * @param name
 * @returns {*}
 */
function sanitizeName(name){
	if (name) {
		//strip comments
		name = name.replace(/<\!--.*?-->/g, "");

		//hey, I am an image? Groce!
		if (name.charAt(0) == '<') {
			name = 'n/a';
		}

		//hey, I have an image in me? Cut it out, I don't want to see it
		name = name.replace(/<\/?[^>]+(>|$)/g, "");
	} else {
		name = 'n/a';
	}

	return name;
}

/**
 * Utility/Helper function
 *
 * @param number
 * @returns {string|XML|*}
 */
function sanitizeNumber(number){
	number = number.replace(/ /g, '');
	number = number.replace(/-/g, '');
	number = number.replace(/\(/g, '');
	number = number.replace(/\)/g, '');
	//number = number.replace(/\+/g, '00');
	return number;
}


/**
 * Method analyzes group information and reads the numbers from it
 */

function getNumbersFromGroupInfo() {
	var counter = 0;
	$('.eJ0yJ._1Mq-e ._3CneP ._357i8 span').each(function (e) {
		var number = $(this).attr('title');
		console.log(number);
		if (number && number.charAt(0) == '+') {
			//console.log(candidate)
		} else {
			return true;
		}

		//figure out name (if any)
		var contentDiv = $(this).parents('._2kHpK');
		
		var k = $(contentDiv).find('._3Whw5');
		
		var name = $(contentDiv).find('._3Whw5')[k.length - 1].innerText;

		console.log("name :", name)

		name     = sanitizeName(name);
		number   = sanitizeNumber(number);

		var row = [number, name];
		extract[number] = row;

		counter++;
	});

	console.log('Extracted '+counter+' non-unique entries from Group Info');
}
/**
 * Method analyzes chat history and reads the numbers from it
 */


/**
 * Method to pack data into a CSV/TSV file
 * I had to do it this way, as I cannot otherwise access the clipboard from code:
 * 1. create a dummy field
 * 2. put data into it
 * 3. copy the data from it
 * 4. remove the field
 */
function packitForCSV() {
	var csv = '';

	for(var k in extract){
		csv += '" ' + extract[k][0] + ' "\t"' + extract[k][1] + "\"\n";
	}

	var input = document.createElement('textarea');
	document.body.appendChild(input);
	input.value = csv;
	input.focus();
	input.select();
	document.execCommand('copy');
	input.remove();
}

//RUN!

function expotingContact(){
    try {
        //so, call them all one by one
        getNumbersFromGroupInfo();
    
        packitForCSV();
    
        //also output data to the console for convenience
        console.table(extract);
    
		//and render an alert to infor the user the operation has completed
		setTimeout(()=>{
			alert('Extracted a total of ' + Object.keys(extract).length + ' unique numbers, paste them to any document or spreadsheet!');

		},11000);
    } catch(err) {
        alert('Something went wrong and nothing worked. Error message: '+err.message);
    }
}

function clickOncrtDiv(){
	var crtDiv = document.querySelectorAll(".eJ0yJ._1Mq-e").length;

	eventFire(document.querySelectorAll(".eJ0yJ._1Mq-e")[crtDiv-1], 'click');
	$('._1qDvT._2wPpw').animate({
		scrollTop: document.querySelector("._1TM40").offsetHeight,                       
	  }, 5000);	
	console.log("work..."); 
}

const eventFire = (el, etype) => {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent(etype, true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
    el.dispatchEvent(evt);
    console.log(evt);
}

chrome.runtime.onMessage.addListener(msgObj => {
    if(msgObj){
		if(document.querySelector("._1iFv8")){
			eventFire(document.querySelector("._33QME"), 'click');
		}
        $(document).ready(function() {
            $('._1qDvT._2wPpw').animate({
              scrollTop: document.querySelector("._1TM40").offsetHeight,                       
			}, 5000);

            setInterval(() => {
            expotingContact();    
			}, (300));
			
			setTimeout(()=>{
				clickOncrtDiv();
            
			},7000);

        });
    }

});