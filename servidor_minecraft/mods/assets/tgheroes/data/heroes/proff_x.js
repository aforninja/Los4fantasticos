function init(hero) {
    hero.setName("Professor X/Charles Xavier");
    hero.setTier(1);
    
    hero.setHelmet("Head");
    hero.setChestplate("Torso");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");
    
    hero.addPowers("tgheroes:xmen_professor_x");
    hero.addAttribute("JUMP_HEIGHT", -10.0, 1);
	hero.addAttribute("STEP_HEIGHT", 0.5, 0);
	hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
	hero.addAttribute("SPRINT_SPEED", -0.05, 1);

    hero.addKeyBind("AIM", "Paralysis", 4);
	hero.addKeyBind("ENERGY_PROJECTION", "Psionic Lightning", 1);   
    hero.addKeyBind("CHARGED_BEAM", "Mind Beam", 2);   
    hero.addKeyBind("SHIELD", "Mind Shield", 5);
	hero.addKeyBind("TELEKINESIS", "Telekinesis", 3);
    
	hero.supplyFunction("canAim", canAim);
    hero.setKeyBindEnabled(isKeyBindEnabled);

}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
    case "CHARGED_BEAM":
        return !entity.getData("fiskheroes:telekinesis");
	case "AIM":
        return !entity.getData("fiskheroes:telekinesis");	
	case "ENERGY_PROJECTION":
        return !entity.getData("fiskheroes:telekinesis");	
    default:
        return true;
    }
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}
