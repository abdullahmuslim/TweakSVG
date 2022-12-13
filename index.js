/*
  TweakSVG: SVG animation and manipulation library.
  version 1.0
*/
"use strict";

let SVGns = "http://www.w3.org/2000/svg";
let HTMLns = "http://www.w3.org/1999/xhtml";

Object.defineProperty(document, 'SVGs', {
  value: document.getElementsByTagName("svg"),
  enumerable: true,
  configurable: false
});
Object.defineProperty(SVGElement.prototype, 'innerSVG', {
  get() { return this.innerHTML; },
  set(newValue) {
    this.innerHTML = newValue;
    $UpdateSVG(this);
  },
  enumerable: true,
  configurable: true
});

HTMLElement.prototype.tweakSVGValue = "html";
SVGElement.prototype.tweakSVGValue = "svg";

SVGElement.prototype.transition = function() {
  // expected inputs (attributeName, time(s or ms), easeing, delay)
  if(typeof this.transitions === "undefined"){
    this.transitions = {};
  }
  if(arguments.length < 1){
    this.transitions.all = ["all", "0ms", "linear", "0ms"];
  }else if(arguments.length === 1){
    paramChecker(arguments[0]);
    this.transitions[arguments] = [arguments[0], "0ms", "linear", "0ms"];
  }else if(arguments.length === 2){
    paramChecker(arguments[0]);
    paramChecker(arguments[0], arguments[1]);
    this.transitions[arguments[0]] = [...arguments, "linear", "0ms"];
  }else if(arguments.length === 3){
    paramChecker(arguments[0]);
    paramChecker(arguments[0], arguments[1]);
    paramChecker(...arguments);
    this.transitions[arguments[0]] = [...arguments, "0ms"];
  }else if(arguments.length === 4){
    paramChecker(arguments[0]);
    paramChecker(arguments[0], arguments[1]);
    paramChecker(arguments[0], arguments[1], arguments[2]);
    paramChecker(...arguments);
    this.transitions[arguments[0]] = [...arguments];
  }
  function paramChecker() {
    switch (arguments.length){
      case 1:
        if(!/^[A-Za-z]+((?:[0-9]+)?(?:[a-zA-Z])?)*$/.test(arguments[0])){
          throw new paramError("positional argument 1: unacceptable or invalid attribute name");
        }
        break;
      case 2:
        if(!/^[0-9]+(?:\.[0-9]+)*?(ms|s)$/.test(arguments[1])){
          throw new paramError("positional argument 2: unacceptable or invalid unit");
        }
        break;
      case 3:
        if(!/^\w+.*$/.test(arguments[2])){
          throw new paramError("positional argument 3: unacceptable or invalid easeing function");
        }
        break;
      case 4:
        if(!/^[0-9]+(?:\.[0-9]+)*?(ms|s)$/.test(arguments[3])){
          throw new paramError("positional argument 4: unacceptable or invalid unit");
        }
        break;
      default:
        throw new paramError("Unexpected number of arguments");
    }
  }
  function paramError(messg){
    this.message = messg;
    this.name = "paramError";
  }
  return this;
}

SVGElement.prototype.pauseTransition = function(){
  if(arguments.length === 1){
    this.transitions[arguments[0]][5] = false;
    clearTimeout(this.transitions[arguments[0]][7])
  }else if(arguments.length > 1){
    let attributes = Array.from(arguments);
    for (let attribute of attributes){
      this.pauseTransition(attribute);
    }
  }
  return this;
}

SVGElement.prototype.resumeTransition = function(){
  if(arguments.length === 1){
    this.transitions[arguments[0]][5] = true;
    let _this = this;
    this.transitions[arguments[0]][7] = setTimeout($Transitioner(_this, arguments[0]));
  }else if(arguments.length > 1){
    let attributes = Array.from(arguments);
    for (let attribute of attributes){
      this.resumeTransition(attribute);
    }
  }
  return this;
}

SVGElement.prototype.terminateTransition = function(){
  if(arguments.length === 1){
    this.transitions[arguments[0]][4] = [];
    this.transitions[arguments[0]][5] = false;
    this.transitions[arguments[0]][7] = null;
  }else if(arguments.length > 1){
    let attributes = Array.from(arguments);
    for (let attribute of attributes){
      this.terminateTransition(attribute);
    }
  }
  return this;
}

