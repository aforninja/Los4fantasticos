function init(hero) {
    hero.setName("Storm/Ororo Munroe");
    hero.setTier(3);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Chestpiece");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");
	
    hero.addPowers("tgheroes:atmokines");
    hero.addAttribute("PUNCH_DAMAGE", 2.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 2.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.05, 1);

    hero.addKeyBind("CHARGED_BEAM", "Lightning Strike", 1);
    hero.addKeyBind("SHADOWDOME", "Fog", 2);
	hero.addKeyBind("ENERGY_PROJECTION", "Vortex", 4);
	
	hero.addKeyBindFunc("TORNADO", (player, manager) => {
        if (!player.getData("tgheroes:dyn/tornado") && player.getData("tgheroes:dyn/tornado_timer") == 0) {
            manager.setData(player, "tgheroes:dyn/tornado", true);
            manager.setData(player, "tgheroes:dyn/tornado_timer_sound", 0.1);
			
        }
        return true;
    }, "Tornado", 5);
	
	
	hero.setDamageProfile(getProfile);
    hero.setKeyBindEnabled(isKeyBindEnabled);
	
	hero.addDamageProfile("TORNADO_FIFNISH", {
        "types": {
            "COLD": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
            "ADD_KNOCKBACK": 10
        }
    });
	
	hero.addDamageProfile("TORNADO_HIT", {
        "types": {
            "COLD": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
			"REDUCE_KNOCKBACK": 10
        }
    });
	
	hero.addDamageProfile("TORNADO_START", {
        "types": {
            "COLD": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
			"REDUCE_KNOCKBACK": 10
        }
    });
	
	
	hero.setTickHandler((entity, manager) => {
		
		var id = entity.getData("fiskheroes:lightsout_id");
			var dome = entity.world().getEntityById(id);
			var list = dome.as("SHADOWDOME").getContainedEntities();
			var caster = dome.as("SHADOWDOME").getCaster();

			for (var i = 0; i < list.size(); i++) {
				var le = list.get(i);
				if (le.getUUID() == caster.getUUID() && dome.exists()) {
					manager.setData(entity, "tgheroes:dyn/playerIsInDome", true);  
					break;
				} else {
					manager.setData(entity, "tgheroes:dyn/playerIsInDome", false);
				}
			}

			if (dome.exists() == false) {
				manager.setData(entity, "tgheroes:dyn/playerIsInDome", false);  
			}
		
		
		//SOUND_START	    
        
		
		if (entity.getData("tgheroes:dyn/tornado_timer") > 0.2) {
        manager.setData(entity, "tgheroes:dyn/tornado_timer_sound", 0);
        }
		
        if (entity.getData("tgheroes:dyn/tornado_timer_sound") > 0.1 && !entity.getData("tgheroes:dyn/tornado_timer_sound") == 0 )  {
			entity.playSound("tgheroes:tornado", 1, 1.15 - Math.random() * 0.3);
		}
		
	//SOUND_FINISH	
		
		
		manager.incrementData(entity, "tgheroes:dyn/tornado_timer", 110, 1000, entity.getData("tgheroes:dyn/tornado"));
		
        if (entity.getData("tgheroes:dyn/tornado_timer") > 0.2 && entity.getData("tgheroes:dyn/tornado_timer") < 0.5 && entity.getData("tgheroes:dyn/tornado")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 16.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "TORNADO_START", "%s Ripped to shreds by the Storm", 0.1, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/tornado_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/tornado", false);
            }

        }
		
		if (entity.getData("tgheroes:dyn/tornado_timer") > 0.6 && entity.getData("tgheroes:dyn/tornado_timer") < 0.8 && entity.getData("tgheroes:dyn/tornado")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 16.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "TORNADO_HIT", "%s Ripped to shreds by the Storm", 10.0, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/tornado_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/tornado", false);
            }

        }
		
		if (entity.getData("tgheroes:dyn/tornado_timer") > 0.9 && entity.getData("tgheroes:dyn/tornado")) {
            var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 16.0);
            list.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "TORNADO_FIFNISH", "%s Ripped to shreds by the Storm", 0.1, entity);

                }
            });
            if (entity.getData("tgheroes:dyn/tornado_timer") == 1) {
                manager.setData(entity, "tgheroes:dyn/tornado", false);
            }

        }
			
	});
}

function getProfile(entity) {
	if (entity.getData("fiskheroes:blade") ) {
        return "TORNADO_FIFNISH";
    }
	else if (entity.getData("fiskheroes:shield") ) {
        return "TORNADO_START";
    }
	else if (entity.getData("fiskheroes:shield") ) {
        return "TORNADO_HIT";
    }
	return false;
}


function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
		case "TORNADO":
            return !entity.isInWater() && entity.isWet() || entity.getData("tgheroes:dyn/playerIsInDome");
	default:
		return true;
	}
}