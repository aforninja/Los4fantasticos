var landing = implement("tgheroes:external/giant_landing");
function init(hero) {
    hero.setName("The Thing/Ben Grimm");
    hero.setTier(7);
    
    hero.setLeggings("Pants");
    
    hero.addPowers("tgheroes:thing_power");
    hero.addAttribute("PUNCH_DAMAGE", 8, 0);
    hero.addAttribute("JUMP_HEIGHT", 4.0, 0);
	hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("SPRINT_SPEED", 0.05, 1);
    hero.addAttribute("STEP_HEIGHT", 0.5, 0);

	hero.addKeyBind("EARTHQUAKE", "key.earthquake", 1);
    hero.addKeyBind("GROUND_SMASH", "key.groundSmash", 2);
	hero.addKeyBindFunc("func_THROW", throwStone, "Throw stone", 3);
	hero.addKeyBind("CHARGED_BEAM", "Thunderclap", 4);
	hero.setDefaultScale(1.15); 
	
	hero.addDamageProfile("LAND", {
        "types": {
            "BLUNT": 1.0
        }
    });
	hero.addDamageProfile("STONE", {
        "types": {
            "BLUNT": 1.0
        }
    });

	hero.setTickHandler((entity, manager) => {
		
		landing.tick(entity, manager);
		
	
		
	
		if (entity.getData("fiskheroes:dyn/superhero_landing_timer") < 0.9 && entity.getData("fiskheroes:dyn/superhero_landing_ticks") > 0) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 8.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "LAND", "%s Couldn't stand the fall of the stone", 5.0, entity);

                }
            });

        }

        // stone
        if (entity.getData("tgheroes:dyn/stone")) {
            var vectorLook = entity.getLookVector();
            var x = vectorLook.x();
            var y = vectorLook.y();
            var z = vectorLook.z();
            var k = 1 + y;  
            manager.setData(entity, "tgheroes:dyn/x", k > 1 ? (2 - x) * k * 20 : x * k * 20);
            manager.setData(entity, "tgheroes:dyn/y", k);
            manager.setData(entity, "tgheroes:dyn/z", k > 1 ? (2 - z) * k * 20 : z * k * 20);
        }
        var vectorPos = entity.eyePos();
        var vectorResult = vectorPos.add(entity.getData("tgheroes:dyn/x"), entity.getData("tgheroes:dyn/y"), entity.getData("tgheroes:dyn/z"));
        
        manager.incrementData(entity, "tgheroes:dyn/stone_timer", 50, 400, entity.getData("tgheroes:dyn/stone"))
        
		if (entity.getData("tgheroes:dyn/stone_timer") > 0.9 && entity.getData("tgheroes:dyn/stone")) {
            var listStone = entity.world().getEntitiesInRangeOf(vectorResult, 8.0);
            listStone.forEach(othery => {
                if (entity.canSee(othery) && !entity.equals(othery)) {
                    othery.hurtByAttacker(hero, "STONE", "%s was crushed by a boulder thrown by The Thing", 9.0, entity);
                }

            });
            if (entity.getData("tgheroes:dyn/stone_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/stone", false);
            }
            
        }
        
    });
	
	hero.addAttributeProfile("THROW", throwProfile);
	hero.setAttributeProfile(getProfile);
	hero.setKeyBindEnabled(isKeyBindEnabled);

}




function throwStone(player, manager) {
    if (!player.getData("tgheroes:dyn/stone") && player.getData("tgheroes:dyn/stone_timer") == 0) {
        manager.setData(player, "tgheroes:dyn/stone", true);

    }
    return true;
}

function getProfile(entity) {
	if (entity.getData("tgheroes:dyn/stone") || entity.getData("fiskheroes:beam_shooting")) {
        return "THROW";
    }
	return false;
}

function throwProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", -2.0, 0);
	profile.addAttribute("JUMP_HEIGHT", -5.0, 0);
	profile.addAttribute("PUNCH_DAMAGE", -2.0, 0);
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
		case "CHARGED_BEAM":
            return entity.isOnGround();
		case "EARTHQUAKE":
            return entity.isOnGround();
		case "GROUND_SMASH":
            return entity.isOnGround();
        case "func_THROW":
            return entity.isOnGround();		
        default:
            return true;
    }
}