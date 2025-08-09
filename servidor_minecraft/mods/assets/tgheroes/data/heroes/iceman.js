function init(hero) {
    hero.setName("Iceman/Robert Drake");
    hero.setTier(2);
    
    hero.setChestplate("Suit");
    
    hero.addPowers("tgheroes:xmen_iceman");
    hero.addAttribute("PUNCH_DAMAGE", 3.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 3.0, 0);
	hero.addAttribute("SPRINT_SPEED", 0.05, 1);

	hero.addKeyBind("CHARGED_BEAM", "Cryo Beam", 4);
    hero.addKeyBind("BLADE", "Cryo Spike", 1);
	hero.addKeyBind("SHIELD", "Cryo Wall", 5);
	
	hero.addKeyBind("ICE_FORM", "Cryo From", 3);
   
	hero.setTierOverride(getTierOverride);
	hero.setKeyBindEnabled(isKeyBindEnabled);
	hero.setModifierEnabled(isModifierEnabled);
    hero.addAttributeProfile("BLADE", bladeProfile);
	hero.addAttributeProfile("ICE_FORM", iceProfile);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("BLADE", {
        "types": {
            "SHARP": 1.0,
            "COLD": 0.4
        }
    });
    hero.addDamageProfile("ICE_FORM", {
        "types": {
            "BLUNT": 1.0,
            "COLD": 0.4
        }
    });
}

function getTierOverride(entity) {
    return entity.getData("tgheroes:dyn/ice") ? 5 : 2;
}

function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 7.0, 0);
}

function iceProfile(profile) {
    profile.addAttribute("PUNCH_DAMAGE", 4.5, 0);
    profile.addAttribute("FALL_RESISTANCE", 6.0, 0);
	profile.addAttribute("SPRINT_SPEED", 0.1, 1);
}

function getProfile(entity) {
	if (entity.getData("fiskheroes:blade") ) {
        return "BLADE";
    }
	else if (entity.getData("fiskheroes:shield") ) {
        return "ICE_PUNCH";
    }
	return false;
}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
    case "ICE_FORM":
        return entity.isAlive();
    case "CHARGED_BEAM":
        return entity.getData("tgheroes:dyn/ice");
	case "BLADE":
        return entity.isAlive();
	case "SHIELD":
        return entity.getData("tgheroes:dyn/ice");
    default:
        return true;
    }
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
    case "fiskheroes:shield":
        return entity.getData("tgheroes:dyn/ice");
	case "fiskheroes:controlled_flight":
        return entity.getData("tgheroes:dyn/ice");
	case "fiskheroes:charged_beam":
        return entity.getData("tgheroes:dyn/ice");
	case "fiskheroes:frost_walking":
        return entity.getData("tgheroes:dyn/ice");
	case "fiskheroes:water_breathing":
        return entity.getData("tgheroes:dyn/ice");
	case "fiskheroes:cryoball":
        return entity.getData("tgheroes:dyn/ice");
	case "fiskheroes:icicles":
        return !entity.getData("tgheroes:dyn/ice");
    default:
        return true;
    }
}