function init(hero) {
    hero.setName("Angel/Archangel");
    hero.setVersion("Warren Worthington III");	
    hero.setTier(3);
    
    hero.setHelmet("Mask");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");
    
    hero.addPowers("tgheroes:xmen_angel", "tgheroes:xmen_archangel");
    hero.addAttribute("PUNCH_DAMAGE", 3.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 3.0, 0);
	hero.addAttribute("SPRINT_SPEED", 0.05, 1);
	hero.addAttribute("IMPACT_DAMAGE", 0.1, 1);
    
	hero.addKeyBind("SHIELD", "Wing Shield", 1);
	
	hero.addKeyBind("AIM", "Aim", 4);
	
    hero.addKeyBind("ARCHANGEL", "Archangel Release", 5);
	
	hero.supplyFunction("canAim", canAim);
	hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setTierOverride(getTierOverride);
	hero.setAttributeProfile(getProfile);
    hero.addAttributeProfile("APOCALYPSE_ANGEL", activeProfile);


}

function getTierOverride(entity) {
    return entity.getData("tgheroes:dyn/archangel") ? 8 : 3;
}

function activeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 6.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 5.0, 0);
	profile.addAttribute("IMPACT_DAMAGE", 0.4, 1);
	profile.addAttribute("SPRINT_SPEED", 0.1, 1);
}


function getProfile(entity) {
    if (entity.getData("tgheroes:dyn/archangel")) {
        return "APOCALYPSE_ANGEL";
    }
}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
	case "AIM":
        return !entity.getData("tgheroes:dyn/archangel");	
	case "SHIELD":
        return entity.getData("tgheroes:dyn/archangel");		
    default:
        return true;
    }
}

function isModifierEnabled(entity, modifier) {
	if (modifier.id() == "ang_3") {
        return !entity.getData("tgheroes:dyn/archangel");
	}
	if (modifier.id() == "ang_2") {
        return !entity.getData("tgheroes:dyn/archangel");
	}
	if (modifier.id() == "ang_1") {
        return !entity.getData("tgheroes:dyn/archangel");
	}
	
	if (modifier.id() == "arch_3") {
        return entity.getData("tgheroes:dyn/archangel");
	}
	if (modifier.id() == "arch_2") {
        return entity.getData("tgheroes:dyn/archangel");
	}
	if (modifier.id() == "arch_1") {
        return entity.getData("tgheroes:dyn/archangel");
	}
	

	return true;
   
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}