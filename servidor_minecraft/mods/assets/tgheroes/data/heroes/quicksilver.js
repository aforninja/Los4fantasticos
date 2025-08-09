var speedster_base = implement("fiskheroes:external/speedster_base");

function init(hero) {
    hero.setName("Quicksilver/Pietro Maximoff");
    hero.setTier(4);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Chestpiece");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");

    
    hero.addPowers("tgheroes:quicksilver_speed");
    hero.addAttribute("PUNCH_DAMAGE", 3.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 1.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 4.0, 0);
    hero.addAttribute("BASE_SPEED_LEVELS", 5.0, 0);
    
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 1);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotion", 2);
	hero.addKeyBind("INTANGIBILITY", "Intangibility", 4);
	hero.addKeyBind("WALL", "Toggle Wall Run", 5);

    hero.addKeyBindFunc("TORNADO", (player, manager) => {
        if (!player.getData("tgheroes:dyn/speedtornado") && player.getData("tgheroes:dyn/speedtornado_timer") == 0) {
            manager.setData(player, "tgheroes:dyn/speedtornado", true);
            manager.setData(player, "tgheroes:dyn/speedtornado_timer_sound", 0.1);
			
        }
        return true;
    }, "Create Speed Tornado", 3);

	hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setDamageProfile(getDamageProfile);
    hero.addDamageProfile("SPEED_PUNCH", {
        "types": {
            "BLUNT": 1.0
        },
        "properties": {
            "HIT_COOLDOWN": 5
        }
    });

    hero.addDamageProfile("TORNADO_FIFNISH", {
        "types": {
            "BLUNT": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
            "ADD_KNOCKBACK": 10
        }
    });
	
	hero.addDamageProfile("TORNADO_HIT", {
        "types": {
            "BLUNT": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
			"REDUCE_KNOCKBACK": 12
        }
    });
	
	hero.addDamageProfile("TORNADO_START", {
        "types": {
            "BLUNT": 1.0
        },
        "properties": {
            "COOK_ENTITY": false,
			"REDUCE_KNOCKBACK": 12
        }
    });

    hero.setTickHandler((entity, manager) => {
	manager.incrementData(entity, "tgheroes:dyn/phase_cooldown", 10, 15, entity.getData("fiskheroes:intangible"));	
		
        speedster_base.tick(entity, manager);
		
		if (entity.world().getBlock(entity.pos().add(0, 0, 1)) == 'minecraft:air' 
  || entity.world().getBlock(entity.pos().add(0, 0, -1)) == 'minecraft:air'
  || entity.world().getBlock(entity.pos().add(1, 0, 0)) == 'minecraft:air'
  || entity.world().getBlock(entity.pos().add(-1, 0, 0)) == 'minecraft:air') {
      manager.setData(entity, "fiskheroes:flying", false);
    }
		if (!entity.getData("fiskheroes:speeding")) {
            manager.setData(entity, "tgheroes:dyn/wall_climb", false);
        }

        //SOUND_START	    
        
		
		if (entity.getData("tgheroes:dyn/speedtornado_timer") > 0.2) {
            manager.setData(entity, "tgheroes:dyn/speedtornado_timer_sound", 0);
            }
            
            if (entity.getData("tgheroes:dyn/speedtornado_timer_sound") > 0.1 && !entity.getData("tgheroes:dyn/speedtornado_timer_sound") == 0 )  {
                entity.playSound("tgheroes:tornado", 1, 1.15 - Math.random() * 0.3);
            }
            
        //SOUND_FINISH	
            
            
            manager.incrementData(entity, "tgheroes:dyn/speedtornado_timer", 110, 1000, entity.getData("tgheroes:dyn/speedtornado"));
            
            if (entity.getData("tgheroes:dyn/speedtornado_timer") > 0.2 && entity.getData("tgheroes:dyn/speedtornado_timer") < 0.5 && entity.getData("tgheroes:dyn/speedtornado")) {
                var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 16.0);
                list.forEach(other => {
                    if (entity.canSee(other) && !entity.equals(other)) {
                        other.hurtByAttacker(hero, "TORNADO_START", "%s Couldn't stand the power of a Speed Tornado", 0.1, entity);
    
                    }
                });
                if (entity.getData("tgheroes:dyn/speedtornado_timer") == 1) {
                    manager.setData(entity, "tgheroes:dyn/speedtornado", false);
                }
    
            }
            
            if (entity.getData("tgheroes:dyn/speedtornado_timer") > 0.6 && entity.getData("tgheroes:dyn/speedtornado_timer") < 0.8 && entity.getData("tgheroes:dyn/speedtornado")) {
                var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 16.0);
                list.forEach(other => {
                    if (entity.canSee(other) && !entity.equals(other)) {
                        other.hurtByAttacker(hero, "TORNADO_HIT", "%s Couldn't stand the power of a Speed Tornado", 3.0, entity);
    
                    }
                });
                if (entity.getData("tgheroes:dyn/speedtornado_timer") == 1) {
                    manager.setData(entity, "tgheroes:dyn/speedtornado", false);
                }
    
            }
            
            if (entity.getData("tgheroes:dyn/speedtornado_timer") > 0.9 && entity.getData("tgheroes:dyn/speedtornado")) {
                var list = entity.world().getEntitiesInRangeOf(entity.eyePos(), 16.0);
                list.forEach(other => {
                    if (entity.canSee(other) && !entity.equals(other)) {
                        other.hurtByAttacker(hero, "TORNADO_FIFNISH", "%s Couldn't stand the power of a Speed Tornado", 0.1, entity);
    
                    }
                });
                if (entity.getData("tgheroes:dyn/speedtornado_timer") == 1) {
                    manager.setData(entity, "tgheroes:dyn/speedtornado", false);
                }
    
            }
	
    });
}

