"use strict";

var $ = function(id) { return document.getElementById(id) }

var raceDescription = [];
raceDescription["dwarf"] = "Short, stocky, stern, and strong. They have a connection to the earth and often live in mountains or underground lands. Stat modifiers: +2 Constitution, +2 Wisdom, -2 Charisma."
raceDescription["elf"] = "Tall, long-lived, aloof, and connected to nature. Elves live in harmony with the natural world around them. Stat modifiers: +2 Dexterity, +2 Intelligence, -2 Constitution."
raceDescription["gnome"] = "Mysterious, adventure-seeking, and strange. Gnomes are the smallest common race. Stat modifiers: +2 Constitution, +2 Charisma, -2 Strength."
raceDescription["half_elf"] = "Solitary, long-lived, graceful, and hearty. Half-elves are few in number, and tend to be wanderers due to their lack of a homeland. Stat modifiers: +2 to one ability score."
raceDescription["half_orc"] = "Independent, strong, and distrusted. Half-orcs are considered monstrosities by common folk. They are tall and powerfully built. Stat modifiers: +2 to one ability score."
raceDescription["halfling"] = "Optimistic, cheerful, curious, and small in stature. On average only 3 ft (.9 m) tall, they are agile but physically weak. Stat modifiers: +2 Dexterity +2 Charisma, -2 Strength."
raceDescription["human"] = "Adaptive, ambitious, and well-balanced. Humans are the dominant race and are diverse in appearance and culture. Stat modifiers: +2 to one ability score."

var classDescription = [];
classDescription["barbarian"] = "Uncivilized and strong. Considered brutal berserkers."
classDescription["bard"] = "Charismatic and crafty. Bards use skills and spells to help and harm."
classDescription["cleric"] = "A firm believer in a deity. Clerics heal, raise the dead, and direct the wrath of a god."
classDescription["druid"] = "At one with nature. Druids cast spells, interact with animals, and change shapes."
classDescription["fighter"] = "Firm and brave. Fighters are capable with weapons and comfortable in armor."
classDescription["monk"] = "Martial masters. Monks train their minds and bodies for offens and defense."
classDescription["paladin"] = "Followers of what is good and just. Paladins are devoted knights."
classDescription["ranger"] = "Masters of woodcraft and wildlife. Rangers track and hunt foes."
classDescription["rogue"] = "Stealthy assassins. Rogues are cunning thieves and able scouts."
classDescription["sorcerer"] = "Natural born spellcasters. Sorcerers command strange, ancient energies."
classDescription["wizard"] = "Lifelong magic students. Years of study allow wizards to use awesome magic power."

//display race description
var displayRace = function() {
    
    var race = $("race").value;
   
    switch (race) {
        case "empty":
            $("race_description").innerHTML = "";
            break;
        case "dwarf":
            $("race_description").innerHTML = raceDescription["dwarf"];
            break;
        case "elf":
            $("race_description").innerHTML = raceDescription["elf"];
            break;
        case "gnome":
            $("race_description").innerHTML = raceDescription["gnome"];
            break;
        case "half_elf":
            $("race_description").innerHTML = raceDescription["half_elf"];
            break;
        case "half_orc":
            $("race_description").innerHTML = raceDescription["half_orc"];
            break;
        case "halfling":
            $("race_description").innerHTML = raceDescription["halfling"];
            break;
        case "human":
            $("race_description").innerHTML = raceDescription["human"];
            break;
    }
    displayForm();
};

//display class description
var displayClass = function() {
    var classChoice = $("class").value;
    
    switch (classChoice) {
        case "empty":
            $("class_description").innerHTML = "";
            break;
        case "barbarian":
            $("class_description").innerHTML = classDescription["barbarian"];
            break;
        case "bard":
            $("class_description").innerHTML = classDescription["bard"];
            break;
        case "cleric":
            $("class_description").innerHTML = classDescription["cleric"];
            break;
        case "druid":
            $("class_description").innerHTML = classDescription["druid"];
            break;
        case "fighter":
            $("class_description").innerHTML = classDescription["fighter"];
            break;
        case "monk":
            $("class_description").innerHTML = classDescription["monk"];
            break;
        case "paladin":
            $("class_description").innerHTML = classDescription["paladin"];
            break;
        case "ranger":
            $("class_description").innerHTML = classDescription["ranger"];
            break;
        case "rogue":
            $("class_description").innerHTML = classDescription["rogue"];
            break;
        case "sorcerer":
            $("class_description").innerHTML = classDescription["sorcerer"];
            break;
        case "wizard":
            $("class_description").innerHTML = classDescription["wizard"];
            break;
    }
};


