function init(hero) {
    hero.setName("Banshee/Sean Cassidy");
    hero.setTier(3);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Chestpiece");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");


	hero.addPowers("tgheroes:xmen_bunshee");
    hero.addAttribute("FALL_RESISTANCE", 3.5, 0);
    hero.addAttribute("PUNCH_DAMAGE", 3.0, 0);
	hero.addAttribute("SPRINT_SPEED", 0.05, 1);
	hero.addAttribute("IMPACT_DAMAGE", 2.0, 0);
	
    hero.addKeyBind("CHARGED_BEAM", "Scream", 4);
    hero.addKeyBind("SONIC_WAVES", "Sonic Waves", 1);
	hero.addKeyBind("ENERGY_PROJECTION", "Sonic Waves", 1);
    
	hero.setKeyBindEnabled(isKeyBindEnabled);
	
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
		case "ENERGY_PROJECTION":
            return !entity.getData("fiskheroes:beam_shooting");
		case "SONIC_WAVES":
            return !entity.getData("fiskheroes:beam_shooting");
		case "CHARGED_BEAM":
            return !entity.getData("fiskheroes:energy_projection");		
	default:
		return true;
	}
}