SVGElement.prototype.setAttr = function(){
  if(arguments.length === 1){
    for (let i in arguments[0]){
      this.setAttr(i, arguments[0][i]);
    }
  }else if (arguments.length === 2){
    let initialValue = (this.getAttribute(arguments[0])).replace(/[a-zA-Z]+/, "");
    let [attr, value] = arguments;
    let unit = /[a-zA-Z]+/.test(value.toString())? value.toString().match(/[a-zA-Z]+/)[0] : "";
    let eases;
    if (this.transitions[attr]){
      eases = $Easer(60, this.transitions[attr][1], initialValue, value,  $EaseToCubic(this.transitions[attr][2]));
    }else if(this.transitions.all){
      this.transitions[attr] = Object.assign({}, this.transitions.all);
      eases = $Easer(60, this.transitions[attr][1], initialValue, value,  $EaseToCubic(this.transitions[attr][2]));
    }
    this.transitions[attr][4] = eases;
    this.transitions[attr][5] = true;
    this.transitions[attr][6] = unit
    this.transitions[attr][7] = null;
    let currentAttr = this.transitions[attr];
    let delay = /ms/.test(currentAttr[3]) ? currentAttr[3].replace("ms", "") :  currentAttr[3].replace("s", "") * 1000;
    let _this = this;
    currentAttr[7] = setTimeout(function(){$Transitioner(_this, attr);}, parseFloat(delay));
  }
  return this;
}

function $UpdateSVG(obj){
  while(obj.parentElement !== null && obj.tweakSVGValue !== "html"){
    obj = obj.parentElement;
  }
  let tempValue = "";
  for(let i = 0; i < obj.children.length; i++){
    tempValue += obj.children[i].outerHTML;
  }
  obj.innerHTML = tempValue;
}

function $Easer(){
  //expected inputs (fps, time, value, array of steps)
  let [fps, time, initialValue, value, steps] = [...arguments];
  time = (/ms/.test(time)) ? time.replace("ms", "") * 1: time.replace("s", "") * 1000;
  value -= initialValue;
  let nFace = steps.length;
  let totalFaceValue = 0;
  let result = [];
  for (let face of steps){
    totalFaceValue += face;
  }
  for (let i = 0; i < nFace; i++){
    let faceValue = value / nFace;
    let faceTimeNeeded = (steps[i] / totalFaceValue) * (time/1000);
    let fpsNeeded = 60 * faceTimeNeeded;
    let neededAccumulatingValue = faceValue / fpsNeeded;
    result[i] = [fpsNeeded, neededAccumulatingValue];
  }
  return result;
}

function $EaseToCubic(){
  switch (arguments[0]){
    case "linear":
      return [1, 1];
      break;
    case "ease-in":
      return [1, 0.5, 0.5, 1];
      break;
  }
}
function $Transitioner(){
  let _this = arguments[0];
  let attr = arguments[1];
  let initialValue = (_this.getAttribute(arguments[1])).replace(/[a-zA-Z]+/, "");
  let transitions = _this.transitions[attr][4];
  if(_this.transitions[attr][5] && transitions !== []){
    for (let i = 0;i < transitions.length; i++){
      if (typeof transitions[i] !== "undefined"){
        if(transitions[i][0] > 0){
          let value = parseFloat(initialValue) + parseFloat(transitions[i][1]);
          let unit = _this.transitions[attr][6];
          transitions[i][0] -= 1;
          _this.setAttributeNS(null, attr, value+unit);
          _this.transitions[attr][7] = setTimeout(function(){$Transitioner(_this, attr);}, 16.67);
          break;
        }else{
          delete transitions[i];
        }
      }
    }
  }
}

// set attributes to target element
function $SetAttributesNS(nameSpace, target, object){
  for (let i in arguments[2]){
    target.setAttributeNS(nameSpace,i, arguments[2][i]);
  }
}

//SVG elements constructor.
function SVG(){
  if(typeof this === "undefined" || this.constructor.name === "Window"){
    //make HTML element compatible with SVG
    let wrapper = document.createElementNS(SVGns, "foreignObject");
    arguments[0].setAttributeNS("http://www.mozilla.org/ns/specialspace", "null:xmlns", HTMLns)
    wrapper.appendChild(arguments[0]);
    return wrapper;
  }else{
    if (arguments.length < 1){
      return $SetAttributesNS(null, document.createElementNS(SVGns, "svg"), {preserveAspectRatio: true});
    }else if (arguments.length === 1){
      return document.createElementNS(SVGns, arguments[0]);
    }else if (arguments.length === 2 && typeof arguments[1] === "object"){
      let element = document.createElementNS(SVGns, arguments[0]);
      $SetAttributesNS(null, element, arguments[1]);
      return element;
    }
  }
}