//reset the form
var reset = function() {
    $("name").value = "";
    $("race").value = "empty";
    $("class").value = "empty";
    $("name").focus();
    $("race_description").innerHTML = "";
    $("class_description").innerHTML = "";
    $("nameError").innerHTML = "";
    $("raceError").innerHTML = "";
    $("classError").innerHTML = "";
    $("str").value = "";
    $("dex").value = "";
    $("con").value = "";
    $("int").value = "";
    $("wis").value = "";
    $("cha").value = "";
    $("strAdd").innerHTML = "";
    $("dexAdd").innerHTML = "";
    $("conAdd").innerHTML = "";
    $("intAdd").innerHTML = "";
    $("wisAdd").innerHTML = "";
    $("chaAdd").innerHTML = "";
    $("form").style.display = "none";
    $("gold").value = "";
    localStorage.clear();
    
};


//verify all fields are filled out
var check = function() {
    if ($("name").value == "") {
        $("nameError").innerHTML = " * Character must have a name"
    } else {
        $("nameError").innerHTML = "";
    }
    if ($("race").value == "empty") {
        $("raceError").innerHTML = " * You must choose a race"
    } else {
        $("raceError").innerHTML = "";
    }
    if ($("class").value == "empty") {
        $("classError").innerHTML = " * You must choose a class"
    } else {
        $("classError").innerHTML = "";
    }
    if ($("name").value != "" && $("race").value != "empty" && $("class").value != "empty") {
        var conf = confirm("Your character name is " + $("name").value  + ", your race is " + $("race").value + ", and your class is " + $("class").value + ". Would you like to continue?");
        if (conf == true) {
            $("strAdd").innerHTML = "";
            $("dexAdd").innerHTML = "";
            $("conAdd").innerHTML = "";
            $("intAdd").innerHTML = "";
            $("wisAdd").innerHTML = "";
            $("chaAdd").innerHTML = "";
            $("gold").value = "";
            rollStats();
            $("gold").value = rollGold();
            saveInfo();
        }
    }
};

//function to roll stats
var rollStats = function() {
    $("str").value = diceRoll();
    $("dex").value = diceRoll();
    $("con").value = diceRoll();
    $("int").value = diceRoll();
    $("wis").value = diceRoll();
    $("cha").value = diceRoll();
    
    if($("race").value == "dwarf") {
        $("con").value = parseInt($("con").value) + 2;
        $("conAdd").innerHTML = "+2 for dwarf";
        $("wis").value = parseInt($("wis").value) + 2;
        $("wisAdd").innerHTML = "+2 for dwarf";
        $("cha").value = parseInt($("cha").value) - 2;
        $("chaAdd").innerHTML = "-2 for dwarf";
        
    }
    if($("race").value == "elf") {
        $("dex").value = parseInt($("dex").value) + 2;
        $("dexAdd").innerHTML = "+2 for elf";
        $("int").value = parseInt($("int").value) + 2;
        $("intAdd").innerHTML = "+2 for elf";
        $("con").value = parseInt($("con").value) - 2;
        $("conAdd").innerHTML = "-2 for elf";
        
    }
    if($("race").value == "gnome") {
        $("con").value = parseInt($("con").value) + 2;
        $("conAdd").innerHTML = "+2 for gnome";
        $("cha").value = parseInt($("cha").value) + 2;
        $("chaAdd").innerHTML = "+2 for gnome";
        $("str").value = parseInt($("str").value) - 2;
        $("strAdd").innerHTML = "-2 for gnome";
        
    }
    if($("race").value == "halfling") {
        $("dex").value = parseInt($("dex").value) + 2;
        $("dexAdd").innerHTML = "+2 for halfling";
        $("cha").value = parseInt($("cha").value) + 2;
        $("chaAdd").innerHTML = "+2 for halfling";
        $("str").value = parseInt($("str").value) - 2;
        $("strAdd").innerHTML = "-2 for halfling";
        
    }
    if (($("race").value == "human" || $("race").value == "half_orc" || $("race").value == "half_elf") && $("strBoost").checked == true) {
        $("str").value = parseInt($("str").value) + 2;
        $("strAdd").innerHTML = "+2 for human or half-human";
    }
    
    if (($("race").value == "human" || $("race").value == "half_orc" || $("race").value == "half_elf") && $("dexBoost").checked == true) {
        $("dex").value = parseInt($("dex").value) + 2;
        $("dexAdd").innerHTML = "+2 for human or half-human";
    }
    
    if (($("race").value == "human" || $("race").value == "half_orc" || $("race").value == "half_elf") && $("conBoost").checked == true) {
        $("con").value = parseInt($("con").value) + 2;
        $("conAdd").innerHTML = "+2 for human or half-human";
    }
    
    if (($("race").value == "human" || $("race").value == "half_orc" || $("race").value == "half_elf") && $("intBoost").checked == true) {
        $("int").value = parseInt($("int").value) + 2;
        $("intAdd").innerHTML = "+2 for human or half-human";
    }
    
    if (($("race").value == "human" || $("race").value == "half_orc" || $("race").value == "half_elf") && $("wisBoost").checked == true) {
        $("wis").value = parseInt($("wis").value) + 2;
        $("wisAdd").innerHTML = "+2 for human or half-human";
    }
    
    if (($("race").value == "human" || $("race").value == "half_orc" || $("race").value == "half_elf") && $("chaBoost").checked == true) {
        $("cha").value = parseInt($("cha").value) + 2;
        $("chaAdd").innerHTML = "+2 for human or half-human";
    }
     
};

