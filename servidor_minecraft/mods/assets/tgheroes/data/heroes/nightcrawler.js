function init(hero) {
    hero.setName("Nightcrawler/Kurt Wagner");
    hero.setTier(3);
    
    hero.setHelmet("Head");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");
	hero.addPrimaryEquipment("fiskheroes:katana", true, item => !item.nbt().getBoolean("Dual"));
    
    hero.addPowers("tgheroes:xmen_nightcrawler");
    hero.addAttribute("FALL_RESISTANCE", 3.0, 0);
    hero.addAttribute("PUNCH_DAMAGE", 2.0, 0);
	hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
	hero.addAttribute("WEAPON_DAMAGE", 4.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.1, 1);
    
  	hero.addKeyBind("TELEPORT", "Teleport", 1);  
	hero.addKeyBind("TENTACLE_JAB", "Tail Jab", 4);
	hero.addKeyBind("TENTACLE_GRAB", "Tail Grab", 2);
    hero.addKeyBind("TENTACLES", "Use Tail", 5);
	hero.setKeyBindEnabled(isKeyBindEnabled);
}
function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
	case "TENTACLE_JAB":
            return !entity.getData("fiskheroes:tentacles") == 0;
	case "TENTACLE_GRAB":
            return !entity.getData("fiskheroes:tentacles") == 0;
    default:
        return true;
    }
}