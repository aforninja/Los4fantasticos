function init(hero) {
    hero.setName("Wolverine/James Howlett 'Logan'");
    hero.setTier(4);

    hero.setHelmet("Mask");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");

    hero.addPowers("tgheroes:weapon_x");
    hero.addAttribute("PUNCH_DAMAGE", 6.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 5.0, 0);
	hero.addAttribute("SPRINT_SPEED", 0.1, 1);
	hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
	
    hero.addKeyBind("BLADE", "Claws", 1);
	hero.addKeyBind("SLOW_MOTION", "Heightened Perception", 2);
	hero.addKeyBind("WALL", "Toggle Wall Climb", 5);
	hero.addKeyBindFunc("func_BERSERK", berserk, "Berserk Mode", 4);
	hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("BLADE", bladeProfile);
    hero.addAttributeProfile("BERSERK", berserkProfile);
    hero.addAttributeProfile("BERSERK_CLAWS", berserkclawsProfile);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("BLADE", {
        "types": {
            "ADAMANTIUM": 1.0,
            "SHARP": 2.0      
        }
    });
	hero.setModifierEnabled(isModifierEnabled);
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
		
		if (entity.isSprinting() && !entity.isOnGround() && entity.getData("fiskheroes:blade_timer") > 0) {
            var list2 = entity.world().getEntitiesInRangeOf(entity.eyePos(), 3.0);
            list2.forEach(other => {
                if (entity.canSee(other) && !entity.equals(other)) {
                    other.hurtByAttacker(hero, "BLADE", "%s slashed by Wolverine claws", 10.0, entity);


                }
            });
        }
        
        manager.incrementData(entity, "tgheroes:dyn/suitWasOn", 40, 40, entity.getData("tgheroes:dyn/suitWasOnCounter") != 1);
        
        if (entity.getData("tgheroes:dyn/suitWasOn") == 1) {
            manager.setData(entity, "tgheroes:dyn/suitWasOnCounter", 1);
        }  
        
        
        if (entity.getData("fiskheroes:time_since_damaged") < 4 && entity.getData("tgheroes:dyn/berserk_cooldown") < 1 && !entity.getData("tgheroes:dyn/berserk") && entity.getData("tgheroes:dyn/suitWasOnCounter") == 1) {
            // change to change the charging time of the "berserk" mod
            manager.setData(entity, "tgheroes:dyn/berserk_cooldown", entity.getData("tgheroes:dyn/berserk_cooldown") + 0.02);
        }  

        if (entity.getData("tgheroes:dyn/berserk") && entity.getData("tgheroes:dyn/berserk_cooldown") >= 1) {
            manager.setData(entity, "tgheroes:dyn/berserk_cooldown", 0);
        }

        // change to change the duration of the berserk mod 
        manager.incrementData(entity, "tgheroes:dyn/berserk_timer", 500, 50, entity.getData("tgheroes:dyn/berserk"));

        if (entity.getData("tgheroes:dyn/berserk") && entity.getData("tgheroes:dyn/berserk_timer") == 1) {
            manager.setData(entity, "tgheroes:dyn/berserk_timer", 0);
            manager.setData(entity, "tgheroes:dyn/berserk", false);
        }
        
        return true
    });
	
}

function berserk(entity, manager) {
    var timer = entity.getData("tgheroes:dyn/berserk")
    manager.setData(entity, "tgheroes:dyn/berserk", !timer);
    return true;
}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
    case "WALL":
        return entity.getData("fiskheroes:blade");
    case "func_BERSERK":
        return entity.getData("tgheroes:dyn/berserk_cooldown") >= 1;
    default:
        return true;
    }
}

function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 12.0, 0);
}

function berserkProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 10.5, 0);
	profile.addAttribute("SPRINT_SPEED", 0.4, 1);
	profile.addAttribute("JUMP_HEIGHT", 3.0, 0);
	profile.addAttribute("MAX_HEALTH", 5.0, 0);
}

function berserkclawsProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 18.0, 0);
	profile.addAttribute("SPRINT_SPEED", 0.4, 1);
	profile.addAttribute("JUMP_HEIGHT", 3.0, 0);
	profile.addAttribute("JUMP_HEIGHT", 3.0, 0);
	profile.addAttribute("MAX_HEALTH", 5.0, 0);

}


function getProfile(entity) {
	if (!entity.getData("tgheroes:dyn/berserk") && entity.getData("fiskheroes:blade")) {
        return "BLADE";
    }
    if (entity.getData("tgheroes:dyn/berserk") && !entity.getData("fiskheroes:blade")) {
        return "BERSERK";
    }
    if (entity.getData("tgheroes:dyn/berserk") && entity.getData("fiskheroes:blade")) {
        return "BERSERK_CLAWS";
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
	default:
        return true;
    }
}
