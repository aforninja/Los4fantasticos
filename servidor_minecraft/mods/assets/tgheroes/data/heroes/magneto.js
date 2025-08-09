function init(hero) {
    hero.setName("Magneto/Erik Lehnsherr");
    hero.setTier(5);
    
    hero.setHelmet("Helmet");
    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");
    hero.setBoots("Boots");
    
    hero.addPowers("tgheroes:xmen_magneto");
    hero.addAttribute("PUNCH_DAMAGE", 2.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 2.0, 0);
	
	hero.addKeyBind("TENTACLE_JAB", "Scrap Jab", 4);
	hero.addKeyBind("TENTACLE_STRIKE", "Scrap Strike", 1);
    hero.addKeyBind("TENTACLES", "Metal Scrap", 2);
	
	
	hero.addKeyBind("SHIELD", "Metal Shield", 5);
    hero.addKeyBind("GRAVITY_MANIPULATION", "Magnetic Gravity Control", 4);	
	hero.addKeyBind("ENERGY_PROJECTION", "Magnetic Rays", 1);
    hero.addKeyBind("TELEKINESIS", "Magnetic Telekinesis", 3);
	
	
	hero.addAttributeProfile("SHIELD", shieldProfile);
	hero.setKeyBindEnabled(isKeyBindEnabled);
	hero.setAttributeProfile(getProfile);
}

function shieldProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", -2.0, 0);
	profile.addAttribute("JUMP_HEIGHT", -5.0, 0);
}

function getProfile(entity) {
	if (entity.getData("fiskheroes:shield")) {
            return "SHIELD";
        }
}

function isKeyBindEnabled(entity, keyBind) {  
	switch (keyBind) {
	case "TENTACLE_JAB":
            return !entity.getData("fiskheroes:tentacles") == 0;
	case "TENTACLE_STRIKE":
            return !entity.getData("fiskheroes:tentacles") == 0;
	case "TENTACLES":
        return !entity.getData("fiskheroes:shield");
	case "SHIELD":
        return !entity.getData("fiskheroes:tentacles") == 1;
	case "ENERGY_PROJECTION":
        return !entity.getData("fiskheroes:tentacles") == 1 && !entity.getData("fiskheroes:telekinesis") && !entity.getData("fiskheroes:shield");
	case "GRAVITY_MANIPULATION":
        return !entity.getData("fiskheroes:tentacles") == 1 && !entity.getData("fiskheroes:shield");
	case "TELEKINESIS":
        return !entity.getData("fiskheroes:tentacles") == 1 && !entity.getData("fiskheroes:shield");
    default:
        return true;
    }
}