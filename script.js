const selectTag = document.querySelectorAll("select");
//console.log(selectTag);
const translateBtn=document.querySelector("#translate");
const fromText=document.querySelector("#fromText");
const toText=document.querySelector("#toText");

const icons=document.querySelectorAll("img");


selectTag.forEach((tag,id)=>{

  for(const countrycode in countries){
    let selected;
    if(id===0 && countrycode==="kn-IN"){
      selected=" selected";
    }
    else if(id===1 && countrycode==="en-GB"){
      selected=" selected";
    }
    let option=`<option value="${countrycode}" ${selected}>${countries[countrycode]}</option>`;
    tag.insertAdjacentHTML("beforeend",option);
  }
});

translateBtn.addEventListener(("click"),()=>{
  let text=fromText.value, transFrom=selectTag[0].value, transTo=selectTag[1].value;

  const apiURL=`https://api.mymemory.translated.net/get?q=${text}&langpair=${transFrom}|${transTo}`;

  fetch(apiURL).then(res=>res.json()).then(data=>{
    toText.value=data.responseData.translatedText;
  })
});

 

icons.forEach(icon=>{
  icon.addEventListener("click",({target})=>{
  if(target.classList.contains("copy") ){
    //console.log("copy");
    if(target.id=="from")
      navigator.clipboard.writeText(fromText.value);
    else
      navigator.clipboard.writeText(toText.value);
  }
  else{
    //console.log("speak");
    let sound;
    if(target.id=="from"){
      sound=new SpeechSynthesisUtterance(fromText.value)
      sound.lang=selectTag[0].value;
    }
    else{
      sound=new SpeechSynthesisUtterance(toText.value)
      sound.lang=selectTag[1].value;
    }
    speechSynthesis.speak(sound);
  }
  })
});
