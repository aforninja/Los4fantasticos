var utils = implement("fiskheroes:external/utils");

function init(hero) {
    hero.setName("Silver Surfer/Norrin Radd");
    hero.setTier(9);
    
    hero.addPowers("tgheroes:surf");
    hero.setHelmet("Heaf");
    hero.setChestplate("Torso");
    hero.setLeggings("Legs");
    hero.setBoots("Feet");
    
    hero.addAttribute("PUNCH_DAMAGE", 6.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.1, 1);
    hero.addAttribute("IMPACT_DAMAGE", 0.5, 1);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);

    hero.addKeyBind("CHARGED_BEAM", "Energy Beam", 1);
	hero.addKeyBind("INTANGIBILITY", "Intangibility", 2);
	hero.addKeyBind("TELEPORT", "Teleport", 4);
    hero.addKeyBind("AIM", "Aim", 3);

    hero.setHasProperty(hasProperty);
	hero.supplyFunction("canAim", canAim);
	

}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}
