function init(hero) {
    hero.setName("Jean Grey");
    hero.setTier(3);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Torso");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");
    
    hero.addPowers("tgheroes:xmen_jean", "tgheroes:phoenix");
	hero.addAttribute("PUNCH_DAMAGE", 4.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 3.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.05, 1);


    //JEAN
    hero.addKeyBind("AIM", "Mind Snare", 4);
    hero.addKeyBind("SHIELD", "Psychic Barrier", 5);
	hero.addKeyBind("CHARGED_BEAM", "Psi Burst", 1);
    hero.addKeyBindFunc("JEAN_AOE", (player, manager) => {
        if (!player.getData("tgheroes:dyn/jean") && player.getData("tgheroes:dyn/jean_timer") == 0) {
            manager.setData(player, "tgheroes:dyn/jean", true);
			
        }
        return true;
    }, "Mental Storm", 3);

    
	hero.addKeyBindFunc("func_CHOOSE", spellChoose, "Choose Phoenix", 2);

    //PHOENIX
	hero.addKeyBind("ENERGY_PROJECTION", "Phoenix Flare", 1);

    //      hero.addKeyBind("AIM", "Mind Snare", 4);
    //      hero.addKeyBind("SHIELD", "Psychic Barrier", 5);

    hero.addKeyBindFunc("PHOENIX_AOE", (player, manager) => {
        if (!player.getData("tgheroes:dyn/phoenix_flame") && player.getData("tgheroes:dyn/phoenix_flame_timer") == 0) {
            manager.setData(player, "tgheroes:dyn/phoenix_flame", true);
            manager.setData(player, "tgheroes:dyn/phoenix_flame_timer_sound", 0.1);
			
        }
        return true;
    }, "Avatar of Flame", 3);

    hero.addKeyBind("PHOENIX", "Release Phoenix", 2);

    //DARK PHOENIX

    hero.addKeyBind("DARK_PHOENIX", "Release Dark Phoenix", 2);

    hero.addKeyBindFunc("TERROR_AOE", (player, manager) => {
        if (!player.getData("tgheroes:dyn/terror") && player.getData("tgheroes:dyn/terror_timer") == 0) {
            manager.setData(player, "tgheroes:dyn/terror", true);
			
        }
        return true;
    }, "Terror Field", 3);

    hero.addKeyBindFunc("OBLIVION_AOE", (player, manager) => {
        if (!player.getData("tgheroes:dyn/oblivion") && player.getData("tgheroes:dyn/oblivion_timer") == 0) {
            manager.setData(player, "tgheroes:dyn/oblivion", true);
            manager.setData(player, "tgheroes:dyn/oblivion_timer_sound", 0.1);
			
        }
        return true;
    }, "Oblivion Burn", 4);

    //WHITE PHOENIX

    hero.addKeyBind("WHITE_PHOENIX", "Release White Phoenix", 2);

    hero.addKeyBindFunc("SONG_AOE", (player, manager) => {
        if (!player.getData("tgheroes:dyn/cosmos_song") && player.getData("tgheroes:dyn/cosmos_song_timer") == 0) {
            manager.setData(player, "tgheroes:dyn/cosmos_song", true);
			
        }
        return true;
    }, "Song of the Cosmos", 3);

    hero.addKeyBindFunc("HEALING_AOE", (player, manager) => {
        if (!player.getData("tgheroes:dyn/healing") && player.getData("tgheroes:dyn/healing_timer") == 0) {
            manager.setData(player, "tgheroes:dyn/healing", true);
			
        }
        return true;
    }, "Radiant Rebirth", 4);

    hero.addKeyBindFunc("CROWN_AOE", (player, manager) => {
        if (!player.getData("tgheroes:dyn/crown") && player.getData("tgheroes:dyn/crown_timer") == 0) {
            manager.setData(player, "tgheroes:dyn/crown", true);
			
        }
        return true;
    }, "Crown of Rebirth", 5);
   
    
    hero.addDamageProfile("JEAN", {
        "types": {
            "TELEPATIC": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
            "EFFECTS": [
                {
                  "id": "minecraft:nausea",
                  "duration": 80,
                  "amplifier": 4,
                  "chance": 1
                },
				{
                  "id": "minecraft:weakness",
                  "duration": 80,
                  "amplifier": 2,
                  "chance": 1
                },
                {
                    "id": "fiskheroes:tutridium" ,
                    "duration": 40,
                    "amplifier": 2,
                    "chance": 1,
    
                }
              ]
        }
    });

    hero.addDamageProfile("TERROR", {
        "types": {
            "TELEPATIC": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
            "EFFECTS": [
                {
                  "id": "minecraft:nausea",
                  "duration": 100,
                  "amplifier": 4,
                  "chance": 1
                },
				{
                  "id": "minecraft:weakness",
                  "duration": 100,
                  "amplifier": 2,
                  "chance": 1
                },
                {
                    "id": "minecraft:slowness" ,
                    "duration": 100,
                    "amplifier": 4,
                    "chance": 1,
    
                }
              ]
        }
    });

    hero.addDamageProfile("COSMOS", {
        "types": {
            "TELEPATIC": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
            "EFFECTS": [
                {
                    "id": "minecraft:slowness" ,
                    "duration": 200,
                    "amplifier": 5,
                    "chance": 1,
    
                },
                {
                    "id": "minecraft:mining_fatigue" ,
                    "duration": 200,
                    "amplifier": 3,
                    "chance": 1,
    
                }
              ]
        }
    });

    hero.addDamageProfile("HEALING", {
        "types": {
            "TELEPATIC": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
            "EFFECTS": [
                {
                    "id": "minecraft:instant_health" ,
                    "duration": 1,
                    "amplifier": 2,
                    "chance": 1,
    
                },
                {
                    "id": "minecraft:regeneration" ,
                    "duration": 50,
                    "amplifier": 1,
                    "chance": 1,
    
                }
              ]
        }
    });

    hero.addDamageProfile("CROWN_START", {
        "types": {
            "TELEPATIC": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
            "EFFECTS": [
                {
                    "id": "fiskheroes:tutridium" ,
                    "duration": 200,
                    "amplifier": 2,
                    "chance": 1,
    
                }
              ]
        }
    });

    hero.addDamageProfile("CROWN_END", {
        "types": {
            "TELEPATIC": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
            "EFFECTS": [
                {
                    "id": "fiskheroes:tutridium" ,
                    "duration": 200,
                    "amplifier": 2,
                    "chance": 1,
    
                }
              ]
        }
    });

    hero.addDamageProfile("PHOENIX_FLAME", {
        "types": {
            "TELEPATIC": 1.0,
            "FIRE": 1.0
        },
        "properties": {
            "COOK_ENTITY": true,
            "IGNITE": 5,
            "HEAT_TRANSFER": 30
        }
    });

    hero.addDamageProfile("DARK_AOE", {
        "types": {
            "TELEPATIC": 1.0,
            "FIRE": 1.0
        },
        "properties": {
            "COOK_ENTITY": true,
            "IGNITE": 10,
            "HEAT_TRANSFER": 50
        }
    });

    hero.setDamageProfile(getProfile);
	hero.supplyFunction("canAim", canAim);
	hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("PHOENIXS", phoenixsProfile);
	hero.setAttributeProfile(getProfile);
    hero.setTierOverride(getTierOverride);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setTickHandler((entity, manager) => {
    
	var choose = entity.getData("tgheroes:dyn/phoenix_choose");
	    
    manager.incrementData(entity, "tgheroes:dyn/phoenix_basic", 1, 1, entity.getData("tgheroes:dyn/phoenix_choose") == 1);
    manager.incrementData(entity, "tgheroes:dyn/phoenix_dark", 1, 1, entity.getData("tgheroes:dyn/phoenix_choose") == 2);
	manager.incrementData(entity, "tgheroes:dyn/phoenix_white", 1, 1, entity.getData("tgheroes:dyn/phoenix_choose") == 3);
	
    
    if (choose != 1 && choose != 2 && choose != 3) {
        manager.setData(entity, "tgheroes:dyn/phoenix_choose", 1);
        
    }
		
		manager.incrementData(entity, "tgheroes:dyn/jean_timer", 165, 700, entity.getData("tgheroes:dyn/jean"));
		
        if (entity.getData("tgheroes:dyn/jean_timer") > 0.8 && entity.getData("tgheroes:dyn/jean")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 6.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "JEAN", "%s killed by Jean Grey's Mental Storm", 20.0, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/jean_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/jean", false);
            }
        }


        if (entity.getData("tgheroes:dyn/phoenix_flame_timer") > 0.2) {
            manager.setData(entity, "tgheroes:dyn/phoenix_flame_timer_sound", 0);
            }
            
            if (entity.getData("tgheroes:dyn/phoenix_flame_timer_sound") > 0.1 && !entity.getData("tgheroes:dyn/phoenix_flame_timer_sound") == 0 )  {
                entity.playSound("tgheroes:nova_blast_torch", 1, 1.15 - Math.random() * 0.3);
            }

		manager.incrementData(entity, "tgheroes:dyn/phoenix_flame_timer", 50, 1000, entity.getData("tgheroes:dyn/phoenix_flame"));


       
        if (entity.getData("tgheroes:dyn/phoenix_flame_timer") > 0.8 && entity.getData("tgheroes:dyn/phoenix_flame")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 7.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "PHOENIX_FLAME", "%s burned by the Phoenix flame", 25.0, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/phoenix_flame_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/phoenix_flame", false);
            }
        }

        manager.incrementData(entity, "tgheroes:dyn/terror_timer", 260, 700, entity.getData("tgheroes:dyn/terror"));


       
        if (entity.getData("tgheroes:dyn/terror_timer") > 0.1 && entity.getData("tgheroes:dyn/terror")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 7.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "TERROR", "%s burned by the Phoenix flame", 0.1, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/terror_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/terror", false);
            }
        }

        manager.incrementData(entity, "tgheroes:dyn/oblivion_timer", 50, 1200, entity.getData("tgheroes:dyn/oblivion"));


        if (entity.getData("tgheroes:dyn/oblivion_timer") > 0.2) {
            manager.setData(entity, "tgheroes:dyn/oblivion_timer_sound", 0);
            }
            
            if (entity.getData("tgheroes:dyn/oblivion_timer_sound") > 0.1 && !entity.getData("tgheroes:dyn/oblivion_timer_sound") == 0 )  {
                entity.playSound("tgheroes:nova_blast_torch", 1, 1.15 - Math.random() * 0.3);
            }
            
        if (entity.getData("tgheroes:dyn/oblivion_timer") > 0.8 && entity.getData("tgheroes:dyn/oblivion")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 15.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "DARK_AOE", "%s burned by the Phoenix Oblivion Flame", 30.0, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/oblivion_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/oblivion", false);
            }
        }

        manager.incrementData(entity, "tgheroes:dyn/cosmos_song_timer", 100, 1200, entity.getData("tgheroes:dyn/cosmos_song"));


       
        if (entity.getData("tgheroes:dyn/cosmos_song_timer") > 0.8 && entity.getData("tgheroes:dyn/cosmos_song")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 7.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "COSMOS", "%s burned by the Phoenix flame", 0.1, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/cosmos_song_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/cosmos_song", false);
            }
        }

        manager.incrementData(entity, "tgheroes:dyn/healing_timer", 60, 1200, entity.getData("tgheroes:dyn/healing"));


       
        if (entity.getData("tgheroes:dyn/healing_timer") > 0.8 && entity.getData("tgheroes:dyn/healing")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 7.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "HEALING", "%s burned by the Phoenix flame", 0.1, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/healing_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/healing", false);
            }
        }

        manager.incrementData(entity, "tgheroes:dyn/crown_timer", 160, 2000, entity.getData("tgheroes:dyn/crown"));


       
        if (entity.getData("tgheroes:dyn/crown_timer") > 0 && entity.getData("tgheroes:dyn/crown")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 20.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "CROWN_START", "%s died from watching the crowning of the White Phoenix", 5.0, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/crown_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/crown", false);
            }
        }



       
        if (entity.getData("tgheroes:dyn/crown_timer") > 0.7 && entity.getData("tgheroes:dyn/crown")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 20.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "CROWN_END", "%s died from watching the crowning of the White Phoenix", 0.1, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/crown_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/crown", false);
            }
        }
   
    });

    

	
}

