


class TransForm {

  /**
   * shorten long titles
   * @param {string} title 
   * @param {int} length 
   */
  shortenLength (title, length){
    let shortTitle;

    if(title.length > length){
     const stripTitle = title.substr(0, length);
      shortTitle = stripTitle.substr(0, stripTitle.lastIndexOf(' '))+'...';
    }else{
       shortTitle = title;
    }

    return shortTitle
}


/**
 * converts first character to upper case
 * @param {string} name 
 */
toUpper(name){
  let upper = name.split(" ").map(name => name.substr(0,1).toUpperCase() + name.slice(1));
  return upper.join(" ");
}

/**
 * converts slug to a normal string and capitalize it
 * @param {string} name 
 */
slugToUpper(name){
  let upper = name.split("-").map(name => name.substr(0,1).toUpperCase() + name.slice(1));
  return upper.join(" ");
}

/**
 *checks if array and current item === option and set check to true
 otherwise check if option and array are equal
 * @param {mixed} array 
 * @param {mixed} option 
 */
check(array, option){
  let check;
  if(Array.isArray(array)){
    array.map((i) => {
     if(i === option){
       check = true
     }
    })
  }else{
    if(array === option){
      check = true
    }
  }
 return check;
}

/**
 * converts a number to currency format
 * @param {int} num 
 */
formatNum(num){
  return new Intl.NumberFormat().format(num);
}

/**
 * replaces part of phone number with XXXXXX
 * @param {number} phone 
 */
formatPhone(phone){
  const num = phone.substr(4);
return phone.replace(num, 'XXXXXXX')
}

}







export {TransForm}