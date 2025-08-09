function init(hero) {
    hero.setName("Goblin Queen/Madelyne Pryor");
    hero.setTier(1);
    
    hero.setHelmet("Hair");
    hero.setChestplate("Torso");
    hero.setLeggings("Pants");
    hero.setBoots("Boots");
    
    hero.addPowers("tgheroes:xmen_madalyne", "tgheroes:sorcery");
    hero.addAttribute("FALL_RESISTANCE", 2.0, 0);

    hero.addKeyBind("AIM", "Paralysis", 4);
    hero.addKeyBind("ENERGY_PROJECTION", "Psionic Lightning", 1);   
    hero.addKeyBind("SHIELD", "Magic Shield", 5);
	hero.addKeyBind("SPELL_MENU", "Sorcery", 2);
	hero.addKeyBind("CHARGED_BEAM", "Healing Beam", 3);
    
	hero.supplyFunction("canAim", canAim);
}


function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}
