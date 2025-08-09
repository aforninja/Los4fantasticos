function init(hero) {
    hero.setName("Rogue/Anna Marie");
    hero.setTier(3);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");
    
	hero.addPowers("tgheroes:rogue_angel", "tgheroes:rogue_weaponx", "tgheroes:rogue_colossus", "tgheroes:rogue_nightcrawler", "tgheroes:rogue_quicksilver", "tgheroes:rogue_all");
    hero.addAttribute("PUNCH_DAMAGE", 4.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 1.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 4.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.05, 1);
	
	hero.addKeyBind("X23", "Powers of Wolverine", 1);
	hero.addKeyBind("BLADE", "Claws", 4);
	
	hero.addKeyBind("ANGEL", "Powers of Angel", 2);
	
	hero.addKeyBind("COLOSSUS", "Powers of Colossus", 3);
	
	hero.addKeyBind("NIGHTCRAWLER", "Powers of Nightcrawler", 4);
	hero.addKeyBind("TELEPORT", "Teleport", 1);  
	
	hero.addKeyBind("QUICKSILVER", "Powers of Quicksilver", 5);
	hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 4);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotion", 2);
	
	hero.addKeyBind("ULTIMATE", "Ultimate Form", 1);
	hero.addKeyBind("TELEKINESIS", "Chain", 5);
	hero.addKeyBind("AIM", "Chain", 5);
	hero.addKeyBind("CHARGED_BEAM", "Energy Beam", 3);  
	
	hero.addAttributeProfile("COLOSSUS_PROF", colosProfile);
    hero.addAttributeProfile("X23_PROF", wolverineProfile);
	hero.addAttributeProfile("SPEED_PROF", speedProfile);
    hero.addAttributeProfile("NIGHTCRAWLER_PROF", nightProfile);
	hero.addAttributeProfile("ANGEL_PROF", angelProfile);
	hero.addAttributeProfile("ALL_PROF", allProfile);
	hero.addAttributeProfile("BAD_PROF", badProfile);
	hero.addAttributeProfile("BLADE", clawProfile);
    hero.setAttributeProfile(getAttributeProfile);
	hero.setDamageProfile(getAttributeProfile);
     hero.addDamageProfile("BLADE", {
        "types": {
            "BONE": 0.5
        }
    });
	hero.addDamageProfile("PUNCH", {
		"types": {
            "ROGUE": 1.0
        },
    "properties": {
        "EFFECTS": [{
                "id": "minecraft:wither" ,
                "duration": 100,
                "amplifier": 2,
                "chance": 1.0,

            },
			{
				"id": "fiskheroes:tutridium" ,
                "duration": 150,
                "amplifier": 2,
                "chance": 1.0,

            }
        ]
    }
	});
	
	hero.setTickHandler((entity, manager) => {
		
		manager.incrementData(entity, "tgheroes:dyn/mask_open_timer", 40, 45, entity.getData("fiskheroes:mask_open"));
    });
	hero.setTierOverride(getTierOverride);
	hero.setKeyBindEnabled(isKeyBindEnabled);
	hero.setModifierEnabled(isModifierEnabled);
	hero.setHasProperty(hasProperty);
	hero.addSoundEvent("MASK_OPEN", "fiskheroes:cowl_mask_open");
    hero.addSoundEvent("MASK_CLOSE", "fiskheroes:cowl_mask_close");
}

