function init(hero) {
    hero.setName("Jubilee");
    hero.setTier(3);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");
    
    hero.addPowers("tgheroes:xmen_jubilee");
    hero.addAttribute("PUNCH_DAMAGE", 3.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 3.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.05, 1);
	
	hero.addKeyBind("AIM", "Fireworks", 4);
	hero.addKeyBind("CHARGED_BEAM", "Atomic Blast", 1);

	hero.supplyFunction("canAim", canAim);
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}