//function to display stat boost selection form
var displayForm = function() {
    if ($("race").value == "human" || $("race").value == "half_orc" || $("race").value == "half_elf") {
        $("form").style.display = "block";
    }
    else {
        $("form").style.display = "none";
    }
};


//function to roll dice for stats
var diceRoll = function() {
    var dice = [];
    dice.push(parseInt(Math.random()*6 + 1));
    dice.push(parseInt(Math.random()*6 + 1));
    dice.push(parseInt(Math.random()*6 + 1));
    dice.push(parseInt(Math.random()*6 + 1));
    
    dice.sort();
    dice.shift();
    
    var total = 0;
    for (var i = 0; i < dice.length; i++) {
        total += dice[i];
    }
    console.log("total = " + total);
    return total;
};


//function to roll for starting gold
var rollGold = function () {
    var gold = [];
    var selectedClass = $("class").value;
    var goldTotal = 0;
    
    switch (selectedClass) {
        case "barbarian":
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            
            for (var i = 0; i < gold.length; i++) {
                goldTotal += gold[i];
            }
            goldTotal *= 10;
            break;
        case "bard":
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            
            for (i = 0; i < gold.length; i++) {
                goldTotal += gold[i];
            }
            goldTotal *= 10;
            break;
        case "cleric":
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            
            for ( i = 0; i < gold.length; i++) {
                goldTotal += gold[i];
            }
            goldTotal *= 10;
            break;
        case "druid":
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
                        
            for ( i = 0; i < gold.length; i++) {
                goldTotal += gold[i];
            }
            goldTotal *= 10;
            break;
        case "fighter":
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            
            for ( i = 0; i < gold.length; i++) {
                goldTotal += gold[i];
            }
            goldTotal *= 10;
            break;
        case "monk":
            gold.push(parseInt(Math.random()*6 + 1));
                        
            for ( i = 0; i < gold.length; i++) {
                goldTotal += gold[i];
            }
            goldTotal *= 10;
            break;
        case "paladin":
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            
            for ( i = 0; i < gold.length; i++) {
                goldTotal += gold[i];
            }
            goldTotal *= 10;
            break;
        case "ranger":
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            
            for ( i = 0; i < gold.length; i++) {
                goldTotal += gold[i];
            }
            goldTotal *= 10;
            break;
        case "rogue":
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
            
            for ( i = 0; i < gold.length; i++) {
                goldTotal += gold[i];
            }
            goldTotal *= 10;
            break;
        case "sorcerer":
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
                        
            for ( i = 0; i < gold.length; i++) {
                goldTotal += gold[i];
            }
            goldTotal *= 10;
            break;
        case "wizard":
            gold.push(parseInt(Math.random()*6 + 1));
            gold.push(parseInt(Math.random()*6 + 1));
                        
            for ( i = 0; i < gold.length; i++) {
                goldTotal += gold[i];
            }
            goldTotal *= 10;
            break;
            
            
    }
    return goldTotal;
    
};

//save cookie
var saveInfo = function() {
    localStorage.charName = $("name").value;
    localStorage.race = $("race").value;
    localStorage.class = $("class").value;
    localStorage.str = $("str").value;
    localStorage.dex = $("dex").value;
    localStorage.con = $("con").value;
    localStorage.int = $("int").value;
    localStorage.wis = $("wis").value;
    localStorage.cha = $("cha").value;
    localStorage.gold = $("gold").value;
};

//retrieve info from cookie
var retrieveInfo = function() {
    $("name").value = localStorage.charName;
    $("race").value = localStorage.race;
    $("class").value = localStorage.class;
    $("str").value = localStorage.str;
    $("dex").value = localStorage.dex;
    $("con").value = localStorage.con;
    $("int").value = localStorage.int;
    $("wis").value = localStorage.wis;
    $("cha").value = localStorage.cha;
    $("gold").value = localStorage.gold;
    
    if (localStorage.charName == undefined) {
        $("name").value = "";
    }
    if (localStorage.race == undefined) {
        $("race").value = "empty";
    }
    if (localStorage.class == undefined) {
        $("class").value = "empty";
    }
    if (localStorage.str == undefined) {
        $("str").value = "";
    }
    if (localStorage.dex == undefined) {
        $("dex").value = "";
    }
    if (localStorage.con == undefined) {
        $("con").value = "";
    }
    if (localStorage.int == undefined) {
        $("int").value = "";
    }
    if (localStorage.wis == undefined) {
        $("wis").value = "";
    }
    if (localStorage.cha == undefined) {
        $("cha").value = "";
    }
    if (localStorage.gold == undefined) {
        $("gold").value = "";
    }
};

window.onload = function() {
    $("name").focus();
    $("reset").onclick = reset;
    $("submit").onclick = check;
    $("race").onchange = displayRace;
    $("class").onchange = displayClass;
    retrieveInfo();
};
    