function spellChoose(entity, manager) {
    var choose = entity.getData("tgheroes:dyn/phoenix_choose");
    
    if (choose >= 1 && choose < 3) {
        manager.setData(entity, "tgheroes:dyn/phoenix_choose", choose + 1);
    }
    if (choose == 3) {
        manager.setData(entity, "tgheroes:dyn/phoenix_choose", 1);
    }
        return true;
    }

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}

function getTierOverride(entity) {
    return (entity.getData("tgheroes:dyn/dark_phoenix") || entity.getData("tgheroes:dyn/phoenix") || entity.getData("tgheroes:dyn/white_phoenix")) ? 10 : 3;
}

function isModifierEnabled(entity, modifier) {
	if (modifier.id() == "jean") {
        return !entity.getData("tgheroes:dyn/dark_phoenix") || entity.getData("tgheroes:dyn/phoenix") || entity.getData("tgheroes:dyn/white_phoenix");
	}
	if (modifier.id() == "pheonix") {
        return entity.getData("tgheroes:dyn/dark_phoenix") || entity.getData("tgheroes:dyn/phoenix") || entity.getData("tgheroes:dyn/white_phoenix");
	}
	
	if (modifier.name() == "fiskheroes:controlled_flight") {
        return entity.getData("tgheroes:dyn/dark_phoenix") || entity.getData("tgheroes:dyn/phoenix") || entity.getData("tgheroes:dyn/white_phoenix");
	}
	if (modifier.name() == "fiskheroes:water_breathing") {
        return entity.getData("tgheroes:dyn/dark_phoenix") || entity.getData("tgheroes:dyn/phoenix") || entity.getData("tgheroes:dyn/white_phoenix");
	}
	if (modifier.name() == "fiskheroes:regeneration") {
        return entity.getData("tgheroes:dyn/dark_phoenix") || entity.getData("tgheroes:dyn/phoenix") || entity.getData("tgheroes:dyn/white_phoenix");
	}
	return true;
   
}

function phoenixsProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
    profile.addAttribute("SPRINT_SPEED", 0.2, 1);
    profile.addAttribute("IMPACT_DAMAGE", 0.5, 1);
}

function getProfile(entity) {
	if (!entity.isAlive() ) {
        return "JEAN";
    }
    if (entity.getData("tgheroes:dyn/dark_phoenix") || entity.getData("tgheroes:dyn/phoenix") || entity.getData("tgheroes:dyn/white_phoenix")) {
        return "PHOENIXS";
    }
	return false;
}

function isKeyBindEnabled(entity, keyBind) {
	var choose = entity.getData("tgheroes:dyn/phoenix_choose");
    
    
    switch (keyBind) {
		case "func_CHOOSE":
            return entity.isSneaking() && !entity.getData("tgheroes:dyn/phoenix") && !entity.getData("tgheroes:dyn/dark_phoenix") 
            && !entity.getData("tgheroes:dyn/white_phoenix") && !entity.getData("tgheroes:dyn/jean");     
        case "PHOENIX":
            return !entity.isSneaking() && choose == 1 && !entity.getData("tgheroes:dyn/jean") && !entity.getData("tgheroes:dyn/phoenix_flame");
        
        case "WHITE_PHOENIX":
            return !entity.isSneaking() && choose == 2 && !entity.getData("tgheroes:dyn/jean") && !entity.getData("tgheroes:dyn/cosmos_song")
             && !entity.getData("tgheroes:dyn/healing") && !entity.getData("tgheroes:dyn/crown") ;

        case "DARK_PHOENIX":
            return !entity.isSneaking() && choose == 3 && !entity.getData("tgheroes:dyn/jean") && !entity.getData("tgheroes:dyn/oblivion") && !entity.getData("tgheroes:dyn/terror");
		
        case "CHARGED_BEAM":
            return !entity.getData("tgheroes:dyn/white_phoenix") && !entity.getData("fiskheroes:shield") && !entity.getData("tgheroes:dyn/phoenix")
             && !entity.getData("tgheroes:dyn/dark_phoenix") && !entity.getData("tgheroes:dyn/jean");
		case "JEAN_AOE":
            return !entity.getData("tgheroes:dyn/white_phoenix") && !entity.getData("tgheroes:dyn/phoenix") && !entity.getData("tgheroes:dyn/dark_phoenix") && !entity.getData("tgheroes:dyn/jean");


        case "AIM":
            return !entity.getData("tgheroes:dyn/white_phoenix") && !entity.getData("tgheroes:dyn/dark_phoenix") 
            && !entity.getData("tgheroes:dyn/jean") && !entity.getData("tgheroes:dyn/phoenix_flame") && !entity.getData("fiskheroes:energy_projection");   
        case "SHIELD":
            return !entity.getData("tgheroes:dyn/white_phoenix") && !entity.getData("tgheroes:dyn/dark_phoenix") && !entity.getData("tgheroes:dyn/jean") && !entity.getData("tgheroes:dyn/phoenix_flame");  
      
        case "PHOENIX_AOE":
            return  entity.getData("tgheroes:dyn/phoenix") && !entity.getData("tgheroes:dyn/phoenix_flame");  


        case "TERROR_AOE":
            return entity.getData("tgheroes:dyn/dark_phoenix") && !entity.getData("tgheroes:dyn/oblivion") && !entity.getData("tgheroes:dyn/terror"); 
        case "OBLIVION_AOE":
            return entity.getData("tgheroes:dyn/dark_phoenix") && !entity.getData("tgheroes:dyn/oblivion") && !entity.getData("tgheroes:dyn/terror");   


        case "SONG_AOE":
            return entity.getData("tgheroes:dyn/white_phoenix") && !entity.getData("tgheroes:dyn/cosmos_song") && !entity.getData("tgheroes:dyn/healing") && !entity.getData("tgheroes:dyn/crown"); 
        case "HEALING_AOE":
            return entity.getData("tgheroes:dyn/white_phoenix") && !entity.getData("tgheroes:dyn/cosmos_song") && !entity.getData("tgheroes:dyn/healing") && !entity.getData("tgheroes:dyn/crown");
        case "CROWN_AOE":
            return entity.getData("tgheroes:dyn/white_phoenix") 
            && !entity.getData("tgheroes:dyn/cosmos_song") && !entity.getData("tgheroes:dyn/healing") && !entity.getData("tgheroes:dyn/crown")
            && entity.getData("fiskheroes:flying");     
        
        
        case "ENERGY_PROJECTION":
            return entity.getData("tgheroes:dyn/phoenix") && !entity.getData("tgheroes:dyn/phoenix_flame") && !entity.getData("fiskheroes:aiming_timer")
            || entity.getData("tgheroes:dyn/dark_phoenix") && !entity.getData("tgheroes:dyn/oblivion") && !entity.getData("tgheroes:dyn/terror") && !entity.getData("fiskheroes:aiming_timer")
            || entity.getData("tgheroes:dyn/white_phoenix")  && !entity.getData("tgheroes:dyn/cosmos_song") && !entity.getData("tgheroes:dyn/healing") && !entity.getData("tgheroes:dyn/crown") && !entity.getData("fiskheroes:aiming_timer");   
		
	default:
		return true;
	}
}