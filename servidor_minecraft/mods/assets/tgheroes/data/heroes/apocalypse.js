function init(hero) {
    hero.setName("Apocalypse/En Sabah Nur");
    hero.setTier(9);
    
    hero.setHelmet("Head");
    hero.setChestplate("Torso");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");
    
    hero.addPowers("tgheroes:xmen_apocalypse");
    hero.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
	hero.addAttribute("SPRINT_SPEED", 0.05, 1);

    hero.addKeyBind("AIM", "Energy Blast", 1);
    hero.addKeyBind("CHARGED_BEAM", "Energy Beam", 1);   
    hero.addKeyBind("TELEPORT", "Teleport", 2);
	hero.addKeyBind("TELEKINESIS", "Telekinesis", 3);
    hero.addKeyBindFunc("func_GIANT_MODE", giantModeKey, "key.giantMode", 4);
    hero.addKeyBind("SHIELD", "Forcefield", 5);
    
	hero.addSoundEvent("STEP", "fiskheroes:anti_walk");
    hero.setDefaultScale(1.2);
    hero.setHasProperty(hasProperty);
	hero.setModifierEnabled(isModifierEnabled);
	hero.setKeyBindEnabled(isKeyBindEnabled);
	hero.supplyFunction("canAim", canAim);
}

function giantModeKey(player, manager) {
    var flag = player.getData("fiskheroes:dyn/giant_mode");
    manager.setData(player, "fiskheroes:dyn/giant_mode", !flag);
    manager.setData(player, "fiskheroes:size_state", flag ? -1 : 1);
    return true;
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
    case "fiskheroes:arrow_catching":
        return entity.getData("fiskheroes:scale") <= 1.21 ;
	case "fiskheroes:controlled_flight":
        return entity.getData("fiskheroes:scale") <= 1.21 ;	
    case "fiskheroes:aim":
        return entity.getData("fiskheroes:scale") <= 1.21;
    case "fiskheroes:charged_beam":
        return entity.getData("fiskheroes:scale") > 1.21;
    default:
        return true;
    }
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
    case "func_GIANT_MODE":
        var timer = entity.getData("fiskheroes:dyn/giant_mode_timer");
        return timer == 0 || timer == 1;
    case "CHARGED_BEAM":
        return entity.getHeldItem().isEmpty() && entity.getData("fiskheroes:scale") > 1.21 && entity.getData("fiskheroes:size_state") == 0 && !entity.getData("fiskheroes:telekinesis");	
	case "AIM":
        return entity.getHeldItem().isEmpty() && entity.getData("fiskheroes:scale") <= 1.21 && !entity.getData("fiskheroes:telekinesis");		
    default:
        return true;
    }
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}