function getDamageProfile(entity) {
    return entity.getData("fiskheroes:speeding") ? "SPEED_PUNCH" : null;
}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
    case "WALL":
        return entity.getData("fiskheroes:speeding");
    case "TORNADO":
        return entity.getData("fiskheroes:speeding");
    default:
        return true;
    }
}

function isModifierEnabled(entity, modifier) {
	switch (modifier.name()) {
	case "fiskheroes:intangibility":
        return entity.getData("tgheroes:dyn/phase_cooldown") != 1;
        case "fiskheroes:flight":
            return entity.getData("fiskheroes:intangible") && ( (entity.world().getBlock(entity.posX()+0.5, entity.posY(), entity.posZ()) != "minecraft:air") || (entity.world().getBlock(entity.posX()-0.5, entity.posY(), entity.posZ()) != "minecraft:air") 
            || (entity.world().getBlock(entity.posX(), entity.posY(), entity.posZ()-0.5) != "minecraft:air") || (entity.world().getBlock(entity.posX(), entity.posY(), entity.posZ()+0.5) != "minecraft:air")) && !entity.isInWater();
    
            case "fiskheroes:propelled_flight":
                return entity.getData("tgheroes:dyn/wall_climb") 
                && entity.world().getBlock(entity.pos().add(0, 0, 1)) != 'minecraft:air' 
                ||entity.getData("tgheroes:dyn/wall_climb") && entity.getData("fiskheroes:speeding")
                && entity.world().getBlock(entity.pos().add(0, 0, -1)) != 'minecraft:air'
                || entity.getData("tgheroes:dyn/wall_climb") && entity.getData("fiskheroes:speeding")
                && entity.world().getBlock(entity.pos().add(1, 0, 0)) != 'minecraft:air'
                || entity.getData("tgheroes:dyn/wall_climb") && entity.getData("fiskheroes:speeding")
                && entity.world().getBlock(entity.pos().add(-1, 0, 0)) != 'minecraft:air';
	
    }

    return true;
}