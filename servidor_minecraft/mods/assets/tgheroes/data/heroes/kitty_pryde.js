var utils = implement("fiskheroes:external/utils");

function init(hero) {
    hero.setName("Kitty Pryde");
    hero.setTier(3);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Chestpiece");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");
    
    hero.addPowers("tgheroes:xmen_kitty");
    hero.addAttribute("PUNCH_DAMAGE", 4.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.05, 1);
    hero.addAttribute("FALL_RESISTANCE", 3.0, 0);

    hero.addKeyBind("INTANGIBILITY", "Intangibility", 4);
	hero.addKeyBind("INVISIBILITY", "Intangible Camouflage", 1);
    hero.setModifierEnabled(isModifierEnabled);

    hero.setTickHandler((entity, manager) => {
        utils.flightOnIntangibility(entity, manager);
    });
}

function isModifierEnabled(entity, modifier) {
	switch (modifier.name()) {
	case "fiskheroes:flight":
        return entity.getData("fiskheroes:intangible");
	case "fiskheroes:damage_immunity":
        return entity.getData("fiskheroes:intangible") || entity.getData("fiskheroes:invisible");
    default:
        return true;
    }
    return true;
}