function getTierOverride(entity) {
	if (entity.getData("tgheroes:dyn/rogue_x")) {
        return 5;
    }
    if (entity.getData("tgheroes:dyn/rogue_speed")) {
        return 4;
    }
	if (entity.getData("tgheroes:dyn/rogue_night")) {
        return 4;
    }
	if (entity.getData("tgheroes:dyn/rogue_colos")) {
        return 7;
    }
	if (entity.getData("tgheroes:dyn/rogue_angel")) {
        return 3;
    }
	if (entity.getData("tgheroes:dyn/rogue_all")) {
        return 8;
    }
    return 3;
}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {	
		case "ULTIMATE":
            return entity.getData("tgheroes:dyn/rogue_all_cooldown") == 0 && !entity.getData("tgheroes:dyn/rogue_all") && entity.isSneaking() && !entity.getData("tgheroes:dyn/rogue_x_timer") && !entity.getData("tgheroes:dyn/rogue_angel_timer") && !entity.getData("tgheroes:dyn/rogue_speed_timer") && !entity.getData("tgheroes:dyn/rogue_night_timer") && !entity.getData("tgheroes:dyn/rogue_colos_timer");	
		case "NIGHTCRAWLER":
			return !entity.getData("tgheroes:dyn/rogue_x_timer") && !entity.getData("tgheroes:dyn/rogue_angel_timer") && !entity.getData("tgheroes:dyn/rogue_speed_timer") && !entity.getData("tgheroes:dyn/rogue_colos_timer") && !entity.isSneaking() && !entity.getData("tgheroes:dyn/rogue_all_timer") && entity.getData("tgheroes:dyn/rogue_all_cooldown") == 0;
		case "TELEPORT":
			return entity.getData("tgheroes:dyn/rogue_night") || entity.getData("tgheroes:dyn/rogue_all");	
		case "COLOSSUS":
			return !entity.getData("tgheroes:dyn/rogue_x_timer") && !entity.getData("tgheroes:dyn/rogue_angel_timer") && !entity.getData("tgheroes:dyn/rogue_speed_timer") && !entity.getData("tgheroes:dyn/rogue_night_timer") && !entity.isSneaking() && !entity.getData("tgheroes:dyn/rogue_all_timer")&& entity.getData("tgheroes:dyn/rogue_all_cooldown") == 0;
		case "ANGEL":
			return !entity.getData("tgheroes:dyn/rogue_x_timer") && !entity.getData("tgheroes:dyn/rogue_colos_timer") && !entity.getData("tgheroes:dyn/rogue_speed_timer") && !entity.getData("tgheroes:dyn/rogue_night_timer") && !entity.isSneaking() && !entity.getData("tgheroes:dyn/rogue_all_timer")&& entity.getData("tgheroes:dyn/rogue_all_cooldown") == 0;
		case "X23":
			return !entity.getData("tgheroes:dyn/rogue_angel_timer") && !entity.getData("tgheroes:dyn/rogue_colos_timer") && !entity.getData("tgheroes:dyn/rogue_speed_timer") && !entity.getData("tgheroes:dyn/rogue_night_timer") && !entity.isSneaking() && !entity.getData("tgheroes:dyn/rogue_all_timer")&& entity.getData("tgheroes:dyn/rogue_all_cooldown") == 0;
		case "BLADE":
			return entity.getData("tgheroes:dyn/rogue_x");
		case "AIM":
			return entity.getData("tgheroes:dyn/rogue_all");
		case "TELEKINESIS":
			return entity.getData("tgheroes:dyn/rogue_all");
		case "CHARGED_BEAM":
			return entity.getData("tgheroes:dyn/rogue_all");	
		case "QUICKSILVER":
			return !entity.getData("tgheroes:dyn/rogue_angel_timer") && !entity.getData("tgheroes:dyn/rogue_colos_timer") && !entity.getData("tgheroes:dyn/rogue_x_timer") && !entity.getData("tgheroes:dyn/rogue_night_timer") && !entity.isSneaking() && !entity.getData("tgheroes:dyn/rogue_all_timer")&& entity.getData("tgheroes:dyn/rogue_all_cooldown") == 0;
		case "SUPER_SPEED":
			return entity.getData("tgheroes:dyn/rogue_speed") || entity.getData("tgheroes:dyn/rogue_all");
		case "SLOW_MOTION":
			return entity.getData("tgheroes:dyn/rogue_speed") || entity.getData("tgheroes:dyn/rogue_all");	
	default:
        return false;
    }
}

function isModifierEnabled(entity, modifier) {
    if (modifier.id() == "x1") {
        return entity.getData("tgheroes:dyn/rogue_x");
	}
	if (modifier.id() == "x2") {
        return entity.getData("tgheroes:dyn/rogue_x");
	}
	if (modifier.id() == "x3") {
        return entity.getData("tgheroes:dyn/rogue_x");
	}
	if (modifier.id() == "x4") {
        return entity.getData("tgheroes:dyn/rogue_x");
	}
	
	if (modifier.id() == "all1") {
        return entity.getData("tgheroes:dyn/rogue_all");
	}
	if (modifier.id() == "all2") {
        return entity.getData("tgheroes:dyn/rogue_all");
	}
	if (modifier.id() == "all3") {
        return entity.getData("tgheroes:dyn/rogue_all");
	}
	if (modifier.id() == "all4") {
        return entity.getData("tgheroes:dyn/rogue_all");
	}
	if (modifier.id() == "all5") {
        return entity.getData("tgheroes:dyn/rogue_all");
	}
	if (modifier.id() == "all6") {
        return entity.getData("tgheroes:dyn/rogue_all");
	}
	if (modifier.id() == "all7") {
        return entity.getData("tgheroes:dyn/rogue_all");
	}
	if (modifier.id() == "all8") {
        return entity.getData("tgheroes:dyn/rogue_all");
	}
	if (modifier.id() == "all9") {
        return entity.getData("tgheroes:dyn/rogue_all");
	}
	
	if (modifier.id() == "speed1") {
        return entity.getData("tgheroes:dyn/rogue_speed");
	}
	if (modifier.id() == "speed2") {
        return entity.getData("tgheroes:dyn/rogue_speed");
	}
	if (modifier.id() == "speed3") {
        return entity.getData("tgheroes:dyn/rogue_speed");
	}
	
	if (modifier.id() == "colos_1") {
        return entity.getData("tgheroes:dyn/rogue_colos");
	}
	if (modifier.id() == "colos_2") {
        return entity.getData("tgheroes:dyn/rogue_colos");
	}
	if (modifier.id() == "colos_3") {
        return entity.getData("tgheroes:dyn/rogue_colos");
	}
	if (modifier.id() == "colos_4") {
        return entity.getData("tgheroes:dyn/rogue_colos");
	}
	
	if (modifier.name() == "fiskheroes:controlled_flight") {
        return entity.getData("tgheroes:dyn/rogue_angel") && entity.posY() < 300 || entity.getData("tgheroes:dyn/rogue_all");
	}
	if (modifier.name() == "fiskheroes:blade") {
        return entity.getData("tgheroes:dyn/rogue_x");
	}
    return true;
}

