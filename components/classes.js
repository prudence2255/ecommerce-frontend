

class TransForm {

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


toUpper(name){
  let upper = name.split(" ").map(name => name.substr(0,1).toUpperCase() + name.slice(1));
  return upper.join(" ");
}

slugToUpper(name){
  let upper = name.split("-").map(name => name.substr(0,1).toUpperCase() + name.slice(1));
  return upper.join(" ");
}

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

formatNum(num){
  return new Intl.NumberFormat().format(num);
}

formatPhone(phone){
  const num = phone.substr(4);
return phone.replace(num, 'XXXXXXX')
}

}







export {TransForm}