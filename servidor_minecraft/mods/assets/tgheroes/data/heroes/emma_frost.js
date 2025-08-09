function init(hero) {
    hero.setName("Emma Frost");
    hero.setTier(1);
    
    hero.setHelmet("Head");
    hero.setChestplate("Torso");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");
    
    hero.addPowers("tgheroes:xmen_frost");
    hero.addAttribute("FALL_RESISTANCE", 2.0, 0);
	hero.addAttribute("PUNCH_DAMAGE", 3.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.05, 1);

    hero.addKeyBind("AIM", "Paralysis", 4);
    hero.addKeyBind("CHARGED_BEAM", "Psionic Lightning", 1);   
    hero.addKeyBind("SHIELD", "Psionic Shield", 3);
	hero.addKeyBind("TELEKINESIS", "Telekinesis", 2);
    hero.addKeyBind("DIAMOND", "Diamond Form", 5);
    
	hero.supplyFunction("canAim", canAim);
	hero.setModifierEnabled(isModifierEnabled);
    hero.setTierOverride(getTierOverride);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("DIAMOND_FORM", diamondProfile);
    hero.setAttributeProfile(getAttributeProfile);
}

function getTierOverride(entity) {
    return entity.getData("tgheroes:dyn/diamond") ? 7 : 3;
}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
    case "DIAMOND":
        return entity.isAlive();
    case "CHARGED_BEAM":
        return !entity.getData("tgheroes:dyn/diamond_timer")&& !entity.getData("fiskheroes:telekinesis");
	case "AIM":
        return !entity.getData("tgheroes:dyn/diamond_timer")&& !entity.getData("fiskheroes:telekinesis");	
	case "SHIELD":
        return !entity.getData("tgheroes:dyn/diamond_timer");	
	case "TELEKINESIS":
        return !entity.getData("tgheroes:dyn/diamond_timer");			
    default:
        return true;
    }
}

function diamondProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 6.0, 0);
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
}

function getAttributeProfile(entity) {
    return entity.getData("tgheroes:dyn/diamond_timer") > 0 ? "DIAMOND_FORM" : null;
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
	case "fiskheroes:water_breathing":
        return entity.getData("tgheroes:dyn/diamond");
	case "fiskheroes:potion_immunity":
        return entity.getData("tgheroes:dyn/diamond");
	case "fiskheroes:fire_immunity":
        return entity.getData("tgheroes:dyn/diamond");
	case "fiskheroes:regeneration":
        return entity.getData("tgheroes:dyn/diamond");
	case "fiskheroes:projectile_immunity":
        return entity.getData("tgheroes:dyn/diamond");
    case "fiskheroes:damage_immunity":
        return entity.getData("tgheroes:dyn/diamond");
	default:
        return true;
    }
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}
