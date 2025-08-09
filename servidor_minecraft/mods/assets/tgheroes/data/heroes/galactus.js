function init(hero) {
    hero.setName("Galactus/Galan");
    hero.setTier(10);
    
    hero.setHelmet("Helmet");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");
    hero.addPowers("tgheroes:cosmic_entity");
    
    hero.addAttribute("PUNCH_DAMAGE", 11.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);

    hero.addKeyBind("CHARGED_BEAM", "Cosmic Beam", 1);   
    hero.addKeyBind("TELEPORT", "Teleport", 2);
    hero.addKeyBindFunc("func_GIANT_MODE", giantModeKey, "key.giantMode", 4);
    hero.addKeyBind("FORCEFIELD", "Forcefield", 5);

    hero.addKeyBindFunc("BLACK_HOLE", (player, manager) => {
        if (!player.getData("tgheroes:dyn/black_hole") && player.getData("tgheroes:dyn/black_hole_timer") == 0) {
            manager.setData(player, "tgheroes:dyn/black_hole", true);
			
        }
        return true;
    }, "Summon Black Hole", 3)

    
    hero.setDefaultScale(1.1);
    hero.setHasProperty(hasProperty);

    hero.setModifierEnabled(isModifierEnabled);
	hero.addSoundEvent("STEP", "fiskheroes:anti_walk");
	hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("TRUE_FORM", trueProfile);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);


    hero.addDamageProfile("HOLE", {
        "types": {
            "ETERNIUM": 1.0,
            "COSMIC": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
			"REDUCE_KNOCKBACK": 10
        }
    });


    hero.setTickHandler((entity, manager) => {
	  
          
          
          if (entity.getData("tgheroes:dyn/field")) {
              manager.setData(entity, "fiskheroes:shield", true);
              manager.setData(entity, "fiskheroes:shield_blocking", true);
          }
          if (!entity.getData("tgheroes:dyn/field") ) {
              manager.setData(entity, "fiskheroes:shield", false);
              manager.setData(entity, "fiskheroes:shield_blocking", false);
          }

          if (entity.getData("fiskheroes:scale") > 1.2) {
            manager.setData(entity, "tgheroes:dyn/field", false);
        }

          manager.incrementData(entity, "tgheroes:dyn/black_hole_timer", 90, 6000, entity.getData("tgheroes:dyn/black_hole"));
		
        if (entity.getData("tgheroes:dyn/black_hole_timer") > 0.2 && entity.getData("tgheroes:dyn/black_hole")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 60.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "HOLE", "%s was sucked into a black hole caused by Galactus", 100.0, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/black_hole_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/black_hole", false);
            }

        }
     
     });
}


function trueProfile(profile) {
    profile.inheritDefaults();
	profile.addAttribute("MAX_HEALTH", 10.5, 0);
}

function getProfile(entity) {
	if (!entity.isAlive() ) {
        return "HOLE";
    }
    if (entity.getData("fiskheroes:scale") > 2.0) {
        return "TRUE_FORM";
    }
	return false;
}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
    case "BLACK_HOLE":
        return entity.getData("fiskheroes:scale") > 17.0 && !entity.getData("tgheroes:dyn/black_hole");
    case "FORCEFIELD":
        return entity.getData("fiskheroes:scale") <= 1.21 && !entity.getData("tgheroes:dyn/black_hole");		
	case "TELEPORT":
        return entity.getData("fiskheroes:scale") <= 1.21 && !entity.getData("tgheroes:dyn/black_hole");
	case "func_GIANT_MODE":
        return  !entity.getData("tgheroes:dyn/black_hole");
    case "CHARGED_BEAM":
        return !entity.getData("tgheroes:dyn/black_hole");
    default:
        return true;
    }
}

function giantModeKey(player, manager) {
    var flag = player.getData("fiskheroes:dyn/giant_mode");
    manager.setData(player, "fiskheroes:dyn/giant_mode", !flag);
    manager.setData(player, "fiskheroes:size_state", flag ? -1 : 1);
    return true;
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

function isModifierEnabled(entity, modifier) {
	if (modifier.id() == "smol") {
        return  entity.getData("fiskheroes:scale") <= 1.21 ;
	}
	if (modifier.id() == "big") {
        return entity.getData("fiskheroes:scale") > 17.0 ;
	}

    

	return true;
   
}

