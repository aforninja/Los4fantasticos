var landing = implement("tgheroes:external/giant_landing");

function init(hero) {
    hero.setName("X-23/Laura Kinney");
    hero.setTier(3);

    hero.setHelmet("Hair");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");

    hero.addPowers("tgheroes:weapon_x23");
    hero.addAttribute("PUNCH_DAMAGE", 4.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 7.0, 0);
	hero.addAttribute("SPRINT_SPEED", 0.15, 1);
	hero.addAttribute("JUMP_HEIGHT", 2.5, 0);
	
    hero.addKeyBind("BLADE", "Claws", 1);
	hero.addKeyBind("SLOW_MOTION", "Heightened Perception", 2);
	hero.addKeyBind("WALL", "Toggle Wall Climb", 5);
	hero.addKeyBindFunc("func_KILLER", killer, "Killer Mode", 4);

    hero.addAttributeProfile("BLADE", bladeProfile);
    hero.addAttributeProfile("KILLER", killerProfile);
    hero.addAttributeProfile("KILLER_CLAWS", killerclawsProfile);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("BLADE", {
        "types": {
			"ADAMANTIUM": 1.0,
            "SHARP": 2.0
        }
    });
	hero.setModifierEnabled(isModifierEnabled);
	hero.setKeyBindEnabled(isKeyBindEnabled);
	hero.setTickHandler((entity, manager) => {
        

        manager.incrementData(entity, "tgheroes:dyn/claws_timer", 20, entity.getData("fiskheroes:blade"));
        if (!entity.isSneaking() && !entity.isOnGround()) {
            manager.setData(entity, "fiskheroes:flying", true);
        }
		if (!entity.getData("fiskheroes:blade")) {
            manager.setData(entity, "tgheroes:dyn/wall_climb", false);
        }
		
		if  (entity.getData("fiskheroes:blade_timer") > 0 && entity.isSprinting() && entity.motionY() > 0.5 && !entity.isOnGround() && entity.getData("tgheroes:dyn/jump_timer") == 0) {
            manager.setDataWithNotify(entity, "tgheroes:dyn/jump", true);
        }
        else if (entity.isOnGround() || entity.isInWater() || entity.getData("fiskheroes:blade_timer") == 0 || entity.getData("tgheroes:dyn/jump_land")) {
            manager.setDataWithNotify(entity, "tgheroes:dyn/jump", false);
        }
		
		if  (entity.getData("fiskheroes:blade_timer") > 0 && entity.motionX() == 12 && entity.getData("tgheroes:dyn/jump_timer") > 0.7) {
            manager.setDataWithNotify(entity, "tgheroes:dyn/jump_land", true);
        }
		else if  (entity.isOnGround() || entity.isInWater() || entity.getData("fiskheroes:blade_timer") == 0 && entity.getData("tgheroes:dyn/jump_timer") < 0.7) {
            manager.setDataWithNotify(entity, "tgheroes:dyn/jump_land", false);
        }

        manager.incrementData(entity, "tgheroes:dyn/jump_timer", 10, entity.getData("tgheroes:dyn/jump"));
		
        manager.incrementData(entity, "tgheroes:dyn/jump_land_timer", 20, entity.getData("tgheroes:dyn/jump_land"));
		
		if (entity.isSprinting() && !entity.isOnGround() && entity.getData("fiskheroes:blade_timer") > 0 ) {
            var list2 = entity.world().getEntitiesInRangeOf(entity.eyePos(), 3.0);
            list2.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "BLADE", "%s slashed by X-23 claws", 10.0, entity);


                }
            });
        }
        

        if (entity.getData("fiskheroes:time_since_damaged") < 4 && entity.getData("tgheroes:dyn/killer_cooldown") < 1 && !entity.getData("tgheroes:dyn/killer") ) {
            manager.setData(entity, "tgheroes:dyn/killer_cooldown", entity.getData("tgheroes:dyn/killer_cooldown") + 0.02);
        }  

        if (entity.getData("tgheroes:dyn/killer") && entity.getData("tgheroes:dyn/killer_cooldown") >= 1) {
            manager.setData(entity, "tgheroes:dyn/killer_cooldown", 0);
        }

        manager.incrementData(entity, "tgheroes:dyn/killer_timer", 300, 50, entity.getData("tgheroes:dyn/killer"));

        if (entity.getData("tgheroes:dyn/killer") && entity.getData("tgheroes:dyn/killer_timer") == 1) {
            manager.setData(entity, "tgheroes:dyn/killer_timer", 0);
            manager.setData(entity, "tgheroes:dyn/killer", false);
        }
        
        return true
    });
	
}

function killer(entity, manager) {
    var timer = entity.getData("tgheroes:dyn/killer")
    manager.setData(entity, "tgheroes:dyn/killer", !timer);
    entity.addChatMessage(entity.getData("tgheroes:dyn/killer_cooldown"))
    return true;
}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
    case "WALL":
        return entity.getData("fiskheroes:blade");
    case "func_KILLER":
        return entity.getData("tgheroes:dyn/killer_cooldown") >= 1;
    default:
        return true;
    }
}

function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 12.0, 0);
}

function killerProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 10.5, 0);
	profile.addAttribute("SPRINT_SPEED", 0.4, 1);
	profile.addAttribute("JUMP_HEIGHT", 3.0, 0);
	profile.addAttribute("MAX_HEALTH", 5.0, 0);
}

function killerclawsProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 18.0, 0);
	profile.addAttribute("SPRINT_SPEED", 0.4, 1);
	profile.addAttribute("JUMP_HEIGHT", 3.0, 0);
	profile.addAttribute("JUMP_HEIGHT", 3.0, 0);
	profile.addAttribute("MAX_HEALTH", 5.0, 0);

}

function getProfile(entity) {
	if (!entity.getData("tgheroes:dyn/killer") && entity.getData("fiskheroes:blade")) {
        return "BLADE";
    }
    if (entity.getData("tgheroes:dyn/killer") && !entity.getData("fiskheroes:blade")) {
        return "KILLER";
    }
    if (entity.getData("tgheroes:dyn/killer") && entity.getData("fiskheroes:blade")) {
        return "KILLER_CLAWS";
    }
	return false;
}

function isModifierEnabled(entity, modifier) {
	switch (modifier.name()) {
	case "fiskheroes:controlled_flight":
        return entity.getData("fiskheroes:blade") && entity.getData("tgheroes:dyn/wall_climb") 
        && entity.world().getBlock(entity.pos().add(0, 0, 1)) != 'minecraft:air' && !entity.isInWater()
        || entity.getData("fiskheroes:blade") && entity.getData("tgheroes:dyn/wall_climb") 
        && entity.world().getBlock(entity.pos().add(0, 0, -1)) != 'minecraft:air' && !entity.isInWater()
        ||  entity.getData("fiskheroes:blade") && entity.getData("tgheroes:dyn/wall_climb")
        && entity.world().getBlock(entity.pos().add(1, 0, 0)) != 'minecraft:air' && !entity.isInWater()
        || entity.getData("fiskheroes:blade") && entity.getData("tgheroes:dyn/wall_climb")
        && entity.world().getBlock(entity.pos().add(-1, 0, 0)) != 'minecraft:air' && !entity.isInWater();
	case "fiskheroes:wall_crawling":
        return entity.getData("fiskheroes:blade");
	default:
        return true;
    }
}