function getAttributeProfile(entity) {
    if (entity.getData("tgheroes:dyn/rogue_colos")) {
        return "COLOSSUS_PROF";
    }
    else if (entity.getData("tgheroes:dyn/rogue_speed")) {
        return "SPEED_PROF";
    }
	else if (entity.getData("tgheroes:dyn/rogue_night")) {
        return "NIGHTCRAWLER_PROF";
    }
	else if (entity.getData("tgheroes:dyn/rogue_x") && !entity.getData("fiskheroes:blade")) {
        return "X23_PROF";
    }
	else if (entity.getData("fiskheroes:blade")  && !entity.getData("tgheroes:dyn/rogue_x_timer") && !entity.getData("tgheroes:dyn/rogue_angel_timer")
		&& !entity.getData("tgheroes:dyn/rogue_speed_timer") && !entity.getData("tgheroes:dyn/rogue_night_timer") && !entity.getData("tgheroes:dyn/rogue_colos_timer")) {
        return "BLADE";
    }
	else if (entity.getData("fiskheroes:mask_open")) {
        return "PUNCH";
    }
	else if (entity.getData("tgheroes:dyn/rogue_angel")) {
        return "ANGEL_PROF";
    }
	else if (entity.getData("tgheroes:dyn/rogue_all")) {
        return "ALL_PROF";
    }
	else if (entity.getData("tgheroes:dyn/rogue_all_cooldown") > 0.1 && !entity.getData("tgheroes:dyn/rogue_all")) {
        return "BAD_PROF";
    }
    return true;
}

function colosProfile(profile) {
    profile.addAttribute("PUNCH_DAMAGE", 7.0, 0);
    profile.addAttribute("JUMP_HEIGHT", 1.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 6.0, 0);
    profile.addAttribute("STEP_HEIGHT", 0.5, 0);
    profile.addAttribute("KNOCKBACK", 1.0, 0);
}

function wolverineProfile(profile) {
    profile.addAttribute("PUNCH_DAMAGE", 4.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 5.0, 0);
	profile.addAttribute("SPRINT_SPEED", 0.2, 1);
    profile.addAttribute("STEP_HEIGHT", 1.0, 0);
	profile.addAttribute("JUMP_HEIGHT", 2.0, 0);
}

function clawProfile(profile) {
	profile.addAttribute("PUNCH_DAMAGE", 9.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 5.0, 0);
	profile.addAttribute("SPRINT_SPEED", 0.2, 1);
    profile.addAttribute("STEP_HEIGHT", 1.0, 0);
	profile.addAttribute("JUMP_HEIGHT", 2.0, 0);
}

function nightProfile(profile) {
    profile.addAttribute("FALL_RESISTANCE", 6.0, 0);
    profile.addAttribute("PUNCH_DAMAGE", 4.0, 0);
	profile.addAttribute("WEAPON_DAMAGE", 2.0, 0);
    profile.addAttribute("SPRINT_SPEED", 0.15, 1);
}

function speedProfile(profile) {
	profile.addAttribute("PUNCH_DAMAGE", 4.0, 0);
	profile.addAttribute("JUMP_HEIGHT", 1.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 3.0, 0);
    profile.addAttribute("BASE_SPEED_LEVELS", 3.0, 0);	
}

function angelProfile(profile) {
	profile.addAttribute("PUNCH_DAMAGE", 4.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 0.6, 1);
	profile.addAttribute("SPRINT_SPEED", 0.1, 1);
}

function allProfile(profile) {
	profile.addAttribute("PUNCH_DAMAGE", 10.0, 0);
    profile.addAttribute("JUMP_HEIGHT", 2.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 8.0, 0);
    profile.addAttribute("STEP_HEIGHT", 0.5, 0);
    profile.addAttribute("KNOCKBACK", 1.0, 0);
    profile.addAttribute("BASE_SPEED_LEVELS", 3.0, 0);	
}

function badProfile(profile) {
	profile.addAttribute("PUNCH_DAMAGE", -2.0, 0);
	profile.addAttribute("MAX_HEALTH", -10.0, 0);
}

function hasProperty(entity, property) {
    switch (property) {
        case "MASK_TOGGLE":
            return !entity.getData("tgheroes:dyn/rogue_x_timer") && !entity.getData("tgheroes:dyn/rogue_angel_timer") && !entity.getData("tgheroes:dyn/rogue_all_timer")
		&& !entity.getData("tgheroes:dyn/rogue_speed_timer") && !entity.getData("tgheroes:dyn/rogue_night_timer") && !entity.getData("tgheroes:dyn/rogue_colos_timer");
        default:
            return false;
    }
}